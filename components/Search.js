import React, { Component } from "react";
import { SearchBar, Button, Card, Text } from "react-native-elements";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { View, ActivityIndicator, StyleSheet } from "react-native";
import { ScrollView, FlatList } from "react-native-gesture-handler";
import { updateSearch, addFriend } from "../api/SpacebookService";

class SearchScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      searchTerm: "",
      listData: [],
      token: "",
    };
  }

  componentDidMount = async() => {
    await this.retrieveFromAsync();
  }

  retrieveFromAsync = async () => {
    const token = await AsyncStorage.getItem("@session_token");

    this.setState({
      token: token,
    });
  };

  updateSearch = async () => {
    this.setState.isLoading = true;
    console.log(this.state.searchTerm);
    updateSearch(this.state.token, this.state.searchTerm)
    .then(async (responseJson) => {
      console.log(responseJson);
      this.setState({
        isLoading: false,
        listData: responseJson,
      });
    });
      
  };

  addFriend = async (userID) => {
    addFriend(this.state.token, userID);
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
