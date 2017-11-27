import React, { PropTypes, Component } from 'react';
import { Alert, Text, StyleSheet, View, TouchableOpacity } from 'react-native';
import Sticker from './Sticker';
import Signal from './Signal';
import ClosePrice from './ClosePrice';
import HomeScreen from './HomeScreen';
import * as globalStyles from '../styles/global';

class StockRow extends Component {

  render(){
    return (
        <View style={[styles.stockRow]}>
          <Sticker>{this.props.symbol}</Sticker>
          <Signal>{this.props.signal}</Signal>
          <ClosePrice>{this.props.closePrice}</ClosePrice>
        </View>
    );
  }
}

StockRow.propTypes = {
  style: Text.propTypes.style
};

const styles = StyleSheet.create({
  stockRow: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'flex-start'
  }
});

export default StockRow;
