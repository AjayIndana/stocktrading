import React, { PropTypes } from 'react';
import { Text, StyleSheet, View } from 'react-native';
import * as globalStyles from '../styles/global';

const Time = ({ children, ...rest }) =>{
  return (
    <View style={[styles.sticker]}>
      <Text style={[styles.textbox]} { ...rest }>
        {children}
      </Text>
    </View>
  )
}

Time.propTypes = {
  style: Text.propTypes.style
};

const styles = StyleSheet.create({
  sticker: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    height: 50,
    backgroundColor: 'steelblue',
  },
  textbox: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 15,
  }
});

export default Time;
