import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { View, StyleSheet } from 'react-native';
import {
  Container,
  Form,
  Item,
  Input,
  Label,
  Button,
  Body,
  Right,
  Card,
  CardItem,
  Text,
  Center,
  Content,
} from 'native-base';
import { makeMaintReq } from '../redux/actions';

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    position: 'relative',
  },
  card: {
    marginTop: 30,
  },
  button: {
    width: '100%',
    justifyContent: 'center',
    // alignItems: 'center',
  },
  cardBody: {
    height: '40%',
    // display: 'flex',
    // flexDirection: 'column',
    // justifyContent: 'space-between',
    // alignItems: 'center',
  },
  cardFooter: {
    display: 'flex',
    marginTop: 10,
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});

const mapStateToProps = (state) => ({
  error: state.apt.error,
});

const mapDispatchToProps = (dispatch) => ({
  makeReq: (request) => dispatch(makeMaintReq({ request })),
});

const CreateMaintReqScreen = ({
  navigation, makeReq, error,
}) => {
  const [request, setRequest] = useState('');

  console.log('error', error);

  const handleRequestChange = (event) => {
    setRequest(event);
    // console.log('apt input:', event);
  };

  CreateMaintReqScreen.propTypes = {
    makeReq: PropTypes.func.isRequired,
    error: PropTypes.string.isRequired,
    navigation: PropTypes.shape({
      navigate: PropTypes.func.isRequired,
      goBack: PropTypes.func.isRequired,
    }).isRequired,
  };

  return (
    <Container style={{ flex: 1 }}>
      <Content>
        <Card>
          <CardItem header bordered>
            <Text>Make A Maintenece Requests</Text>
          </CardItem>
          <CardItem>
            <Text>
              Explain the issue you are having. Please use as much
              detail as possible so we can quickly resolve the problem.
            </Text>
          </CardItem>
          <CardItem style={styles.cardBody}>
            <Body>
              <Item regular style={{ height: '100%' }}>
                <Input
                  multiline
                  value={request}
                  onChangeText={(text) => { handleRequestChange(text); }}
                />
              </Item>
            </Body>
          </CardItem>
          <CardItem style={styles.cardFooter}>
            { error !== ''
          && (
            <Text>
              {error}
            </Text>
          )}
            <Button
              style={styles.button}
              onPress={() => {
                makeReq(request);
                navigation.navigate('Maintence Requests');
              }}
            >
              <Text> Submit </Text>
            </Button>
          </CardItem>
        </Card>
      </Content>
    </Container>
  );
};
export default connect(mapStateToProps, mapDispatchToProps)(CreateMaintReqScreen);
