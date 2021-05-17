/* eslint-disable react/jsx-one-expression-per-line */
import React, { setState, Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {
  StyleSheet, View,
} from 'react-native';

import {
  Container,
  Button,
  CardItem,
  Item,
  Form,
  Input,
  Text,
  Card,
  Label,
} from 'native-base';
import { makePayment, getBalanceInfo } from '../redux/actions';

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    position: 'relative',
  },
  card: {
    marginTop: 30,
    width: '90%',
  },
  bottomItem: {
    //marginTop: 80,
    marginLeft: 40,
    display: 'flex',
    height: '20%',
    width: '90%',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  button: {
    marginTop: 10,
    width: '90%',
    justifyContent: 'center',
    // alignItems: 'center',
  },
});

const mapStateToProps = (state) => ({
  error: state.apt.error,
  balanceDue: state.apt.balanceDue,
  payResponse: state.apt.payResponse,
});

const mapDispatchToProps = (dispatch) => ({
  pay: (amount) => dispatch(makePayment({ amount })),
  getbalance: () => dispatch(getBalanceInfo()),
});

class paymentScreen extends Component {
  constructor() {
    super();
    this.handleAmountChange = this.handleAmountChange.bind(this);
    this.state = {
      amount: null,
    };
  }

  componentDidMount() {
    console.log('paymentScreen screen - fetching /apt/getbalance');

    // 1000ms = 1sec refresh
    const { getbalance } = this.props;
    setInterval(getbalance, 1000);
    // this.props.getbalance();
  }

  handleAmountChange(event) {
    this.setState({ amount: event });
    console.log('amount:', event);
  }
  // const handleAmountChange = (event) => {
  //   setAmount(event);
  //   console.log('amount:', event);
  // };

  render() {
    const {
      pay, navigation, error, balanceDue, payResponse,
    } = this.props;
    const { amount } = this.state;
    return (
      <Container style={styles.screenContainer}>
        <Card>
          <CardItem header bordered>
            <Text> Current Balance Due: ${balanceDue} </Text>
          </CardItem>
          <CardItem>
            <Form>
              <Item stackedLabel>
                <Label>Amount:</Label>
                <Input
                  value={amount}
                  onChangeText={(text) => { this.handleAmountChange(text); }}
                />
              </Item>
            </Form>
          </CardItem>
          <CardItem style={styles.bottomItem}>
            { error !== ''
              && (
                <Text>
                  {error}
                </Text>
              )}
            { payResponse !== ''
              && (
                <Text>
                  {payResponse}
                </Text>
              )}
            <Button
              style={styles.button}
              onPress={() => {
                pay(amount);
              }}
            >
              <Text> Pay </Text>
            </Button>

          </CardItem>
        </Card>
      </Container>

    );
  }
}

// paymentScreen.defaultProps = {
//   balanceDue: 0,
// };

paymentScreen.propTypes = {
  pay: PropTypes.func.isRequired,
  error: PropTypes.string.isRequired,
  payResponse: PropTypes.string.isRequired,
  balanceDue: PropTypes.number.isRequired,
  getbalance: PropTypes.func.isRequired,
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
    replace: PropTypes.func.isRequired,
  }).isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(paymentScreen);
