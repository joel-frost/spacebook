import React, { Component } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import SearchScreen from "./search";
import ProfileScreen from "./profile";

const SearchStack = createNativeStackNavigator();

class SearchNavigator extends Component {
  render() {
    return (
      <SearchStack.Navigator>
        <SearchStack.Screen name="Search Users" component={SearchScreen} />
        <SearchStack.Screen name="Profile" component={ProfileScreen} />
      </SearchStack.Navigator>
    );
  }
}

export default SearchNavigator;
