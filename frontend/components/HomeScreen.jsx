/* eslint-disable react/jsx-one-expression-per-line */
import React, { Component }from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { View, StyleSheet } from 'react-native';
import {
  Container,
  Header,
  Title,
  Content,
  Body,
  Right,
  Footer,
  FooterTab,
  Button,
  Card,
  CardItem,
  Text,
} from 'native-base';
import { getBalanceInfo } from '../redux/actions';

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flex: 1,
    // justifyContent: 'center',
  },
  authbutton: {
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  paycard: {
    marginTop: 20,
    width: '90%',
  },
  paybutton: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },

});

const mapDispatchToProps = (dispatch) => ({
  getbalance: () => dispatch(getBalanceInfo()),
});

const mapStateToProps = (state) => ({
  paymentMonth: state.apt.paymentMonth,
  balanceDue: state.apt.balanceDue,
});

function getReformatDate(date) {
  // reformat -> "Sun Jul 22 2018"
  const oldDate = new Date(date);
  return oldDate.toDateString();
}

class HomeScreen extends Component {
  componentDidMount() {
    console.log('payment screen - fetching /apt/getPaymentHist');

    this.props.getbalance();
  }

  render() {
    const { navigation, balanceDue, paymentMonth } = this.props;

    return (
      <Container style={styles.container}>
        
          <Card style={styles.paycard}>
            <CardItem header>
              <Text>Current Payment Due:</Text>
            </CardItem>
            <CardItem>
              <Text>${balanceDue}</Text>
            </CardItem>
            <CardItem>
              <Text>Bill due on {getReformatDate(paymentMonth)}</Text>
            </CardItem>
            <CardItem>
              <Button status="primary" style={styles.paybutton} onPress={() => navigation.navigate('Make Payment')}>
                <Text>Pay Now</Text>
              </Button>
            </CardItem>
            <CardItem Bottom>
              <Button transparent style={styles.paybutton} onPress={() => navigation.navigate('Payment History')}>
                <Text>See Payment History</Text>
              </Button>

            </CardItem>
          </Card>
          <Card style={styles.paycard}>
            <CardItem header>
              <Text>Maintence Request</Text>
            </CardItem>
            <CardItem>
              <Button style={styles.paybutton} onPress={() => navigation.navigate('Create Maintence Request')}>
                <Text>Create a Request</Text>
              </Button>
            </CardItem>
            <CardItem Bottom>
              <Button transparent style={styles.paybutton} onPress={() => navigation.navigate('Maintence Requests')}>
                <Text>See Maintence Requests</Text>
              </Button>
            </CardItem>
          </Card>
        
      </Container>
    );
  }
}

HomeScreen.propTypes = {
  paymentMonth: PropTypes.string.isRequired,
  balanceDue: PropTypes.number.isRequired,
  getbalance: PropTypes.func.isRequired,
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
    replace: PropTypes.func.isRequired,
  }).isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen);
