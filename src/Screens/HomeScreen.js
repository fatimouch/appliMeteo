import React, { useEffect, useState } from 'react';
import { ActivityIndicator, SafeAreaView, Text, StyleSheet, View, TextInput, TouchableOpacity } from 'react-native';
import { fetchOpenWeather, getGPSCoords } from '../API/APIgeodirect';
import Icon from '../../react-native-weather-icons/weatherIcon';
import { iconsSet, atmosphere } from '../constant/iconsSet';

const HomeScreen = () => {

  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [city, setCity] = useState('')
  const icon = atmosphere.includes(data?.weather[0]?.main) ? iconsSet["Clouds"] : iconsSet[data?.weather[0]?.main]
  useEffect(() => {
    const asyncBootstrap = async () => {
      try {
        const coords = await getGPSCoords()
        const data = await fetchOpenWeather(coords)
        console.log("data", data)
        setData(data)
      } catch (err) {
        console.log("erreur", err);
      }
      finally {
        setLoading(false)
      }

    }
    asyncBootstrap();
  }, [])
  const handleSearch = async () => {
    try {
      const coords = await getGPSCoords(city)
      const data = await fetchOpenWeather(coords)
      console.log("data", data)
      setData(data)
    } catch (err) {
      console.log("erreur", err);
    }

  }


  return (
    loading ? <ActivityIndicator />
      : (
           data && (
        <SafeAreaView style={styles.sectionContainer}>
        

          <View style={styles.section}>
            <TextInput placeholder='Noyon'  style={styles.input} value={city} onChangeText={(text) => setCity(text)} />
            <TouchableOpacity style={styles.button} onPress={handleSearch} >
              <Text style={styles.buttonText}>VALIDER</Text>
            </TouchableOpacity>
          </View>
          <Text style={styles.title}> {data.name} </Text>
          <Text style={styles.icont}> <Icon  name={icon} size={200} /></Text>
          <Text style={[styles.title, styles.temp]}> {Math.floor(data.main.temp)}°C</Text>
          <Text style={[styles.title, styles.temp]}>{data.weather[0].description}</Text>
          <View style={styles.details}>
            <View style={styles.item}>
              <Icon name="wi-strong-wind" size={50}  color='white' />
              <Text style={styles.textColor}>Vent </Text>
              <Text style={styles.textColor}>  {data.wind.speed}</Text>
            </View>
            <View style={styles.item}>
              <Icon name="wi-barometer" size={50} color='white'/>
              <Text style={styles.textColor}>Pression </Text>
              <Text style={styles.textColor}>  {data.main.pressure}</Text>

            </View>
            <View style={styles.item}>
              <Icon name="wi-humidity" size={50} color='white' />
              <Text style={styles.textColor}>Humidité </Text>
              <Text style={styles.textColor}>  {data.main.humidity}</Text>
            </View>
          </View>
        
        </SafeAreaView>
        )
      )

  )
}
export default HomeScreen;

const styles = StyleSheet.create({
  sectionContainer: {
    
    backgroundColor : "#2C7373",
    height: 900
  
  },
  section:{
    marginTop:20,
    flexDirection: 'row',
    borderWidth: 2,
    borderColor: 'white',
    marginHorizontal: 10,
    borderRadius:10
  },
  title: {
    textAlign: 'center',
    fontSize: 40,
    fontWeight: 'bold',
    color: 'white'
  },
  temp: {

    fontSize: 25,
    textTransform: 'uppercase',
    color: 'white'
  },
  details: {
    flexDirection: 'row',
  },
  item: {
    flex: 1,
    alignItems: 'center',
    padding: 10,
    marginVertical: 15,
    borderWidth: 2,
    marginTop: 60,
    borderColor:  '#1D4851',
    borderRadius: 10,
    color: 'white'
  },
  icont: {
    textAlign:'center',
    color: 'white'
  },
  input: {
    padding: 15,
    flex: 1,
    backgroundColor: "#fff",
    borderStartRadius:10
    

  },
  inputContainer: {
    marginVertical: 15,
    flexDirection: "row",
    color: 'white',
    marginHorizontal: 10
  },
  button: {
    padding: 10,
    backgroundColor: '#1D4851',
    borderEndRadius:10

  },
  buttonText: {
    textAlign: "center",
    textTransform: 'uppercase',
    color: 'white',
    fontWeight: 'bold'
  },
  textColor:{
    color: 'white',
    fontSize: 25,
  }
});