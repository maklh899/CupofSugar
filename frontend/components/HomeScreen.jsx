import React from 'react';
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
    width: '95%',
  },
  paybutton: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },

});

function HomeScreen(obj) {
  const { navigation, route } = obj;
  return (

    <Container style={styles.container}>
      <Content>
      <Card style={styles.paycard}>
        <CardItem header>
          <Text>Current Payment Due</Text>
        </CardItem>
        <CardItem>
          <Text>$1000</Text>
        </CardItem>
        <CardItem>
          <Text>Bill due on March 01, 2021</Text>
        </CardItem>
        <CardItem>
          <Button status="primary" style={styles.paybutton} onPress={() => navigation.navigate('Payment')}>
            <Text>Pay Now</Text>
          </Button>
        </CardItem>
        <CardItem Bottom>
          <Button transparent>
            <Text>See Ledger</Text>
          </Button>

        </CardItem>
      </Card>
      <Card style={styles.paycard}>
        <CardItem header>
          <Text>Maintence Request</Text>
        </CardItem>
        <CardItem>
          <Button status="primary" style={styles.paybutton}>
            <Text>Make a Request</Text>
          </Button>
        </CardItem>
      </Card>
      </Content>
    </Container>
  );
}
export default HomeScreen;
