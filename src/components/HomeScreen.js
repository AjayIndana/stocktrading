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
import Market from './Market';
import * as globalStyles from '../styles/global';

export default class HomeScreen extends Component<{}> {

  constructor(){
        super()
         this.state ={
             AMDchange: false,
             SQchange: false,
             BZUNchange: false,
             NVDAchange: false,
             SHOPchange: false,
             OLEDchange: false,
             ATVIchange: false,
             LRCXchange: false,
             DALchange: false
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
          this.getStates('NVDA');
          this.getStates('SHOP');
          this.getStates('OLED');
          this.getStates('ATVI');
          this.getStates('LRCX');
          this.getStates('DAL');
        }, 7000);

        this.getStates = this.getStates.bind(this);
        this.getSignal = this.getSignal.bind(this);
        this.getClosePrice = this.getClosePrice.bind(this);
        this.getEMA = this.getEMA.bind(this);
        this.getSTOCH = this.getSTOCH.bind(this);
        this.getPLUSDI = this.getPLUSDI.bind(this);
        this.getMINUSDI = this.getMINUSDI.bind(this);
        this.getRSI = this.getRSI.bind(this);
        this.getOBV = this.getOBV.bind(this);
        this.updateStock = this.updateStock.bind(this);
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
      if(this.state.NVDAchange){
        this.getSignal('NVDA');
      }
      if(this.state.SHOPchange){
        this.getSignal('SHOP');
      }
      if(this.state.OLEDchange){
        this.getSignal('OLED');
      }
      if(this.state.ATVIchange){
        this.getSignal('ATVI');
      }
      if(this.state.LRCXchange){
        this.getSignal('LRCX');
      }
      if(this.state.DALchange){
        this.getSignal('DAL');
      }
   }

   updateStock(){
     this.getStates('AMD');
     this.getStates('SQ');
     this.getStates('BZUN');
     this.getStates('NVDA');
     this.getStates('SHOP');
     this.getStates('OLED');
     this.getStates('ATVI');
     this.getStates('LRCX');
     this.getStates('DAL');
   }

   getStates(symbol) {
     this.getPLUSDI('IXIC');
     this.getMINUSDI('IXIC');
     this.getEMA(symbol);
     this.getSTOCH(symbol);
     this.getClosePrice(symbol);
     this.getPLUSDI(symbol);
     this.getMINUSDI(symbol);
     this.getRSI(symbol);
     this.getOBV(symbol);
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
        var key1 = Object.keys(result)[0];
        var key2 = Object.keys(result)[1];
        var key3 = Object.keys(result)[2];
        var EMA1 = result[key1]["EMA"];
        var EMA2 = result[key2]["EMA"];
        var EMA3 = result[key3]["EMA"];
        if(EMA1>=EMA2 && EMA2>=EMA3){
          this.setState({[symbol+'EMA']: true});
        }
        else {
          this.setState({[symbol+'EMA']: false});
        }
        this.setState({[symbol+'change']: true});
      })
      .catch((error) => {
        // console.log(responseJson);
        // console.error(error);
      });
  }

  getOBV(symbol) {
   return fetch('https://www.alphavantage.co/query?function=OBV&symbol='+symbol+'&interval=1min&apikey=K0W08Y43EKGCJ16I')
     .then((response) => response.json())
     .then((responseJson) => {
       var result = responseJson["Technical Analysis: OBV"];
       var key1 = Object.keys(result)[0];
       var OBV1 = result[key1]["OBV"];
       var key2 = Object.keys(result)[1];
       var OBV2 = result[key2]["OBV"];
       if(OBV1>OBV2){
         this.setState({[symbol+'OBV']: true});
       }
       else {
         this.setState({[symbol+'OBV']: false});
       }
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


getRSI(symbol) {
 return fetch('https://www.alphavantage.co/query?function=RSI&symbol='+symbol+'&interval=1min&time_period=7&series_type=close&apikey=K0W08Y43EKGCJ16I')
   .then((response) => response.json())
   .then((responseJson) => {
     var result = responseJson["Technical Analysis: RSI"];
     var key = Object.keys(result)[0];
     var RSI = result[key]["RSI"];
     this.setState({[symbol+'RSI']: RSI});
     console.log(symbol+' RSI: ' + RSI);
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
    var MarketMINUS_DI = this.state['IXIC'+'MINUS_DI'];
    var MarketPLUS_DI = this.state['IXIC'+'PLUS_DI'];
    var closePrice = this.state[symbol+'closePrice'];
    var EMA = this.state[symbol+'EMA'];
    var SlowD = this.state[symbol+'SlowD'];
    var SlowK = this.state[symbol+'SlowK'];
    var PLUS_DI = this.state[symbol+'PLUS_DI'];
    var MINUS_DI = this.state[symbol+'MINUS_DI'];
    var RSI = this.state[symbol+'RSI'];
    var OBV = this.state[symbol+'OBV'];

    if(MarketPLUS_DI > MarketMINUS_DI && MarketPLUS_DI>25){
      this.setState({market: 'UP'});
    }
    else if(MarketPLUS_DI < MarketMINUS_DI && MarketMINUS_DI>25){
      this.setState({market: 'DOWN'});
    }
    else {
      this.setState({market: 'FLAT'});
    }

    if(EMA && SlowK>SlowD && SlowD<25 && PLUS_DI>MINUS_DI && PLUS_DI>25 && OBV){
      this.setState({signal: 'STRONG BUY'});
    }
    else if(EMA && PLUS_DI>MINUS_DI && PLUS_DI>25 && SlowK>SlowD && OBV){
      this.setState({signal: 'GOOD BUY'});
    }
    else if(EMA && PLUS_DI>MINUS_DI && PLUS_DI>25 && SlowK>SlowD){
      this.setState({signal: 'BUY'});
    }
    else if(EMA && RSI<30 && OBV){
      this.setState({signal: 'BUY'});
    }
    else if(!EMA && PLUS_DI<MINUS_DI && MINUS_DI>25 && SlowK<SlowD && SlowD>75 && !OBV){
      this.setState({signal: 'STRONG SELL'});
    }
    else if(!EMA && PLUS_DI<MINUS_DI && MINUS_DI>25 && SlowK<SlowD && !OBV){
      this.setState({signal: 'SELL'});
    }
    else if(!EMA && ((PLUS_DI<MINUS_DI && MINUS_DI>25) || !OBV)){
      this.setState({[symbol+'signal']: 'PARTIAL SELL'});
    }
    else{
      this.setState({[symbol+'signal']: 'NEUTRAL'});
    }
    this.setState({[symbol+'change']: false});
  }

  render() {
    return (
      <View style={{backgroundColor: 'powderblue', flex: 1}}>
          <View>
                <Title>Stock Trading Application</Title>
                <Market symbol='NASDAQ' signal={this.state.market} />
                <StockRow symbol='AMD' closePrice={this.state.AMDclosePrice} signal={this.state.AMDsignal} />
                <StockRow symbol='SQ' closePrice={this.state.SQclosePrice} signal={this.state.SQsignal} />
                <StockRow symbol='BZUN' closePrice={this.state.BZUNclosePrice} signal={this.state.BZUNsignal} />
                <StockRow symbol='NVDA' closePrice={this.state.NVDAclosePrice} signal={this.state.NVDAsignal} />
                <StockRow symbol='SHOP' closePrice={this.state.SHOPclosePrice} signal={this.state.SHOPsignal} />
                <StockRow symbol='OLED' closePrice={this.state.OLEDclosePrice} signal={this.state.OLEDsignal} />
                <StockRow symbol='ATVI' closePrice={this.state.ATVIclosePrice} signal={this.state.ATVIsignal} />
                <StockRow symbol='LRCX' closePrice={this.state.LRCXclosePrice} signal={this.state.LRCXsignal} />
                <StockRow symbol='DAL' closePrice={this.state.DALclosePrice} signal={this.state.DALsignal} />
          </View>
          <Button
              onPress={() => { this.updateStock()}}
              title="Refresh"
            />
        </View>
    );
  }
}
