import React, { Component } from "react";
import { View, ActivityIndicator, StyleSheet, Button } from "react-native";
import { Text } from "react-native-elements";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getPost } from "../api/SpacebookService";

class PostScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: true,
      token: "",
      postID: "",
      userID: "",
      sessionID: "",
      post: {},
      isAuthor: false,
    };
  }

  componentDidMount = async () => {
    console.log(this.props.route.params.item.post_id);
    try {
      this.setState({
        postID: this.props.route.params.item.post_id,
        userID: this.props.route.params.item.author.user_id,
      });
    } catch (e) {
      throw "Unable to access post";
    }

    await this.retrieveFromAsync();
    this.checkAuthor();
    this.getPost();
  };

  checkAuthor() {
      console.log(this.state.userID);
      console.log(this.state.sessionID);
    if (this.state.userID.toString() === this.state.sessionID.toString()) {
      this.setState({ isAuthor: true });
    }
  }

  retrieveFromAsync = async () => {
    const token = await AsyncStorage.getItem("@session_token");
    const id = await AsyncStorage.getItem("@id");
    this.setState({
      token: token,
      sessionID: id,
    });
  };

  formatDate(response) {
    response.timestamp = new Date(response.timestamp).toLocaleString();

    return response;
  }

  getPost() {
    getPost(this.state.token, this.state.userID, this.state.postID).then(
      (response) => {
        let formattedResponse = this.formatDate(response);
        this.setState({
          post: formattedResponse,
          isLoading: false,
        });
      }
    );
  }

  render() {
    if (this.state.isLoading) {
      return (
        <View>
          <ActivityIndicator size="large" color="#00ff00" />
        </View>
      );
    }
    if (this.state.isAuthor) {
      return (
        <View style={styles.container}>
          <Text style={styles.maintext}>
            {this.state.post.author.first_name}{" "}
            {this.state.post.author.last_name}
          </Text>
          <Text style={styles.posttext}>{this.state.post.text}</Text>
          <Text style={styles.maintext}>
            Likes: {this.state.post.numLikes.toString()}
          </Text>
          <Text style={styles.maintext}>{this.state.post.timestamp}</Text>
          <Button
          color="salmon"
            title="Edit Post"
            onPress={() => this.props.navigation.navigate("Edit Post", {postID: this.state.postID})}
          />
        </View>
      );
    }
    return (
      <View style={styles.container}>
        <Text style={styles.maintext}>
          {this.state.post.author.first_name} {this.state.post.author.last_name}
        </Text>
        <Text style={styles.posttext}>{this.state.post.text}</Text>
        <Text style={styles.maintext}>
          Likes: {this.state.post.numLikes.toString()}
        </Text>
        <Text style={styles.maintext}>{this.state.post.timestamp}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    gap: 10,
    marginTop: 100,
  },
  maintext: {
    fontWeight: "bold",
    fontSize: 25,
  },
  posttext: {
    fontSize: 20,
  },
});

export default PostScreen;
