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
import { getMaintReqs } from '../redux/actions';

const mapDispatchToProps = (dispatch) => ({
  getReqs: () => dispatch(getMaintReqs()),
});

const mapStateToProps = (state) => ({
  aptMainReqs: state.apt.aptMainReqs,
});

function getReformatDate(date) {
  // reformat -> 12/19/2012, 7:00:00 PM
  const oldDate = new Date(date);
  return oldDate.toLocaleString('en-US');
}

class MainReqsList extends Component {
  componentDidMount() {
    console.log('mainReqs screen - fetching /apt/getMaintReqs');

    this.props.getReqs();
  }

  render() {
    const { aptMainReqs } = this.props;

    // console.log('MainReqsList ledger: ', aptMainReqs);
    const reqList = aptMainReqs.sort((a, b) => new Date(a.date) < new Date(b.date))
      .map((req) => (
        <Card
          key={req['_id']}
        >
          <CardItem header bordered>
            <Text> {req.requestor} </Text>
            <Right>
              <Text> {getReformatDate(req.date)} </Text>
            </Right>
          </CardItem>
          <CardItem bordered>
            <Text>Status: {req.status}</Text>
          </CardItem>
          <CardItem>
            <Text>{req.body}</Text>
          </CardItem>
        </Card>
      ));

    return (
      <Container style={{ padding: '1%' }}>
        <Content>
          <List>
            {reqList}
          </List>
        </Content>
      </Container>
    );
  }
}

MainReqsList.propTypes = {
  aptMainReqs: PropTypes.arrayOf(PropTypes.object).isRequired,
  getReqs: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(MainReqsList);
