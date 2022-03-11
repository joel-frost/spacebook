import React, { Component } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import SearchScreen from "../components/Search";
import FriendProfileScreen from "../components/FriendProfile";

const SearchStack = createNativeStackNavigator();

class SearchNavigator extends Component {
  render() {
    return (
      <SearchStack.Navigator>
        <SearchStack.Screen
          name="Search Users"
          component={SearchScreen}
          options={{ headerShown: false }}
        />
        <SearchStack.Screen name="Profile" component={FriendProfileScreen} />
      </SearchStack.Navigator>
    );
  }
}

export default SearchNavigator;
