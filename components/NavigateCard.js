import { StyleSheet, Text, SafeAreaView, View, TouchableOpacity} from 'react-native'
import React from 'react'
import tw from 'tailwind-react-native-classnames'
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete'
import {GOOGLE_MAPS_APIKEY} from "@env"
import { useDispatch } from 'react-redux'
import { setDestination } from '../slices/navSlice'
import { useNavigation } from '@react-navigation/native'
import NavFavourites from './NavFavourites'
import { Icon } from 'react-native-elements'

const NavigateCard = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  return (
    <SafeAreaView style={tw`bg-white flex-1`}>  
      <Text style={tw`text-center py-5 text-xl`}>Good Morning, Ethan</Text>
      <View style={tw`border-t border-gray-200 flex-shrink`}>
        <GooglePlacesAutocomplete
          placeholder='Where to?'
          nearbyPlacesAPI='GooglePlacesSearch'
          debounce={400}
          styles={toInputBoxStyles}
          fetchDetails={true}
          enablePoweredByContainer={false}
          query={{
            key: GOOGLE_MAPS_APIKEY,
            language: "en"
          }}
          returnKeyType="search"
          onPress={(data,details =null) =>{
            dispatch(setDestination({
              location: details.geometry.location,
              description: data.description,
            })
            ) 
            
            navigation.navigate("RideOptionsCard")
           
          }}
        />
        <NavFavourites/>
      </View>
      
      <View style={tw`flex-row bg-white justify-evenly py-2 border-t border-gray-100`}>
        <TouchableOpacity 
        style={tw`flex-row bg-black w-24 px-4 py-3 rounded-full justify-between`}
        onPress={() => navigation.navigate("RideOptionsCard")}
        >
          <Icon 
            name="car"
            type="font-awesome"
            color="white"
            size={16}
          />
            <Text style={tw`text-white text-center`}>Rides</Text>
        </TouchableOpacity>
        <TouchableOpacity style={tw`flex-row w-24 px-4 py-3 justify-between rounded-full`}>
          <Icon 
            name="fast-food-outline"
            type="ionicon"
            color="black"
            size={16}
          />
            <Text style={tw`text-black text-center`}>Eats</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  )
}

export default NavigateCard

//example of stylesheet styles (overriding each of the parts of the google auto complete)
const toInputBoxStyles = StyleSheet.create({
  container:{
    backgroundColor: "white",
    paddingTop: 20,
    flex:0,
  },
  textInput:{
    backgroundColor: "#DDDDDF",
    borderRadius: 0,
    fontSize: 18,
  },
  textInputContainer:{
    paddingHorizontal: 20,
    paddingBottom: 0,
  },
})