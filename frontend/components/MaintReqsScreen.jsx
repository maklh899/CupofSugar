import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {
  StyleSheet, View,
} from 'react-native';

import {
  Container,
  Content,
} from 'native-base';

import MainReqsList from './MainReqsList';

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

const MaintReqsScreen = ({
  navigation
}) => {
  MaintReqsScreen.propTypes = {
    navigation: PropTypes.shape({
      navigate: PropTypes.func.isRequired,
    }).isRequired,
  };

  return (
    <Container style={{ flex: 1 }}>
      <Content>
        <MainReqsList />
      </Content>
    </Container>
  );
};
export default connect(null, null)(MaintReqsScreen);
