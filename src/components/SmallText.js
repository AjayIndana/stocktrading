import React, { PropTypes } from 'react';
import { Text, StyleSheet } from 'react-native';
import AppText from './AppText';
import * as globalStyles from '../styles/global';

const SmallText = ({ children, style, ...rest }) => (
  <AppText style={[styles.small, style]} { ...rest }>
    {children}
  </AppText>
);

SmallText.propTypes = {
  style: Text.propTypes.style
};

const styles = StyleSheet.create({
  small: {
    fontSize: 11
  }
});

export default SmallText;
