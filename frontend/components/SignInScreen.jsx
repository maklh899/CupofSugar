import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import styles from './styles';
import { Button, View } from 'react-native';
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
} from 'native-base';
import { signIn } from '../redux/actions/userActions';

// import history from '../helpers/history';
const mapStateToProps = (state) => ({
  storedUserName: state.authentication.username,
  isUserLoggedIn: state.authentication.isAuthenticated,
  error: state.authentication.error,
});

const mapDispatchToProps = (dispatch) => ({
  login: (userName, password) => dispatch(signIn({ userName, password })),
});

const Signin = ({
  login, navigation, storedUserName, isUserLoggedIn, error,
}) => {
  // const { error } = useSelector((state) => state.authentication);
  const [userName, setUserName] = useState('');
  // const [email, setEmail] = useState('');
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
        navigation.replace('BottomNaviRoutes');
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

  // const handleSignInClick = (event) => {
  //     event.preventDefault();
  //     dispatch(signIn({ userName, password }));

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
    }).isRequired,
  };

  // onChangeText={(text) => { handleUsernameChange(text); console.log('input:', text); }}
  return (
    <Container style={styles.screenContainer}>
      <Card style={styles.card}>
        <CardItem>
          <Item stackedLabel>
            <Label>User Name</Label>
            <Input
              // value={userName}
              onChangeText={(text) => { handleUsernameChange(text); }}
            />
          </Item>
        </CardItem>
        <CardItem>
          <Item stackedLabel>
            <Label>Password</Label>
            <Input
              value={password}
              onChangeText={(text) => { handlePasswordChange(text); }}
            />
          </Item>
        </CardItem>
        <CardItem>
          <Button
            title="login"
            onPress={() => login(userName, password)}
          />
          { error !== ''
          && (
            <Text>
              {error}
            </Text>
          )}

        </CardItem>
        <CardItem>
          <Button
            title="Don't have an account?"
            transparent
            onPress={() => navigation.navigate('Register')}
          />
        </CardItem>
        <Text>{status}</Text>
      </Card>
    </Container>

  );
};

export default connect(mapStateToProps, mapDispatchToProps)(Signin);
// export default connect(mapStateToProps)(Signin);
