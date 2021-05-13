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
import { signUp } from '../redux/actions/userActions';

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
  },
  card: {
    marginTop: 30,
    width: '90%',
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
  createdAccount: state.authentication.createdAccount,
  error: state.authentication.signUpErr,
});

const mapDispatchToProps = (dispatch) => ({
  register: (firstname, lastname, username, email, password, apt) => {
    dispatch(signUp({
      firstname, lastname, username, email, password, apt,
    }));
  },
});

const SignUp = ({
  navigation,
  error,
  createdAccount,
  register,

}) => {
  const [username, setUsername] = useState('');
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [status, setStatus] = useState('...');
  const [apt, setApt] = useState('');

  console.log('error', error);
  useEffect(() => {
    setStatus(createdAccount
      ? 'Successfully Created Account'
      : 'Not Logged In');
    if (createdAccount) {
      setTimeout(() => {
        navigation.navigate('Login');
        ///navigation.replace('App');
      }, 3000);
    }
  }, [createdAccount]);

  const handleFirstnameChange = (event) => {
    setFirstname(event);
  };
  const handleLastnameChange = (event) => {
    setLastname(event);
  };
  const handleUsernameChange = (event) => {
    console.log('username:', event);
    setUsername(event);
  };
  const handleEmailChange = (event) => {
    setEmail(event);
  };
  const handlePasswordChange = (event) => {
    setPassword(event);
  };
  const handleAptChange = (event) => {
    //const aptInt = parseInt(event, 10);
    setApt(event);
  };

  SignUp.propTypes = {
    register: PropTypes.func.isRequired,
    createdAccount: PropTypes.bool.isRequired,
    error: PropTypes.string.isRequired,
    navigation: PropTypes.shape({
      navigate: PropTypes.func.isRequired,
      replace: PropTypes.func.isRequired,
    }).isRequired,
  };

  return (
    <Container style={styles.container}>
      <Form>
        <Item floatingLabel>
          <Label>First Name</Label>
          <Input
            value={firstname}
            onChangeText={(text) => { handleFirstnameChange(text); }}
          />
        </Item>
        <Item floatingLabel>
          <Label>Last Name</Label>
          <Input
            value={lastname}
            onChangeText={(text) => { handleLastnameChange(text); }}
          />
        </Item>
        <Item floatingLabel>
          <Label>Username</Label>
          <Input
            value={username}
            onChangeText={(text) => { handleUsernameChange(text); }}
            // onChange={handleUsernameChange}
          />
        </Item>
        <Item floatingLabel>
          <Label>Email</Label>
          <Input
            value={email}
            onChangeText={(text) => { handleEmailChange(text); }}
          />
        </Item>
        <Item floatingLabel>
          <Label>Password</Label>
          <Input
            value={password}
            onChangeText={(text) => { handlePasswordChange(text); }}
          />
        </Item>
        <Item floatingLabel last>
          <Label>Apartment #</Label>
          <Input
            value={apt}
            onChangeText={(text) => { handleAptChange(text); }}
          />
        </Item>
        <View style={styles.bottomView}>
          <Text>{status}</Text>
          <Button
            style={styles.button}
            onPress={() => register(
              firstname, lastname, username, email, password, apt,
            )}
          >
            <Text>Register</Text>
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
            onPress={() => navigation.navigate('Login')}
          >
            <Text>Have an account?</Text>
          </Button>
        </View>
      </Form>
    </Container>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);
