import { FlatList, StyleSheet, Text, TouchableOpacity, View, Image } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import tw from 'tailwind-react-native-classnames'
import { Icon } from 'react-native-elements'
import { useNavigation } from '@react-navigation/native'
import { useState } from 'react'
import { useSelector } from 'react-redux'
import { selectTravelTimeInformation } from '../slices/navSlice'

const data=[
  {
    id:"Uber-X-123",
    title:"UberX",
    multiplier:1,
    image: "https://links.papareact.com/3pn"
  },
  {
    id:"Uber-XL-456",
    title:"UberXL",
    multiplier:1.2,
    image: "https://links.papareact.com/5w8"
  },
  {
    id:"Uber-LUX-789",
    title:"Uber LUX",
    multiplier:1.75,
    image: "https://links.papareact.com/7pf"
  }
]

//if we have SURGE pricing, this goes up etc
const SURGE_CHARGE_RATE=1.5

const RideOptionsCard = () => {
  const navigation = useNavigation();
  const [selected,setSelected] = useState(null);
  const travelTimeInformation = useSelector(selectTravelTimeInformation)

  return (
    <SafeAreaView style={tw`bg-white flex-grow`}>
      <View style={tw`-mt-7`}>
        <TouchableOpacity 
        style={tw`absolute left-5 z-10`}
        onPress={() => navigation.navigate("NavigateCard")}
        >
            <Icon 
              name="chevron-left"
              type="fontawesom"
            />
        </TouchableOpacity>
        <Text style={tw`text-center pb-5 text-xl`}>Select a Ride - {travelTimeInformation?.distance?.text}</Text>
      </View>

      <FlatList
        data={data}
        keyExtractor={item => item.id}
        renderItem ={({item: {image, multiplier,title,id}, item}) =>{
          return(
            <TouchableOpacity 
            style = {tw`flex-row items-center justify-between px-10 ${id === selected?.id && "bg-gray-200"}`}
            onPress={() => setSelected(item)}
            >
              <Image 
                style={{
                  width:80,
                  height:80,
                  resizeMode: "contain",
                }}
                source={{uri: image}}
              />
              <View style={tw`-ml-6`}>
                <Text style={tw`text-xl`}>{title}</Text>
                <Text>{travelTimeInformation?.duration.text}</Text>
              </View>

              <Text style={tw`text-xl`}>

                {new Intl.NumberFormat("en-gb",{
                  style: 'currency',
                  currency: 'GBP'
                }).format(

                  (travelTimeInformation?.duration.value * SURGE_CHARGE_RATE * multiplier) /100

                )}

              </Text>
            </TouchableOpacity>
          )
        }}
      />

      <View style={tw`mt-auto border-t border-gray-200`}>
        <TouchableOpacity 
        disabled={!selected}
        style={tw`bg-black -mt-20 py-3 flex-1 ${!selected && "bg-gray-300"}`}>
          <Text style={tw`text-center text-white text-xl`}>Choose {selected?.title}</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  )
}

export default RideOptionsCard

const styles = StyleSheet.create({})