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
});

const mapDispatchToProps = (dispatch) => ({
  login: (userName, password) => dispatch(signIn({ userName, password })),
});

const Signin = ({
  login, navigation, storedUserName, isUserLoggedIn,
}) => {
  // const { error } = useSelector((state) => state.authentication);
  const [userName, setUserName] = useState('');
  // const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [status, setStatus] = useState('...');
  console.log(signIn);
  useEffect(() => {
    setStatus(isUserLoggedIn
      ? `Successfully logged in as ${storedUserName}`
      : 'Not Logged In');
    if (isUserLoggedIn) {
      setTimeout(() => {
        navigation.navigate('App');
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
    navigation: PropTypes.shape({
      navigate: PropTypes.func.isRequired,
    }).isRequired,
  };

  // onChangeText={(text) => { handleUsernameChange(text); console.log('input:', text); }}
  return (
    <Container style={styles.container}>
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

        </CardItem>
        <CardItem>
          <Button
            title="Don't have an account?"
            transparent
            onPress={() => navigation.navigate('Sign Up')}
          />
        </CardItem>
        <Text>{status}</Text>
      </Card>
    </Container>

  );
};

export default connect(mapStateToProps, mapDispatchToProps)(Signin);
// export default connect(mapStateToProps)(Signin);
{/* <div className="mycard">
            <div className="card auth-card input-field">
                <input
                    type="text"
                    placeholder="email"
                    value={email}
                    onChange={handleEmailChange}
                />
                <input
                    type="password"
                    placeholder="password"
                    value={password}
                    onChange={handlePasswordChange}
                />
                {error !== null ? <div className="error">{error}</div> : null}
                <button
                    type="button"
                    className="btn waves-effect waves-light #42a5f5 blue lighten-1"
                    onClick={handleSignInClick}
                >
                    Login
                </button>
                <Link to="/signup"> Don't have an account?</Link>
            </div>
        </div> */}
