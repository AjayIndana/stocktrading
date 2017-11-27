import React, { PropTypes } from 'react';
import { Text, StyleSheet, View } from 'react-native';
import * as globalStyles from '../styles/global';

const ClosePrice = ({ children, ...rest }) =>{
  return (
    <View style={[styles.price]}>
      <Text style={[styles.textbox]} { ...rest }>
        {children}
      </Text>
    </View>
  )
}

ClosePrice.propTypes = {
  style: Text.propTypes.style
};

const styles = StyleSheet.create({
  price: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    width: 100,
    height: 50,
    backgroundColor: '#172366',
  },
  textbox: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 15,
  }
});

export default ClosePrice;
