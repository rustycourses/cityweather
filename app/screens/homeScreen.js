import React from 'react';
import { View, Text, StyleSheet, FlatList, StatusBar, TouchableHighlight } from 'react-native';
import { LinearGradient } from 'expo';

export default class App extends React.Component{

  constructor(props){
    super(props);
    var navigation = this.props.navagation;
    this.state = {
      cities: [
          { name: "London",
            country: "UK"
          },
          { name: "Edinburgh",
            country: "UK"
          },
          { name: "New York",
            country: "US"
          },
          { name: "Texas",
            country: "US"
          },
          { name: "Washington",
            country: "US"
          },
          { name: "Paris",
            country: "France"
          },
          { name: "Doha",
            country: "Qatar"
          },
          { name: "Sydney",
            country: "Australia"
          },
          { name: "Cancun",
            country: "Mexico"
          },
          { name: "Madrid",
            country: "Spain"
          },
          { name: "Berlin",
            country: "Germany"
          },
          { name: "Brussels",
            country: "Belgium"
          },
          { name: "Copenhagen",
            country: "Denmark"
          },
          { name: "Athens",
            country: "Greece"
          },
          { name: "New Delhi",
            country: "India"
          },
          { name: "Dublin",
            country: "Ireland"
          },
          { name: "Rome",
            country: "Italy"
          },
          { name: "Tokyo",
            country: "Japan"
          },
          { name: "Wellington",
            country: "New Zealand"
          },
          { name: "Amsterdam",
            country: "Netherlands"
          },
          { name: "Oslo",
            country: "Norway"
          },
          { name: "Panama City",
            country: "Panama"
          },
          { name: "Lisbon",
            country: "Portugal"
          },
          { name: "Warsaw",
            country: "Poland"
          },
          { name: "Moscow",
            country: "Russia"
          }
        ],
        list: [],
        refresh: true,
        newAlert: 0
    };

    this.fetchTemps();

  }

  fetchTemps = () => {
    var newList = [];
    this.state.list = [];
    var list = this.getRandom(this.state.cities, 7);
    for( city in list ){
      var name = list[city].name;
      var country = list[city].country;
      this.fetchCityTemp(name, country, newList);

    }
  }

  getRandom = (arr, n) => {
    var result = new Array(n),
      len = arr.length,
      taken = new Array(len);
    while(n--) {
      var x = Math.floor(Math.random() * len);
      result[n] = arr[x in taken ? taken[x] : x];
      taken[x] = --len in taken ? taken[len] : len;
    }
    return result;
  }

  loadNewTemps = () => {
    this.setState({
      list: [],
      refresh: true
    })
    this.fetchTemps();
  }



  fetchCityTemp = ( city, country, newList ) => {

    fetch('http://api.openweathermap.org/data/2.5/weather?q='+city+','+country+'&appid=7096142abb99854dcd66d00f2fda7902&units=metric')
    .then((response) => response.json() )
    .then((responseJson) => {
      var r = responseJson.main;
      var obj = responseJson;
      var city = {
        name: obj.name,
        country: country,
        temp: Math.ceil(r.temp),
        type: obj.weather[0].main,
        desc: 'Humidity: '+r.humidity+'%  -  '+obj.weather[0].main,
      };
      newList.push(city);
      this.setState({
        list: newList,
        refresh: false
      });
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
        <FlatList
          style={{width: '100%'}}
          data={this.state.list}
          refreshing={this.state.refresh}
          onRefresh={this.loadNewTemps}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({item, index}) => (
            <TouchableHighlight
              underlayColor="white"
              onPress={ () => this.setState({newAlert: 1, alertMsg: item.desc})}
            >
              <LinearGradient
                colors={['rgba(0,0,0,0.05)','rgba(0,0,0,0)']}
                start={[0, 0.5]}
              >
                <View style={styles.row}>
                  <Text style={[
                    (this.getTempRange(item.temp) == 1) ? styles.cold : styles.temp,
                    (this.getTempRange(item.temp) == 2) ? styles.medium : styles.temp,
                    (this.getTempRange(item.temp) == 3) ? styles.hot : styles.temp,
                    (this.getTempRange(item.temp) == 4) ? styles.vhot : styles.temp,
                    styles.temp]}>{this.getEmoji(item.type)} {item.temp}°C</Text>
                  <Text style={styles.cityN}>{item.name}</Text>
                </View>
              </LinearGradient>
            </TouchableHighlight>
          )}
        />

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
    flex: 1
  }
})
