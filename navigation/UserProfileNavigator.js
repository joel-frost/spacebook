import React, { Component } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import UserProfileScreen from "../components/userProfile";
import EditProfileScreen from "../components/EditProfile";
import PostScreen from "../components/Post";
import EditPostScreen from "../components/EditPost";

const ProfileStack = createNativeStackNavigator();

class UserProfileNavigator extends Component {
  render() {
    return (
      <ProfileStack.Navigator>
        <ProfileStack.Screen
          name="Profile"
          component={UserProfileScreen}
          options={{ headerShown: false }}
        />
        <ProfileStack.Screen name="Post" component={PostScreen} />
        <ProfileStack.Screen
          name="Edit Profile"
          component={EditProfileScreen}
        />
        <ProfileStack.Screen
          name="Edit Post"
          component={EditPostScreen}
        />
      </ProfileStack.Navigator>
    );
  }
}

export default UserProfileNavigator;
