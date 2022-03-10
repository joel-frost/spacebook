import React, { Component } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import FriendsListScreen from "./friendsList";
import FriendRequestsScreen from "./friendrequests";
import ProfileScreen from "./profile";

const FriendsStack = createNativeStackNavigator();

class FriendsNavigator extends Component {
  render() {
    return (
      <FriendsStack.Navigator>
        <FriendsStack.Screen name="Friends List" component={FriendsListScreen} options={{ headerShown: false }}/>
        <FriendsStack.Screen name="Friend Requests" component={FriendRequestsScreen} />
        <FriendsStack.Screen name="Profile" component={ProfileScreen} />

      </FriendsStack.Navigator>
    );
  }
}

export default FriendsNavigator;
