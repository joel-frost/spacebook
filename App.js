import React, {Component} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {SafeAreaProvider} from 'react-native-safe-area-context';

import HomeNavigator from './navigation/HomeNavigator';
import LoginScreen from './components/Login';
import SignupScreen from './components/Signup';
import LogoutScreen from './components/Logout';
import MessageHandlerScreen from './components/MessageHandler';


const Stack = createNativeStackNavigator();

class App extends Component {
  render() {
    return (
      <SafeAreaProvider>
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="Signup" component={SignupScreen} />
            <Stack.Screen
              name="Home"
              component={HomeNavigator}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="Logout"
              component={LogoutScreen}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="Message"
              component={MessageHandlerScreen}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </SafeAreaProvider>
    );
  }
}

export default App;
