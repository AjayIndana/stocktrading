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

        setInterval(() => {
          this.getStates('AMD');
          this.getStates('SQ');
          this.getStates('BZUN');
        }, 1000);

        this.getStates = this.getStates.bind(this);
        this.getSignal = this.getSignal.bind(this);
        this.getClosePrice = this.getClosePrice.bind(this);
        this.getEMA = this.getEMA.bind(this);
        this.getSTOCH = this.getSTOCH.bind(this);
        this.getPLUSDI = this.getPLUSDI.bind(this);
        this.getMINUSDI = this.getMINUSDI.bind(this);
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
     this.getPLUSDI(symbol);
     this.getMINUSDI(symbol);
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
         // console.log(responseJson);
         // console.error(error);
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
        // console.log(responseJson);
        // console.error(error);
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
       // console.log(responseJson);
       // console.error(error);
     });
 }

 getPLUSDI(symbol) {
  return fetch('https://www.alphavantage.co/query?function=PLUS_DI&symbol='+symbol+'&interval=1min&time_period=7&apikey=K0W08Y43EKGCJ16I')
    .then((response) => response.json())
    .then((responseJson) => {
      var result = responseJson["Technical Analysis: PLUS_DI"];
      var key = Object.keys(result)[0];
      var PLUS_DI = result[key]["PLUS_DI"];
      this.setState({[symbol+'PLUS_DI']: PLUS_DI});
      console.log(symbol+' PLUS_DI: ' + PLUS_DI);
      this.setState({[symbol+'change']: true});
    })
    .catch((error) => {
      // console.log(responseJson);
      // console.error(error);
    });
}

getMINUSDI(symbol) {
 return fetch('https://www.alphavantage.co/query?function=MINUS_DI&symbol='+symbol+'&interval=1min&time_period=7&apikey=K0W08Y43EKGCJ16I')
   .then((response) => response.json())
   .then((responseJson) => {
     var result = responseJson["Technical Analysis: MINUS_DI"];
     var key = Object.keys(result)[0];
     var MINUS_DI = result[key]["MINUS_DI"];
     this.setState({[symbol+'MINUS_DI']: MINUS_DI});
     console.log(symbol+' MINUS_DI: ' + MINUS_DI);
     this.setState({[symbol+'change']: true});
   })
   .catch((error) => {
     // console.log(responseJson);
     // console.error(error);
   });
}

  getSignal(symbol){
    var closePrice = this.state[symbol+'closePrice'];
    var EMA = this.state[symbol+'EMA'];
    var SlowD = this.state[symbol+'SlowD'];
    var SlowK = this.state[symbol+'SlowK'];
    var PLUS_DI = this.state[symbol+'PLUS_DI'];
    var MINUS_DI = this.state[symbol+'MINUS_DI'];
    if(closePrice > EMA && SlowK>SlowD && SlowD<25 && PLUS_DI>MINUS_DI && PLUS_DI>25){
      this.setState({signal: 'STRONG BUY'});
    }
    else if(closePrice > EMA && PLUS_DI>MINUS_DI && PLUS_DI>25){
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
                <StockRow symbol='AMD' closePrice={this.state.AMDclosePrice} signal={this.state.AMDsignal} />
                <StockRow symbol='SQ' closePrice={this.state.SQclosePrice} signal={this.state.SQsignal} />
                <StockRow symbol='BZUN' closePrice={this.state.BZUNclosePrice} signal={this.state.BZUNsignal} />
          </View>
        </View>
      </View>
    );
  }
}
