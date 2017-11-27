import React, { PropTypes } from 'react';
import { Text, StyleSheet, View } from 'react-native';
import * as globalStyles from '../styles/global';

const Sticker = ({ children, ...rest }) =>{
  return (
    <View style={[styles.sticker]}>
      <Text style={[styles.textbox]} { ...rest }>
        {children}
      </Text>
    </View>
  )
}

Sticker.propTypes = {
  style: Text.propTypes.style
};

const styles = StyleSheet.create({
  sticker: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    width: 100,
    height: 50,
    backgroundColor: 'steelblue',
  },
  textbox: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 15,
  }
});

export default Sticker;
