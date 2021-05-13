/* eslint-disable react/jsx-props-no-spreading */
import * as React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { NavigationContainer, getFocusedRouteNameFromRoute } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import SplashScreen from './SplashScreen';
import HomeScreen from './HomeScreen';
import ChatroomsScreen from './ChatroomListScreen';
import CreateChatScreen from './CreateChatScreen';
import LoginScreen from './SignInScreen';
import RegisterScreen from './SignUpScreen';
import ChatroomScreen from './ChatroomScreen';
import BottomNavi from './UserBottomNavi';
import BottomNaviRoutes from './BottomNaviRoutes';

const navigationRef = React.createRef();

const Stack = createStackNavigator();

const Auth = () => (
  // Stack Navigator for Login and Sign up Screen
  <Stack.Navigator initialRouteName="Login">
    <Stack.Screen
      name="Login"
      component={LoginScreen}
      options={{ headerShown: true }}
    />
    <Stack.Screen
      name="Register"
      component={RegisterScreen}
      options={{
        title: 'Register', // Set Header Title
        headerStyle: {
          backgroundColor: '#307ecc', // Set Header color
        },
        headerTintColor: '#fff', // Set Header text color
        headerTitleStyle: {
          fontWeight: 'bold', // Set Header text style
        },
      }}
    />
  </Stack.Navigator>
);

function getHeaderTitle(route) {
  // If the focused route is not found, we need to assume it's the initial screen
  // This can happen during if there hasn't been any navigation inside the screen
  // In our case, it's "Feed" as that's the first screen inside the navigator
  const routeName = getFocusedRouteNameFromRoute(route) ?? 'Home';

  switch (routeName) {
  case 'Home':
    return 'Home';
  case 'Messages':
    return 'Messages';
  case 'Chatroom':
    return 'Chatroom';
  case 'Create Chatroom':
    return 'Create Chatroom';
  case 'Profile':
    return 'My Profile';
  default:
  }
  return '';
}

const App = () => (
  <Stack.Navigator>
    <Stack.Screen
      name="BottomNaviRoutes"
      component={BottomNaviRoutes}
      options={({ route }) => ({
        headerTitle: getHeaderTitle(route),
      })}
    />
    <Stack.Screen
      name="Chatroom"
      component={ChatroomScreen}
      options={({ route }) => {
        console.log('chatroom route: ', route);
        return { headerTitle: route.params.chatroomName };
      }}
    />
    <Stack.Screen
      name="Create Chatroom"
      component={CreateChatScreen}
      options={({ route }) => ({
        headerTitle: getHeaderTitle(route),
      })}
    />
  </Stack.Navigator>
);


const mapStateToProps = (state) => ({
  isUserLoggedIn: state.authentication.isAuthenticated,
});

function Navigation(props) {
  const screens = [
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
    {
      name: 'Chatroom',
      component: ChatroomScreen,
      hidden: true,
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
      <Stack.Navigator initialRouteName="SplashScreen">
        {/* SplashScreen which will come once for 5 Seconds */}
        <Stack.Screen
          name="SplashScreen"
          component={SplashScreen}
          // Hiding header for Splash Screen
          options={{ headerShown: false }}
        />
        {/* Auth Navigator: Include Login and Signup */}
        <Stack.Screen
          name="Auth"
          component={Auth}
          options={{ headerShown: false }}
        />
        {/* Navigation Drawer as a landing page */}
        <Stack.Screen
          name="App"
          component={App}
          options={{ headerShown: false }}
          // options={({ route }) => ({
          //   headerTitle: getHeaderTitle(route),
          // })}
        />
      </Stack.Navigator>
    </NavigationContainer>


  // <NavigationContainer
  //   ref={navigationRef}
  //   onStateChange={(nav) => {
  //     if (routeIndexRef.current !== nav.index) {
  //       const routeName = nav.routes[nav.index].name;
  //       let dstIndex = tabScreens.findIndex((cur) => cur.name === routeName);
  //       if (dstIndex < 0) {
  //         dstIndex = undefined;
  //       }
  //       setTabIndex(dstIndex);
  //     }
  //     routeIndexRef.current = nav.index;
  //   }}
  // >
  //   <Stack.Navigator
  //     initialRouteName={screens.find((screen) => screen.isIntialRoute).name}
  //   >
  //     {
  //       screens.map((screen) => (<Stack.Screen {...screen} key={screen.name} />))
  //     }
  //   </Stack.Navigator>
  //   {
  //     BottomNavigation
  //   }

  // </NavigationContainer>
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