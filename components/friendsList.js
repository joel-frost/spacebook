import React, { Component } from "react";
import { View, ActivityIndicator, ScrollView } from "react-native";
import { Button, Text, Card } from "react-native-elements";
import AsyncStorage from "@react-native-async-storage/async-storage";

class FriendsListScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: true,
      listData: [],
    };
  }

  componentDidMount() {
    this.getFriendsList();
  }

  getFriendsList = async () => {
    const token = await AsyncStorage.getItem("@session_token");
    const id = await AsyncStorage.getItem("@id");

    return fetch(`http://localhost:3333/api/1.0.0/user/${id}/friends`, {
      method: "get",
      headers: {
        "Content-Type": "application/json",
        "X-Authorization": token,
      },
    })
      .then((response) => {
        if (response.status === 200) {
          return response.json();
        }
        if (response.status === 400) {
          throw "Unable to get posts";
        } else {
          throw "Something went wrong";
        }
      })
      .then(async (responseJson) => {
        console.log(responseJson);
        this.setState({
          isLoading: false,
          listData: responseJson,
        });
      });
  };

  render() {
    if (this.state.isLoading) {
      return (
        <View>
          <ActivityIndicator size="large" color="#00ff00" />
        </View>
      );
    }

    if (this.state.listData.length <= 0) {
      return (
        <View>
          <Text>
            You haven't added any friends yet, use the seach feature to find
            some!
          </Text>
          <Button
            title="View Requests"
            onPress={() => this.props.navigation.navigate("Friend Requests")}
          />
        </View>
      );
    }
    return (
      <ScrollView>
        <Text>Friend List</Text>
        <Button
          title="View Requests"
          onPress={() => this.props.navigation.navigate("Friend Requests")}
        />
        <FlatList
          data={this.state.listData}
          renderItem={({ item, index }) => (
            <View>
              <Card>
                <Card.Title>Friend</Card.Title>

                <Card.Divider />
                <Text>More text</Text>
              </Card>
            </View>
          )}
          keyExtractor={(item, index) => item.user_id.toString()}
        />
      </ScrollView>
    );
  }
}

export default FriendsListScreen;
