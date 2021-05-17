/* eslint-disable react/jsx-one-expression-per-line */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { StyleSheet } from 'react-native';
import PropTypes from 'prop-types';
import {
  Container,
  List,
  Left,
  Right,
  Content,
  Card,
  CardItem,
  Text,
} from 'native-base';
import { getPaymentHist } from '../redux/actions';

const styles = StyleSheet.create({
  bottomNavigation: {
    marginVertical: 8,
  },
});

const mapDispatchToProps = (dispatch) => ({
  getHistory: () => dispatch(getPaymentHist()),
});

const mapStateToProps = (state) => ({
  ledger: state.apt.ledger,
});

function getReformatDate(date) {
  // reformat -> 12/19/2012, 7:00:00 PM
  const oldDate = new Date(date);
  return oldDate.toLocaleString('en-US');
}

class LedgerList extends Component {
  componentDidMount() {
    console.log('message screen - fetching /apt/getPaymentHist');

    this.props.getHistory();
  }

  render() {
    const { ledger } = this.props;

    console.log('LedgerList ledger: ', ledger);
    const ledgerList = ledger.sort((a, b) => new Date(a.date) < new Date(b.date))
      .map((item) => (
        <Card
          key={item['_id']}
        >
          <CardItem header bordered>
            <Left>
              <Text> {item.payer} </Text>
            </Left>
            <Right>
              <Text> {getReformatDate(item.date)} </Text>
            </Right>
          </CardItem>
          <CardItem>
            <Text>${item.payment}</Text>
          </CardItem>
        </Card>
      ));

    return (
      <Container style={{ padding: '1%' }}>
        <Content>
          <List>
            {ledgerList}
          </List>
        </Content>
      </Container>
    );
  }
}

LedgerList.propTypes = {
  ledger: PropTypes.arrayOf(PropTypes.object).isRequired,
  getHistory: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(LedgerList);
