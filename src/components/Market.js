import React, { PropTypes, Component } from 'react';
import { Alert, Text, StyleSheet, View, TouchableOpacity } from 'react-native';
import Sticker from './Sticker';
import Signal from './Signal';
import ClosePrice from './ClosePrice';
import HomeScreen from './HomeScreen';
import Time from './Time';
import * as globalStyles from '../styles/global';

class Market extends Component {

  render(){
    return (
        <View style={[styles.stockRow]}>
          <Sticker>{this.props.symbol}</Sticker>
          <Signal>{this.props.signal}</Signal>
          <Time>{this.props.updated}</Time>
        </View>
    );
  }
}

Market.propTypes = {
  style: Text.propTypes.style
};

const styles = StyleSheet.create({
  stockRow: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'flex-start'
  }
});

export default Market;
