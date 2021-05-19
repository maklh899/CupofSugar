import React from 'react';
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
  Content,
} from 'native-base';

import LedgerList from './LedgerList';

const styles = StyleSheet.create({
  topView: {
    margin: 20,
    display: 'flex',
    width: '90%',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

const LedgerScreen = ({
  navigation
}) => {
  LedgerScreen.propTypes = {
    navigation: PropTypes.shape({
      navigate: PropTypes.func.isRequired,
    }).isRequired,
  };

  return (
    <Container style={{ flex: 1 }}>
      <Content>
        <LedgerList />
      </Content>
    </Container>
  );
};
export default connect(null, null)(LedgerScreen);
