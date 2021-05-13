/* eslint-disable react/jsx-one-expression-per-line */
import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
// import styles from './styles';
import { View, StyleSheet } from 'react-native';
import {
  Container,
  Header,
  Content,
  Card,
  CardItem,
  Input,
  Text,
  Label,
  Item,
  Button,
  Form,
} from 'native-base';
import { signOut } from '../redux/actions/userActions';

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
  },
  card: {
    marginTop: 30,
  },
  cardItem: {
    height: 100,
  },
  bottomView: {
    margin: 40,
    display: 'flex',
    height: '20%',
    width: '90%',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  button: {
    width: '90%',
    justifyContent: 'center',
    // alignItems: 'center',
  },
});
const mapStateToProps = (state) => ({
  currUser: state.authentication.currentUser,
  isUserLoggedIn: state.authentication.isAuthenticated,
  error: state.authentication.error,
});

const mapDispatchToProps = (dispatch) => ({
  loggout: () => dispatch(signOut()),
  dispatch,
});

const ProfileScreen = ({
  navigation,
  error,
  currUser,
  loggout,

}) => {
  console.log('ProfileScreen currUser:', currUser);
  console.log('error', error);
  // useEffect(() => {
  //   setStatus(createdAccount
  //     ? 'Successfully Created Account'
  //     : 'Not Logged In');
  //   if (createdAccount) {
  //     setTimeout(() => {
  //       navigation.navigate('Login');
  //       ///navigation.replace('App');
  //     }, 3000);
  //   }
  // }, [createdAccount]);

  ProfileScreen.propTypes = {
    loggout: PropTypes.func.isRequired,
    currUser: PropTypes.shape({
      userName: PropTypes.string.isRequired,
      firstName: PropTypes.string.isRequired,
      lastName: PropTypes.string.isRequired,
      email: PropTypes.string.isRequired,
      aptId: PropTypes.number.isRequired,
    }).isRequired,
    error: PropTypes.string.isRequired,
    navigation: PropTypes.shape({
      navigate: PropTypes.func.isRequired,
      replace: PropTypes.func.isRequired,
    }).isRequired,
  };

  return (
    <Container style={styles.container}>
      <Card>
        <CardItem header bordered>
          <Text> {currUser.firstName} {currUser.lastName} </Text>
        </CardItem>
        <CardItem bordered style={styles.cardItem}>
          <Text> Username: {currUser.userName}</Text>
        </CardItem>
        <CardItem bordered style={styles.cardItem}>
          <Text> Email: {currUser.email}</Text>
        </CardItem>
        <CardItem bordered style={styles.cardItem}>
          <Text> APT Unit: {currUser.aptId}</Text>
        </CardItem>
      </Card>
      <View style={styles.bottomView}>
        { error !== ''
            && (
              <Text>
                {error}
              </Text>
            )}

        <Button
          style={styles.button}
          primary
          onPress={() => {
            navigation.replace('Auth');
            loggout();
          }}
        >
          <Text>Sign Out</Text>
        </Button>
      </View>

    </Container>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(ProfileScreen);
