import React from 'react';
import { TextInput, View, Text, StyleSheet, FlatList, StatusBar, TouchableHighlight } from 'react-native';
import { LinearGradient } from 'expo';

export default class App extends React.Component{

  constructor(props){
    super(props);
    var navigation = this.props.navagation;
    this.state = {
      searchInput: '',
      searchResult: 0,
      error: 'Search for a city...',
      item: {}
    };

    //this.fetchCityTemp('London', 'UK', []);

  }

  searchCity = () => {
    this.fetchCityTemp(this.state.search);
  }



  fetchCityTemp = ( city ) => {
    this.setState({
      item: {},
      searchResult: 0,
      error: 'Search for a city...'
    });
    fetch('http://api.openweathermap.org/data/2.5/weather?q='+city+'&appid=7096142abb99854dcd66d00f2fda7902&units=metric')
    .then((response) => response.json() )
    .then((responseJson) => {
      var r = responseJson.main;
      console.log(responseJson);
      var obj = responseJson;
      if(responseJson.cod !== 200){
        this.setState({
          item: city,
          searchResult: 0,
          error: 'City not found...'
        });
      }else{
        var city = {
          name: obj.name,
          //country: country,
          temp: Math.ceil(r.temp),
          type: obj.weather[0].main,
          desc: 'Humidity: '+r.humidity+'%  -  '+obj.weather[0].main,
        };
        //newList.push(city);
        this.setState({
          item: city,
          searchResult: 1
          //list: newList
        });
      }
    })

  }

  getTempRange = (t) => {

    if( t < 11){
      return 1;
    }
    if( t > 10 && t < 20){
      return 2;
    }
    if( t >= 20 && t < 30){
      return 3;
    }
    if( t >= 30){
      return 4;
    }

  }

  getEmoji = (type) => {

    if( type == 'Clouds'){
      return '☁️';
    }
    if(type == 'Clear'){
      return '☀️';
    }
    if(type == 'Haze'){
      return '⛅️';
    }
    if(type == 'Thunderstorm'){
      return '⛈';
    }
    if(type == 'Rain'){
      return '🌧';
    }
    if(type == 'Snow'){
      return '❄️';
    }
    if(type == 'Mist'){
      return '☁️';
    }


  }

//alert(item.desc)
  render () {
    return (
      <View style={styles.container}>
        <StatusBar barStyle="light-content" />
        <Text style={{width:'100%', paddingTop: 40, paddingBottom: 15, backgroundColor: 'black', color: 'white', textAlign: 'center', fontWeight: 'bold'}}>
        ☀️ CityWeather</Text>

        <View style={{alignItems: 'center', width: '90%'}}>
          <Text style={{padding:5, lineHeight: 20, fontSize: 16, textAlign: 'center'}}>Search for city</Text>
          <TextInput
          onChangeText={ (text) => this.setState({search: text})}
          value={this.state.search}
          style={{ width:'80%', padding: 15, margin:5, backgroundColor:'black', color:'white'}}
          />
          <TouchableHighlight
          style={{backgroundColor: 'grey', padding:20, borderRadius: 8}}
          onPress={ () => this.searchCity() }
          >
            <Text style={{color: 'white', fontSize: 14}}>Search</Text>
          </TouchableHighlight>
        </View>

        { this.state.searchResult == 1 ? (

          <View style={{marginTop: 15, justifyContent: 'flex-start', alignItems: 'flex-start'}}>
            <TouchableHighlight
              underlayColor="white"
              onPress={ () => this.setState({newAlert: 1, alertMsg: this.state.item.desc})}
            >
              <LinearGradient
                colors={['rgba(0,0,0,0.05)','rgba(0,0,0,0)']}
                start={[0, 0.5]}
              >
                <View style={styles.row}>
                  <Text style={[
                    (this.getTempRange(this.state.item.temp) == 1) ? styles.cold : styles.temp,
                    (this.getTempRange(this.state.item.temp) == 2) ? styles.medium : styles.temp,
                    (this.getTempRange(this.state.item.temp) == 3) ? styles.hot : styles.temp,
                    (this.getTempRange(this.state.item.temp) == 4) ? styles.vhot : styles.temp,
                    styles.temp]}>{this.getEmoji(this.state.item.type)} {this.state.item.temp}°C</Text>
                  <Text style={styles.cityN}>{this.state.item.name}</Text>
                </View>
              </LinearGradient>
            </TouchableHighlight>
            </View>
          ) : (
            <View style={{flex:1, justifyContent: 'center', alignItems: 'center'}}>
              <Text>{this.state.error}</Text>
            </View>
          )
        }



        {
          this.state.newAlert == 1 ? (
            <View style={{flex:1, justifyContent: 'center', alignItems: 'center', position: 'absolute', top: 0, left: 0, height: '100%', width: '100%', backgroundColor: 'rgba(0,0,0,0.5)'}}>
              <View style={{width:'75%', height: 90}}>

                <LinearGradient
                  style={{
                    padding:5,
                    shadowColor: 'black', shadowOffset: { width:0, height: 2}, shadowOpacity: 0.3, shadowRadius: 2,
                    justifyContent: 'space-between', flex: 1, borderRadius: 20}}
                  colors={['#136a8a', '#267871']}
                  start={[0, 0.65]}
                >
                  <Text style={{fontSize: 16, color: 'white', padding: 10, textAlign: 'center'}}>{this.state.alertMsg}</Text>

                  <TouchableHighlight
                    underlayColor="white"
                    onPress={ () => this.setState({alertMsg: '', newAlert: 0})}
                  >
                    <Text style={{fontWeight: 'bold', color: 'white', padding: 10, textAlign: 'center'}}>Close</Text>
                  </TouchableHighlight>
                </LinearGradient>
              </View>
            </View>
          ) : ''
        }

      </View>
    );
  }
}

const styles = StyleSheet.create({
  cold:{ color: 'blue'},
  medium: { color: 'green'},
  hot: { color: 'orange'},
  vhot: { color: 'red'},
  temp:{
    fontSize: 30,
    lineHeight: 40,
    width: 130,
    marginRight: 15,
    fontWeight: 'bold',
    fontFamily: 'Avenir'
  },
  cityN: {
    fontSize: 20,
    lineHeight: 40,
    fontFamily: 'Avenir'
  },
  row: {
    flex: 1,
    width: 375,
    paddingVertical: 25,
    paddingHorizontal: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderBottomColor: 'white'
  },
  container: {
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    width: '100%',
    justifyContent: 'flex-start',
  }
})
