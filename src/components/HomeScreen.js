import React, { Component } from 'react';
import {
  TabBarIOS,
  Text,
  View,
  StyleSheet,
  Button,
  Alert,
  TouchableOpacity
} from 'react-native';
import Title from './Title';
import AppText from './AppText';
import StockRow from './StockRow';
import * as globalStyles from '../styles/global';

export default class HomeScreen extends Component<{}> {
  constructor(){
        super()
        this.state ={
            change: false,
            closePrice: '',
            EMA: '',
            signal: '',
            SlowD: '',
            SlowK: ''
        }
        this.getStates = this.getStates.bind(this);
        this.getSignal = this.getSignal.bind(this);
        this.getClosePrice = this.getClosePrice.bind(this);
        this.getEMA = this.getEMA.bind(this);
        this.getSTOCH = this.getSTOCH.bind(this);
    }

   componentDidMount = () => {
      this.getStates();
   }

   componentDidUpdate = () => {
      if(this.state.change){
        this.getSignal();
      }
   }

   getStates() {
     this.getEMA();
     this.getSTOCH();
     this.getClosePrice();
   }

    getClosePrice() {
     return fetch('https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=AMD&interval=1min&apikey=K0W08Y43EKGCJ16I')
       .then((response) => response.json())
       .then((responseJson) => {
         var result = responseJson["Time Series (1min)"];
         var key = Object.keys(result)[0];
         var closePrice = result[key]["4. close"];
         this.setState({closePrice: closePrice});
         console.log('closePrice: ' + closePrice);
         this.setState({change: true});
       })
       .catch((error) => {
         console.error(error);
       });
   }

   getEMA() {
    return fetch('https://www.alphavantage.co/query?function=EMA&symbol=AMD&interval=1min&time_period=60&series_type=close&apikey=K0W08Y43EKGCJ16I')
      .then((response) => response.json())
      .then((responseJson) => {
        var result = responseJson["Technical Analysis: EMA"];
        var key = Object.keys(result)[0];
        var EMA = result[key]["EMA"];
        this.setState({EMA: EMA});
        console.log('EMA: ' + EMA);
        this.setState({change: true});
      })
      .catch((error) => {
        console.error(error);
      });
  }

  getSTOCH() {
   return fetch('https://www.alphavantage.co/query?function=STOCH&symbol=AMD&interval=1min&slowkmatype=1&slowdmatype=1&fastkperiod=14&apikey=K0W08Y43EKGCJ16I')
     .then((response) => response.json())
     .then((responseJson) => {
       var result = responseJson["Technical Analysis: STOCH"];
       var key = Object.keys(result)[0];
       var SlowD = result[key]["SlowD"];
       var SlowK = result[key]["SlowK"];
       this.setState({SlowD: SlowD});
       this.setState({SlowK: SlowK});
       console.log('SlowD: ' + SlowD);
       console.log('SlowK: ' + SlowK);
       this.setState({change: true});
     })
     .catch((error) => {
       console.error(error);
     });
 }

  getSignal(){
    var closePrice = this.state.closePrice;
    var EMA = this.state.EMA;
    var SlowD = this.state.SlowD;
    var SlowK = this.state.SlowK;
    if(closePrice > EMA && SlowK>SlowD && SlowD<25){
      this.setState({signal: 'BUY'});
    }
    else if(SlowD>SlowK && SlowD>75){
      if(closePrice > EMA){
        this.setState({signal: 'UPSELL'});
      }
      else {
        this.setState({signal: 'DOWNSELL'});
      }
    }
    else{
      this.setState({signal: 'NEUTRAL'});
    }
    this.setState({change: false});
  }

  render() {
    return (
      <View style={{backgroundColor: 'powderblue', flex: 1}}>
        <View style={{flex: 1, backgroundColor: 'powderblue'}} />
        <View style={{flex: 24, backgroundColor: 'powderblue'}}>
          <View style={{
            flex: 1,
            flexDirection: 'column'
          }}>
            <View>
              <Title>Stock Trading Application</Title>
            </View>
            <TouchableOpacity onPress ={this.getStates}>
              <StockRow symbol='AMD' closePrice={this.state.closePrice} signal={this.state.signal}/>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }
}
