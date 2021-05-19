import React, { Component } from 'react';
import {
  Text, View, StyleSheet, ActivityIndicator,
} from 'react-native';
import { Spinner } from 'native-base';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

const styles = StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: 'rgba(107,157,158,1)',
    alignItems: 'center',
    // justifyContent: 'center',
  },
  text: {
    marginTop: '60%',
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 50,
  },
  spinner: {
    marginTop: '50%',
    color: '#fff',
  },
});

const handleLoading = (isUserLoggedIn, navigation) => (
  navigation.replace(
    isUserLoggedIn ? 'App' : 'Auth',
  )
);
// grabing from the current states
const mapStateToProps = (state) => ({
  isUserLoggedIn: state.authentication.isAuthenticated,
});

class AppLoadingScreen extends Component {
  componentDidMount() {
    const { navigation, isUserLoggedIn } = this.props;
    setTimeout(() => {
      handleLoading(isUserLoggedIn, navigation);
    }, 3000);
  }

  render() {
    return (
      <View style={styles.page}>
        <Text style={styles.text}>Cup of Sugar</Text>
        <ActivityIndicator style={styles.spinner} />
      </View>
    );
  }
}

AppLoadingScreen.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
  isUserLoggedIn: PropTypes.bool.isRequired,
};

export default connect(mapStateToProps)(AppLoadingScreen);
