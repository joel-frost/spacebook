import React, { Component } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Ionicons from 'react-native-vector-icons/Ionicons';
import UserProfileNavigator from './UserProfileNavigator';
import SearchNavigator from './SearchNavigator';
import FriendsNavigator from './FriendsNavigator';
import LogoutScreen from '../components/Logout';

const Tab = createBottomTabNavigator();

class HomeNavigator extends Component {
  componentDidMount() {
    this.unsubscribe = this.props.navigation.addListener('focus', () => {
      this.checkLoggedIn();
    });
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  checkLoggedIn = async () => {
    const value = await AsyncStorage.getItem('@session_token');
    if (value == null) {
      this.props.navigation.navigate('Login');
    }
  };

  render() {
    return (
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === 'Overview') {
              iconName = focused ? 'home' : 'home-outline';
            } else if (route.name === 'My Profile') {
              iconName = focused ? 'person' : 'person-outline';
            } else if (route.name === 'Search') {
              iconName = focused ? 'search' : 'search-outline';
            } else if (route.name === 'Friends') {
              iconName = focused ? 'person-add' : 'person-add-outline';
            } else if (route.name === 'Logout') {
              iconName = focused ? 'log-out' : 'log-out-outline';
            }

            // You can return any component that you like here!
            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: 'tomato',
          tabBarInactiveTintColor: 'gray',
          headerShown: false,
        })}
      >
        <Tab.Screen name="My Profile" component={UserProfileNavigator} />
        <Tab.Screen name="Search" component={SearchNavigator} />
        <Tab.Screen name="Friends" component={FriendsNavigator} />
        <Tab.Screen name="Logout" component={LogoutScreen} />
      </Tab.Navigator>
    );
  }
}

export default HomeNavigator;
