import React, { Component } from 'react';
import { View, Text, FlatList } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Ionicons from 'react-native-vector-icons/Ionicons';
import ProfileScreen from './profile';
import SearchScreen from './search';
import FriendRequestsScreen from './friendrequests';
import LogoutScreen from './logout';

const Tab = createBottomTabNavigator();

class HomeScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: true,
      listData: []
    }
  }

  componentDidMount() {
    this.unsubscribe = this.props.navigation.addListener('focus', () => {
      this.checkLoggedIn();
    });

    this.getData();
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  getData = async () => {
    const value = await AsyncStorage.getItem('@session_token');
    return fetch("http://localhost:3333/api/1.0.0/search", {
      'headers': {
        'X-Authorization': value
      }
    })
      .then((response) => {
        if (response.status === 200) {
          return response.json()
        } else if (response.status === 401) {
          this.props.navigation.navigate("Login");
        } else {
          throw 'Something went wrong';
        }
      })
      .then((responseJson) => {
        this.setState({
          isLoading: false,
          listData: responseJson
        })
      })
      .catch((error) => {
        console.log(error);
      })
  }

  checkLoggedIn = async () => {
    const value = await AsyncStorage.getItem('@session_token');
    if (value == null) {
      this.props.navigation.navigate('Login');
    }
  };

  render() {
    if (this.state.isLoading) {
      return (
        <View
          style={{
            flex: 1,
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text>Loading..</Text>
        </View>
      );
    } else {
      return (

          <Tab.Navigator
            screenOptions={({ route }) => ({
              tabBarIcon: ({ focused, color, size }) => {
                let iconName;
                
                if (route.name === 'Overview') {
                  iconName = focused
                    ? 'home'
                    : 'home-outline';
                } else if (route.name === 'Profile') {
                  iconName = focused
                    ? 'person'
                    : 'person-outline';
                } else if (route.name === 'Search') {
                  iconName = focused
                    ? 'search'
                    : 'search-outline';
                } else if (route.name === 'Friend Requests') {
                  iconName = focused
                    ? 'person-add'
                    : 'person-add-outline';
                } else if (route.name == 'Logout') {
                  iconName = focused
                    ? 'log-out'
                    : 'log-out-outline';
                } 
                

                // You can return any component that you like here!
                return <Ionicons name={iconName} size={size} color={color} />;
              },
              tabBarActiveTintColor: 'tomato',
              tabBarInactiveTintColor: 'gray',
              headerShown: false,
            })}
          >
            <Tab.Screen name="Profile" component={ProfileScreen} />
            <Tab.Screen name="Search" component={SearchScreen} />
            <Tab.Screen name="Friend Requests" component={FriendRequestsScreen} />
            <Tab.Screen name="Logout" component={LogoutScreen} />
          </Tab.Navigator>
      );
    }

  }
}



export default HomeScreen;
