import React, { Component } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import FriendsListScreen from "../components/FriendsList";
import FriendRequestsScreen from "../components/FriendRequests";
import FriendProfileScreen from "../components/FriendProfile";

const FriendsStack = createNativeStackNavigator();

class FriendsNavigator extends Component {
  render() {
    return (
      <FriendsStack.Navigator>
        <FriendsStack.Screen name="Friends List" component={FriendsListScreen} options={{ headerShown: false }}/>
        <FriendsStack.Screen name="Friend Requests" component={FriendRequestsScreen} />
        <FriendsStack.Screen name="Profile" component={FriendProfileScreen} />

      </FriendsStack.Navigator>
    );
  }
}

export default FriendsNavigator;
