import React, { Component } from 'react';
import {
  TabBarIOS,
  Text,
  View,
  StyleSheet,
  Button,
  Alert,
  FlatList,
  TouchableOpacity,
  ScrollView
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
             DALchange: false,

             IXICKey: 'K0W08Y43EKGCJ16I',
      			 AMDKey: '5OG3POJL018DL4DZ',
             SQKey: 'VA76JKZMHM8RZ56Z',
             BZUNKey: 'Z02YHGJJDF0LIQ88',
             NVDAKey: '655NLMNKSLBQ4FIF',
             SHOPKey: 'CGLI213JP6U8EPAP',
             OLEDKey: '74HBRQWY4QMQTPY9',
             ATVIKey: 'R5J75BA79Z2E73GZ',
             LRCXKey: '8HA6MDBOUY1YF8Y6',
             DALKey: 'IUTT07YHJRPG6XY7',

             AMDDIP_BUY: false,
             SQDIP_BUY: false,
             BZUNDIP_BUY: false,
             NVDADIP_BUY: false,
             SHOPDIP_BUY: false,
             OLEDDIP_BUY: false,
             ATVIDIP_BUY: false,
             LRCXDIP_BUY: false,
             DALDIP_BUY: false,

             AMDUP_SELL: false,
             SQUP_SELL: false,
             BZUNUP_SELL: false,
             NVDAUP_SELL: false,
             SHOPUP_SELL: false,
             OLEDUP_SELL: false,
             ATVIUP_SELL: false,
             LRCXUP_SELL: false,
             DALUP_SELL: false

        //     closePrice: '',
        //     EMA: '',
        //     signal: '',
        //     SlowD: '',
        //     SlowK: ''
        }

        setInterval(() => {
          this.getStates('IXIC');
          this.getStates('AMD');
          this.getStates('SQ');
          this.getStates('BZUN');
          this.getStates('NVDA');
          this.getStates('SHOP');
          this.getStates('OLED');
          this.getStates('ATVI');
          this.getStates('LRCX');
          this.getStates('DAL');
        }, 60000);

        this.getStates = this.getStates.bind(this);
        this.getSignal = this.getSignal.bind(this);
        this.getClosePrice = this.getClosePrice.bind(this);
        this.getEMA = this.getEMA.bind(this);
        this.getPLUSDI = this.getPLUSDI.bind(this);
        this.getMINUSDI = this.getMINUSDI.bind(this);
        this.adhocRequest = this.adhocRequest.bind(this);
    }

   componentDidMount = () => {
     this.getStates('IXIC');
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
      if(this.state.IXICchange){
        this.getSignal('IXIC');
      }
   }

   async adhocRequest(){
     this.getStates('IXIC');
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

   async getStates(symbol) {
     this.getEMA(symbol);
     this.getClosePrice(symbol);
     this.getPLUSDI(symbol);
     this.getMINUSDI(symbol);
   }

    async getClosePrice(symbol) {
     var API = this.state[symbol+'Key'];
     return fetch('https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol='+symbol+'&interval=1min&apikey='+API)
       .then((response) => response.json())
       .then((responseJson) => {
         var result = responseJson["Time Series (1min)"];
         var key = Object.keys(result)[0];
         var closePrice = result[key]["4. close"];
         var open = result[key]["1. open"];
         var volume = result[key]["5. volume"];
         var avgVolume = volume;
         for (var i = 1; i < 14; i++) {
            var key_val = Object.keys(result)[i];
            avgVolume = avgVolume + result[key_val]["5. volume"];
          }
          avgVolume = avgVolume/14;
          if(closePrice>open && volume>avgVolume){
             this.setState({[symbol+'BULL']: true});
          }
          else{
             this.setState({[symbol+'BULL']: false});
          }
          if(closePrice<open && volume>avgVolume){
             this.setState({[symbol+'BEAR']: true});
          }
          else{
             this.setState({[symbol+'BEAR']: false});
          }
         this.setState({[symbol+'closePrice']: closePrice});
         console.log(symbol+' closePrice: ' + closePrice);
         this.setState({[symbol+'change']: true});
         this.setState({[symbol+'lastUpdated']: key});
       })
       .catch((error,symbol,response) => {
         this.getClosePrice(symbol);
         // console.log(responseJson);
         // console.error(error);
       });
   }

   async getEMA(symbol) {
     var API = this.state[symbol+'Key'];
    return fetch('https://www.alphavantage.co/query?function=EMA&symbol='+symbol+'&interval=1min&time_period=60&series_type=close&apikey='+API)
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
      .catch((error,symbol) => {
        this.getEMA(symbol);
        // console.log(responseJson);
        // console.error(error);
      });
  }

 async getPLUSDI(symbol) {
   var API = this.state[symbol+'Key'];
  return fetch('https://www.alphavantage.co/query?function=PLUS_DI&symbol='+symbol+'&interval=1min&time_period=7&apikey='+API)
    .then((response) => response.json())
    .then((responseJson) => {
      var result = responseJson["Technical Analysis: PLUS_DI"];
      var key = Object.keys(result)[0];
      var PLUS_DI = result[key]["PLUS_DI"];
      var key2 = Object.keys(result)[1];
      var PLUS_DI2 = result[key2]["PLUS_DI"];
      if(PLUS_DI2<10 && PLUS_DI-PLUS_DI2>7){
        this.setState({[symbol+'DIP_BUY']: true});
      } else {
        this.setState({[symbol+'DIP_BUY']: false});
      }
      this.setState({[symbol+'PLUS_DI']: PLUS_DI});
      this.setState({[symbol+'PLUS_DI2']: PLUS_DI2});
      console.log(symbol+' PLUS_DI: ' + PLUS_DI);
      this.setState({[symbol+'change']: true});
      this.setState({[symbol+'lastUpdated']: key});
    })
    .catch((error,symbol) => {
      this.getPLUSDI(symbol);
      // console.log(responseJson);
      // console.error(error);
    });
}

async getMINUSDI(symbol) {
 var API = this.state[symbol+'Key'];
 return fetch('https://www.alphavantage.co/query?function=MINUS_DI&symbol='+symbol+'&interval=1min&time_period=7&apikey='+API)
   .then((response) => response.json())
   .then((responseJson) => {
     var result = responseJson["Technical Analysis: MINUS_DI"];
     var key = Object.keys(result)[0];
     var MINUS_DI = result[key]["MINUS_DI"];
     var key2 = Object.keys(result)[1];
     var MINUS_DI2 = result[key2]["MINUS_DI"];
     if(MINUS_DI2<10 && MINUS_DI-MINUS_DI2>7){
       this.setState({[symbol+'UP_SELL']: true});
     } else {
       this.setState({[symbol+'UP_SELL']: false});
     }
     this.setState({[symbol+'MINUS_DI']: MINUS_DI});
     this.setState({[symbol+'MINUS_DI2']: MINUS_DI2});
     console.log(symbol+' MINUS_DI: ' + MINUS_DI);
     this.setState({[symbol+'change']: true});
   })
   .catch((error,symbol) => {
     this.getMINUSDI(symbol);
     // console.log(responseJson);
     // console.error(error);
   });
}

  async getSignal(symbol){
    var MarketMINUS_DI = this.state['IXIC'+'MINUS_DI'];
    var MarketMINUS_DI2 = this.state['IXIC'+'MINUS_DI2'];
    var MarketPLUS_DI = this.state['IXIC'+'PLUS_DI'];
    var MarketPLUS_DI2 = this.state['IXIC'+'PLUS_DI2'];
    var closePrice = this.state[symbol+'closePrice'];
    var EMA = this.state[symbol+'EMA'];
    var PLUS_DI = this.state[symbol+'PLUS_DI'];
    var MINUS_DI = this.state[symbol+'MINUS_DI'];
    var market = '';
    var signal = '';
    var DIP_BUY = this.state[symbol+'DIP_BUY'];
    var UP_SELL = this.state[symbol+'UP_SELL'];
    var BULL = this.state[symbol+'BULL'];

    if(MarketPLUS_DI > MarketMINUS_DI && MarketPLUS_DI>25){
      market = 'U';
    }
    else if(MarketPLUS_DI < MarketMINUS_DI && MarketMINUS_DI>25){
      market = 'D';
    }
    else {
      market = 'F';
    }

    if(MarketPLUS_DI2-MarketPLUS_DI>10){
      market = 'U';
    }
    else if(MarketMINUS_DI2-MarketMINUS_DI>10){
      market = 'D';
    }
    this.setState({market: market});

    if(BULL && EMA && PLUS_DI>MINUS_DI && PLUS_DI>25){
      signal = 'B';
    }
    else if(BULL && EMA && PLUS_DI>MINUS_DI){
      signal = 'PB';
    }
    else if(BEAR && !EMA && PLUS_DI<MINUS_DI && MINUS_DI>25){
      signal = 'S';
    }
    else if(BEAR && !EMA && PLUS_DI<MINUS_DI){
      signal = 'PS';
    }
    else{
      signal = 'N';
    }

    if(BULL && DIP_BUY){
      signal = 'DB';
    }
    else if(BEAR && UP_SELL){
      signal = 'US'
    }
    this.setState({[symbol+'signal']: signal});
    this.setState({[symbol+'change']: false});
  }

  render() {
    return (
      <View style={{backgroundColor: 'powderblue', flex: 1}}>
          <ScrollView>
                <Title>Stock Trading Application</Title>
                <Market symbol='NASDAQ' signal={this.state.market} updated={this.state.IXIClastUpdated}/>
                <StockRow symbol='AMD' closePrice={this.state.AMDclosePrice} signal={this.state.AMDsignal} updated={this.state.AMDlastUpdated}/>
                <StockRow symbol='SQ' closePrice={this.state.SQclosePrice} signal={this.state.SQsignal} updated={this.state.SQlastUpdated}/>
                <StockRow symbol='BZUN' closePrice={this.state.BZUNclosePrice} signal={this.state.BZUNsignal} updated={this.state.BZUNlastUpdated}/>
                <StockRow symbol='NVDA' closePrice={this.state.NVDAclosePrice} signal={this.state.NVDAsignal} updated={this.state.NVDAlastUpdated}/>
                <StockRow symbol='SHOP' closePrice={this.state.SHOPclosePrice} signal={this.state.SHOPsignal} updated={this.state.SHOPlastUpdated}/>
                <StockRow symbol='OLED' closePrice={this.state.OLEDclosePrice} signal={this.state.OLEDsignal} updated={this.state.OLEDlastUpdated}/>
                <StockRow symbol='ATVI' closePrice={this.state.ATVIclosePrice} signal={this.state.ATVIsignal} updated={this.state.ATVIlastUpdated}/>
                <StockRow symbol='LRCX' closePrice={this.state.LRCXclosePrice} signal={this.state.LRCXsignal} updated={this.state.LRCXlastUpdated}/>
                <StockRow symbol='DAL' closePrice={this.state.DALclosePrice} signal={this.state.DALsignal} updated={this.state.DALlastUpdated}/>
                <Button
                  onPress={() => { this.adhocRequest()}}
                  title="Refresh"
                />
          </ScrollView>
        </View>
    );
  }
}
