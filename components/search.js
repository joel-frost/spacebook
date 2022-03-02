import React, { Component } from "react";
import { SearchBar, Button, Card, Text } from "react-native-elements";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { View, ActivityIndicator, StyleSheet } from "react-native";
import { ScrollView, FlatList } from "react-native-gesture-handler";

class SearchScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      searchTerm: "",
      listData: [],
    };
  }

  updateSearch = async () => {
    this.setState.isLoading = true;
    console.log(this.state.searchTerm);
    const token = await AsyncStorage.getItem("@session_token");

    return fetch(
      `http://localhost:3333/api/1.0.0/search?q=${this.state.searchTerm}`,
      {
        method: "get",
        headers: {
          "Content-Type": "application/json",
          "X-Authorization": token,
        },
      }
    )
      .then((response) => {
        if (response.status === 200) {
          return response.json();
        }
        if (response.status === 400) {
          throw "Unable to search users";
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

  addFriend = async (userID) => {
    const token = await AsyncStorage.getItem("@session_token");

    return fetch(`http://localhost:3333/api/1.0.0/user/${userID}/friends`, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
        "X-Authorization": token,
      },
    })
      .then((response) => {
        console.log(response);
        if (response.status === 201) {
          return response;
        } else if (response.status === 400) {
          throw "Unable to add friend";
        } else {
          throw "Something went wrong";
        }
      })
      .catch((e) => {
        console.log(e);
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

    //<Button title="View Profile" onPress={() => this.props.navigation.navigate("Profile", {item})}/>
    return (
      <ScrollView>
        <View>
          <SearchBar
            placeholder="Enter Name"
            onChangeText={(searchTerm) => this.setState({ searchTerm })}
            value={this.state.searchTerm}
          />
          <Button title="Search" onPress={() => this.updateSearch()} />
          <FlatList
            data={this.state.listData}
            renderItem={({ item, index }) => (
              <View>
                <Card>
                  <Card.Title>
                    {item.user_givenname} {item.user_familyname}
                  </Card.Title>
                  <Card.Divider />
                  <Button
                    title="Add Friend"
                    onPress={() => this.addFriend(item.user_id)}
                  />

                  <Card.Divider style={styles.divider} />
                </Card>
              </View>
            )}
            keyExtractor={(item, index) => item.user_id.toString()}
          />
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  divider: {
    marginTop: 10,
  },
});

export default SearchScreen;
