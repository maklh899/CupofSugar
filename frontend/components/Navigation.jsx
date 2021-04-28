/* eslint-disable react/jsx-props-no-spreading */
import * as React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './HomeScreen';
import ChatroomsScreen from './ChatroomsScreen';
import LoginScreen from './SignInScreen';
import RegisterScreen from './SignUpScreen';
import BottomNavi from './UserBottomNavi';

const navigationRef = React.createRef();
// const screens = {
//   Register: {
//     screen: RegisterScreen,
//   },
//   Login: {
//     screen: LoginScreen,
//   },
//   Home: {
//     isIntialRoute: true,
//     screen: HomeScreen,
//     options: {
//       headerShown: true,
//     },
//   },
//   Messages: {
//     screen: ChatroomsScreen,
//   },
// };

const Stack = createStackNavigator();

const mapStateToProps = (state) => ({
  isUserLoggedIn: state.authentication.isAuthenticated,
});

function Navigation(props) {
  const screens = [
    {
      name: 'Register',
      component: RegisterScreen,
      userAuthorized: false,
    },
    {
      name: 'Login',
      component: LoginScreen,
      userAuthorized: false,
    },
    {
      name: 'Home',
      isIntialRoute: true,
      component: HomeScreen,
      options: {
        headerShown: true,
      },
    },
    {
      name: 'Messages',
      component: ChatroomsScreen,
    },
  ];
  const initialScreen = screens.find((cur) => cur.isIntialRoute);
  const tabScreens = screens.filter((cur) => cur.tab);
  const routeIndexRef = React.useRef();
  const [tabIndex, setTabIndex] = React.useState(tabScreens.indexOf(initialScreen));

  const { isUserLoggedIn } = props;
  console.log('isUserLoggedIn: ', isUserLoggedIn);
  const BottomNavigation = !isUserLoggedIn ? (
    <BottomNavi
      screens={screens}
      onRequestNavigate={(routeName) => navigationRef.current.navigate(routeName)}
      selectedIndex={tabIndex}
    />
  ) : (<></>);

  return (
    <NavigationContainer
      ref={navigationRef}
      onStateChange={(nav) => {
        if (routeIndexRef.current !== nav.index) {
          const routeName = nav.routes[nav.index].name;
          let dstIndex = tabScreens.findIndex((cur) => cur.name === routeName);
          if (dstIndex < 0) {
            dstIndex = undefined;
          }
          setTabIndex(dstIndex);
        }
        routeIndexRef.current = nav.index;
      }}
    >
      <Stack.Navigator
        initialRouteName={screens.find((screen) => screen.isIntialRoute).name}
      >
        {
          screens.map((screen) => (<Stack.Screen {...screen} key={screen.name} />))
        }
      </Stack.Navigator>
      {
        BottomNavigation
      }

    </NavigationContainer>
  );
}

Navigation.propTypes = {
  isUserLoggedIn: PropTypes.bool.isRequired,
};

export default connect(mapStateToProps)(Navigation);

// const screens = [
//   {
//     name: 'Register',
//     component: RegisterScreen,
//   },
//   {
//     name: 'Login',
//     component: LoginScreen,
//   },
//   {
//     name: 'Home',
//     isIntialRoute: true,
//     component: HomeScreen,
//     options: {
//       headerShown: true,
//     },
//   },
//   {
//     name: 'Messages',
//     component: ChatroomsScreen,
//   },
//   {
//     initialRouteName: load
//   },
// ];