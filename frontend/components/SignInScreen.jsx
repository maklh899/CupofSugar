import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
// import styles from './styles';
import { View, StyleSheet, Image } from 'react-native';
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
  Form,
  Button,
} from 'native-base';
import { signIn } from '../redux/actions/userActions';

const cosLogo = require('./logo/cupOfSugar.png');

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    position: 'relative',
  },
  bottomView: {
    margin: 40,
    display: 'flex',
    height: '30%',
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
  storedUserName: state.authentication.username,
  isUserLoggedIn: state.authentication.isAuthenticated,
  error: state.authentication.signInErr,
});

const mapDispatchToProps = (dispatch) => ({
  login: (userName, password) => dispatch(signIn({ userName, password })),
});

const Signin = ({
  login, navigation, storedUserName, isUserLoggedIn, error,
}) => {
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [status, setStatus] = useState('...');
  console.log(signIn);
  console.log('error', error);
  useEffect(() => {
    setStatus(isUserLoggedIn
      ? `Successfully logged in as ${storedUserName}`
      : 'Not Logged In');
    if (isUserLoggedIn) {
      setTimeout(() => {
        // navigation.navigate('App');
        navigation.replace('App');
      }, 3000);
    }
  }, [isUserLoggedIn, storedUserName]);

  const handleUsernameChange = (event) => {
    setUserName(event);
    console.log('username:', event);
  };
  const handlePasswordChange = (event) => {
    setPassword(event);
  };

  Signin.defaultProps = {
    storedUserName: '',
  };

  Signin.propTypes = {
    login: PropTypes.func.isRequired,
    storedUserName: PropTypes.string,
    isUserLoggedIn: PropTypes.bool.isRequired,
    error: PropTypes.string.isRequired,
    navigation: PropTypes.shape({
      navigate: PropTypes.func.isRequired,
      replace: PropTypes.func.isRequired,
    }).isRequired,
  };

  // onChangeText={(text) => { handleUsernameChange(text); console.log('input:', text); }}
  return (
    <Container style={styles.screenContainer}>
      <Image style={{ width: '100%', height: '20%' }} source={cosLogo} />
      <Form>
        <Item floatingLabel>
          <Label>Username</Label>
          <Input
            onChangeText={(text) => { handleUsernameChange(text); }}
          />
        </Item>
        <Item floatingLabel last>
          <Label>Password</Label>
          <Input
            value={password}
            onChangeText={(text) => { handlePasswordChange(text); }}
          />
        </Item>
        <View style={styles.bottomView}>
          <Text>{status}</Text>
          <Button
            style={styles.button}
            title="login"
            onPress={() => login(userName, password)}
          >
            <Text> Login </Text>
          </Button>
          { error !== ''
          && (
            <Text>
              {error}
            </Text>
          )}
          <Button
            style={styles.button}
            primary
            onPress={() => navigation.navigate('Register')}
          >
            <Text>Don't have an account?</Text>
          </Button>
        </View>

      </Form>
    </Container>

  );
};

export default connect(mapStateToProps, mapDispatchToProps)(Signin);
// export default connect(mapStateToProps)(Signin);
