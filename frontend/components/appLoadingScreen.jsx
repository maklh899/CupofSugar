import React from 'react';
import { Text, View, TouchableWithoutFeedback } from 'react-native';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import styles from './styles';

const handleClick = (isUserLoggedIn, navigation) => (
  isUserLoggedIn
    ? navigation.navigate('Home')
    : navigation.navigate('Login') // Login
);

const AppLoadingScreen = ({ navigation, isUserLoggedIn, ...props }) => (
  <TouchableWithoutFeedback onPress={() => handleClick(isUserLoggedIn, navigation)}>
    <View style={styles.page}>
      <Text>Touch Screen to start!</Text>
      <Text>status: {isUserLoggedIn}</Text>
    </View>
  </TouchableWithoutFeedback>
);

// grabing from the current states
const mapStateToProps = (state) => ({
  isUserLoggedIn: state.authentication.isAuthenticated,
});

AppLoadingScreen.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
  isUserLoggedIn: PropTypes.bool.isRequired,
};

export default connect(mapStateToProps)(AppLoadingScreen);
