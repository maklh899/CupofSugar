import React from 'react';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Container, Header, Content, Footer, FooterTab, Button, Text } from 'native-base';

import styles from './styles';

const { Navigator, Screen } = createBottomTabNavigator();

function UserBottomNavi(screenProps) {
  const { screens, onRequestNavigate, selectedIndex } = screenProps;
  return (
    <Footer>
      <FooterTab>
        {
          screens.filter((screen) => screen.userAuthorized !== false).map((screen, i) => (
            <Button
              key={screen.name}
              active={selectedIndex === i}
              onPress={() => onRequestNavigate(screen.name)}
            >
              <Text>{screen.name}</Text>
            </Button>
          ))
        }
      </FooterTab>
    </Footer>
  );
}

export default UserBottomNavi;

{/* <Button
          active ={true}
          onPress={() => onRequestNavigate('Home')}
        >
          <Text>Home</Text>
        </Button>
        <Button
          active ={false}
          onPress={() => onRequestNavigate('Messages')}
        >
          <Text>Messages</Text>
        </Button> */}