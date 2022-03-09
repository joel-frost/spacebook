import React, { Component } from "react";
import {
  View,
  ActivityIndicator,
  ScrollView,
  FlatList,
} from "react-native";
import { Button, Text, Card } from "react-native-elements";
import AsyncStorage from "@react-native-async-storage/async-storage";

class FriendRequestsScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: true,
      listData: [],
    };
  }

  componentDidMount() {
    this.getFriendRequests();
  }

  getFriendRequests = async () => {
    const token = await AsyncStorage.getItem("@session_token");

    return fetch(`http://localhost:3333/api/1.0.0/friendrequests`, {
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

  acceptFriendRequest = async (id) => {
    const token = await AsyncStorage.getItem("@session_token");

    return fetch(`http://localhost:3333/api/1.0.0/friendrequests/${id}`, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
        "X-Authorization": token,
      },
    }).then((response) => {
      if (response.status === 200) {
        return response.json();
      } else {
        throw "Something went wrong";
      }
    });
  };

  rejectFriendRequest = async (id) => {
    const token = await AsyncStorage.getItem("@session_token");

    return fetch(`http://localhost:3333/api/1.0.0/friendrequests/${id}`, {
      method: "delete",
      headers: {
        "Content-Type": "application/json",
        "X-Authorization": token,
      },
    }).then((response) => {
      if (response.status === 200) {
        return response.json();
      } else {
        throw "Something went wrong";
      }
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
          <Text>No friend requests at the moment!</Text>
        </View>
      );
    }
    return (
      <ScrollView>
        <FlatList
          data={this.state.listData}
          renderItem={({ item, index }) => (
            <View>
              <Card>
                <Card.Title>
                  {item.first_name} {item.last_name}
                </Card.Title>

                <Card.Divider />
                <Button
                  title="Accept"
                  onPress={() => this.acceptFriendRequest(item.user_id)}
                />
                <Button
                  title="Reject"
                  onPress={() => this.rejectFriendRequest(item.user_id)}
                />
                <Text>Accept / Reject Here</Text>
              </Card>
            </View>
          )}
          keyExtractor={(item, index) => item.user_id.toString()}
        />
      </ScrollView>
    );
  }
}

export default FriendRequestsScreen;
