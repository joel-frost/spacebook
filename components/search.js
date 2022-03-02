import React, { Component } from "react";
import { SearchBar, Button } from "react-native-elements";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { View, ActivityIndicator, Text, StyleSheet } from "react-native";

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

  render() {
    if (this.state.isLoading) {
      return (
        <View>
          <ActivityIndicator size="large" color="#00ff00" />
        </View>
      );
    }
    return (
      <View>
        <SearchBar
          placeholder="Enter Name"
          onChangeText={(searchTerm) => this.setState({ searchTerm })}
          value={this.state.searchTerm}
        />
        <Button title="Search" onPress={() => this.updateSearch()} />
      </View>
    );
  }
}

export default SearchScreen;
