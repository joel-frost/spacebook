import React, { Component } from 'react';
import { View } from 'react-native';
import { Button, Text } from "react-native-elements";

class FriendsListScreen extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View>
          <Text>Friend List</Text>
          <Button title="View Requests" onPress={() => this.props.navigation.navigate("Friend Requests")}/>
      </View>
    );
  }
}

export default FriendsListScreen;
