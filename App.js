import React, { Component } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import HomeScreen from './components/home';
import LoginScreen from './components/login';
import SignupScreen from './components/signup';

const Stack = createNativeStackNavigator();

class App extends Component{
    render(){
        return (
            <NavigationContainer>
                <Stack.Navigator>
                    <Stack.Screen name="Login" component={LoginScreen} />
                    <Stack.Screen name="Signup" component={SignupScreen} />
                    <Stack.Screen name="Home" component={HomeScreen} options={{headerShown: false}} />                                     
                </Stack.Navigator>
                
            </NavigationContainer>
        );
    }
}

export default App;