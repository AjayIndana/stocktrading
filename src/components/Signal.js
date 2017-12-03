import React, { PropTypes } from 'react';
import { Text, StyleSheet, View } from 'react-native';
import * as globalStyles from '../styles/global';

const Signal = ({ children, ...rest }) =>{
  return (
    <View style={[styles.buySignal]}>
      <Text style={[styles.textbox]} { ...rest }>
        {children}
      </Text>
    </View>
  )
}

Signal.propTypes = {
  style: Text.propTypes.style
};

const styles = StyleSheet.create({
  buySignal: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    width: 40,
    height: 50,
    backgroundColor: 'green',
  },
  sellSignal: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    height: 50,
    backgroundColor: 'red',
  },
  neutralSignal: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    height: 50,
    backgroundColor: 'grey',
  },
  textbox: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 15,
  }
});

export default Signal;
