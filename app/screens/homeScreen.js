import React from 'react';
import { TouchableHighlight, StatusBar, FlatList, StyleSheet, Text, View } from 'react-native';
import { LinearGradient } from 'expo';

export default class App extends React.Component {

  constructor(props){
      super(props);
      var nagivation = this.props.navigation;
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
        refresh: true
      };
      this.fetchTemps();
  }
  loadNewTemps = () => {
    this.setState({list: [], refresh: true});
    this.fetchTemps();
  }
  fetchTemps = () => {
    console.log('refresh', this.state);
    var newList = [];
    var list = this.getRandom(this.state.cities, 7);
    for( city in list ){
      //console.log(list[city]);
      var name = list[city].name;
      var country = list[city].country;
      fetch('http://api.openweathermap.org/data/2.5/weather?q='+ list[city].name +','+ list[city].country +'&appid=7096142abb99854dcd66d00f2fda7902&units=metric')
      .then((response) => response.json() )
      .then((responseJson) =>  {
        let r = responseJson.main;
        let s = responseJson;
        //console.log(r, s);
        var city = {
          name: s.name,
          country: country,
          temp: Math.ceil(r.temp),
          desc: 'Humidity: '+r.humidity+'% - '+s.weather[0].main,
          type: s.weather[0].main
        }
        console.log('TEMP RANGE: ('+r.temp+') '+ this.getTempRange(Math.ceil(r.temp)))
        newList.push(city);
        this.state.list = newList;
        this.setState({list: newList, refresh: false});
      });
    }
  }

  getEmoji = (type) => {
    if(type == 'Clouds'){
      return '🌤'
    }
    if(type == 'Clear'){
      return '☀️'
    }
    if(type == 'Haze'){
      return '⛅️'
    }
    if(type == 'Thunderstorm'){
      return '⛈'
    }
    if(type == 'Rain'){
      return '🌧'
    }
    if(type == 'Snow'){
      return '❄️'
    }
    if(type == 'Mist'){
      return '☁️'
    }
  }

  getRandom = (arr, n) => {
    var result = new Array(n),
        len = arr.length,
        taken = new Array(len);
    while (n--) {
        var x = Math.floor(Math.random() * len);
        result[n] = arr[x in taken ? taken[x] : x];
        taken[x] = --len in taken ? taken[len] : len;
    }
    return result;
  }

  getTempRange = (t) => {
    //Less than 10
    if(t < 11){
      return 1;
    }
    if(t > 10 && t < 20){
      return 2;
    }
    if(t >= 20 && t < 30){
      return 3;
    }
    if(t >= 30){
      return 4;
    }
  }

  render() {
    return (
      <View style={styles.container}>
      <StatusBar barStyle="light-content" />
        <Text style={{fontWeight: 'bold', width:'100%', textAlign: 'center', backgroundColor: 'black', color: 'white', paddingTop:40, paddingBottom: 15}}>
        ☀️ CityWeather</Text>
        <FlatList
        style={{width:'100%'}}
          data={this.state.list}
          refreshing={this.state.refresh}
          onRefresh={this.loadNewTemps}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({item, index}) => (
            <TouchableHighlight underlayColor="white" onPress={ () => alert(item.desc) }>
            <LinearGradient
              colors={['rgba(0,0,0,0.05)', 'rgba(0,0,0,0.0)']}
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
      </View>
    );
  }
}

const styles = StyleSheet.create({
  cold: {
    color: 'blue'
  },
  medium: {
    color: 'green'
  },
  hot: {
    color: 'orange'
  },
  vhot: {
    color: 'red'
  },
  temp: {
    fontSize: 30,
    lineHeight: 40,
    width: 130,
    marginRight: 15,
    fontWeight: 'bold',
    fontFamily: 'Avenir'
  },
  cityN:{
    fontSize: 20,
    lineHeight: 40,
    fontFamily: 'Avenir'
  },
  row: {
    flex:1,
    paddingVertical: 25,
    paddingHorizontal: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderBottomColor: 'white'
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
