import React, { Component } from 'react';
import {
  TabBarIOS,
  Text,
  View,
  StyleSheet,
  Button,
  Alert,
  FlatList,
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
             AMDchange: false,
             SQchange: false,
             BZUNchange: false,
        //     closePrice: '',
        //     EMA: '',
        //     signal: '',
        //     SlowD: '',
        //     SlowK: ''
        }
        this.getStates = this.getStates.bind(this);
        this.getSignal = this.getSignal.bind(this);
        this.getClosePrice = this.getClosePrice.bind(this);
        this.getEMA = this.getEMA.bind(this);
        this.getSTOCH = this.getSTOCH.bind(this);
    }

   componentDidMount = () => {
  //    this.getStates('AMD');
   }

   componentDidUpdate = () => {
      if(this.state.AMDchange){
        this.getSignal('AMD');
      }
      if(this.state.SQchange){
        this.getSignal('SQ');
      }
      if(this.state.BZUNchange){
        this.getSignal('BZUN');
      }
   }

   getStates(symbol) {
     this.getEMA(symbol);
     this.getSTOCH(symbol);
     this.getClosePrice(symbol);
   }

    getClosePrice(symbol) {
     return fetch('https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol='+symbol+'&interval=1min&apikey=K0W08Y43EKGCJ16I')
       .then((response) => response.json())
       .then((responseJson) => {
         var result = responseJson["Time Series (1min)"];
         var key = Object.keys(result)[0];
         var closePrice = result[key]["4. close"];
         this.setState({[symbol+'closePrice']: closePrice});
         console.log(symbol+' closePrice: ' + closePrice);
         this.setState({[symbol+'change']: true});
       })
       .catch((error) => {
         console.error(error);
       });
   }

   getEMA(symbol) {
    return fetch('https://www.alphavantage.co/query?function=EMA&symbol='+symbol+'&interval=1min&time_period=60&series_type=close&apikey=K0W08Y43EKGCJ16I')
      .then((response) => response.json())
      .then((responseJson) => {
        var result = responseJson["Technical Analysis: EMA"];
        var key = Object.keys(result)[0];
        var EMA = result[key]["EMA"];
        this.setState({[symbol+'EMA']: EMA});
        console.log(symbol+' EMA: ' + EMA);
        this.setState({[symbol+'change']: true});
      })
      .catch((error) => {
        console.error(error);
      });
  }

  getSTOCH(symbol) {
   return fetch('https://www.alphavantage.co/query?function=STOCH&symbol='+symbol+'&interval=1min&slowkmatype=1&slowdmatype=1&fastkperiod=14&apikey=K0W08Y43EKGCJ16I')
     .then((response) => response.json())
     .then((responseJson) => {
       var result = responseJson["Technical Analysis: STOCH"];
       var key = Object.keys(result)[0];
       var SlowD = result[key]["SlowD"];
       var SlowK = result[key]["SlowK"];
       this.setState({[symbol+'SlowD']: SlowD});
       this.setState({[symbol+'SlowK']: SlowK});
       console.log(symbol+' SlowD: ' + SlowD);
       console.log(symbol+' SlowK: ' + SlowK);
       this.setState({[symbol+'change']: true});
     })
     .catch((error) => {
       console.error(error);
     });
 }

  getSignal(symbol){
    var closePrice = this.state[symbol+'closePrice'];
    var EMA = this.state[symbol+'EMA'];
    var SlowD = this.state[symbol+'SlowD'];
    var SlowK = this.state[symbol+'SlowK'];
    if(closePrice > EMA && SlowK>SlowD && SlowD<25){
      this.setState({signal: 'BUY'});
    }
    else if(SlowD>SlowK && SlowD>75){
      if(closePrice > EMA){
        this.setState({[symbol+'signal']: 'UPSELL'});
      }
      else {
        this.setState({[symbol+'signal']: 'DOWNSELL'});
      }
    }
    else{
      this.setState({[symbol+'signal']: 'NEUTRAL'});
    }
    this.setState({[symbol+'change']: false});
  }

  render() {
    return (
      <View style={{backgroundColor: 'powderblue', flex: 1}}>
        <View style={{flex: 1, backgroundColor: 'powderblue'}} />
        <View style={{flex: 24, backgroundColor: 'powderblue'}}>
          <View>
               <Title>Stock Trading Application</Title>
               <TouchableOpacity onPress ={this.getStates('AMD')}>
                <StockRow symbol='AMD' closePrice={this.state.AMDclosePrice} signal={this.state.AMDsignal} />
              </TouchableOpacity>
              <TouchableOpacity onPress ={this.getStates('SQ')}>
                <StockRow symbol='SQ' closePrice={this.state.SQclosePrice} signal={this.state.SQsignal} />
              </TouchableOpacity>
              <TouchableOpacity onPress ={this.getStates('BZUN')}>
                <StockRow symbol='BZUN' closePrice={this.state.BZUNclosePrice} signal={this.state.BZUNsignal} />
              </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }
}
