import React, { Component } from "react";
import { View, ActivityIndicator, ScrollView, StyleSheet } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { FlatList } from "react-native-gesture-handler";
import { Text, Card, Input, Button, Avatar } from "react-native-elements";
import Ionicons from "react-native-vector-icons/Ionicons";
import {
  getUser,
  getPosts,
  submitPost,
  deletePost,
  likePost,
  unlikePost
} from "../api/SpacebookService";

class FriendProfileScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: true,
      listData: [],
      text: "",
      first_name: "",
      last_name: "",
      email: "",
      token: "",
      id: "",
    };
  }

  componentDidMount = async() => {
    console.log(this.props.route.params.item.user_id);
    try {
      this.state.id = this.props.route.params.item.user_id;
    } catch (e) {
      throw "Unable to access profile";
    }
    
    await this.retrieveFromAsync();
    this.getUser();
    this.getPosts();
  }

  retrieveFromAsync = async () => {
    const token = await AsyncStorage.getItem("@session_token");
    this.setState({
      token: token,
    });
  }

  getUser = async () => {
    getUser(this.state.token, this.state.id).then(async (responseJson) => {
      console.log(responseJson);
      this.setState({
        first_name: responseJson.first_name,
        last_name: responseJson.last_name,
        email: responseJson.email,
      });
    });
  };

  getPosts = async () => {
    getPosts(this.state.token, this.state.id).then(async (responseJson) => {
      console.log(responseJson);
      this.setState({
        isLoading: false,
        listData: responseJson,
      });
    });
  };

  submitPost = async () => {
    submitPost(this.state.token, this.state.id, this.state.text)
      .then((response) => {
        console.log(response);
        this.setState({
          text: "",
        });
        if (response.status === 201) {
          this.getPosts();
        } else if (response.status === 400) {
          throw "Unable to submit post";
        } else {
          throw "Something went wrong";
        }
      })
      .catch((e) => {
        console.log(e);
      });
  };

  deletePost = async (postID) => {
    deletePost(this.state.token, this.state.id, postID)
      .then((response) => {
        console.log(response);
        if (response.status === 200) {
          this.getPosts();
          console.log("Post Deleted");
        } else if (response.status === 400) {
          throw "Unable to delete post";
        } else {
          throw "Something went wrong";
        }
      })
      .catch((e) => {
        console.log(e);
      });
  };

  unlikePost = async (postID) => {
    unlikePost(this.state.token, this.state.id, postID).then(() => {
      this.getPosts();
    });
  }

  likePost = async (postID) => {
    likePost(this.state.token, this.state.id, postID).then((response) => {
      if (response.status === 200) {
        this.getPosts();
        return response;
      } else if (response.status === 400) {
        this.unlikePost(postID);
        return response;
      } else {
        throw "Something went wrong";
      }
    });
  }

  render() {
    if (this.state.isLoading) {
      return (
        <View>
          <ActivityIndicator size="large" color="#00ff00" />
        </View>
      );
    }
    return (
      <ScrollView>
        <View style={styles.container}>
          <Avatar
            size={128}
            rounded
            source={"https://randomuser.me/api/portraits/men/36.jpg"}
          />
          <Text style={styles.nametext}>
            {this.state.first_name} {this.state.last_name}
          </Text>
          <Input
            placeholder="Type a post"
            multiline
            numberOfLines={5}
            onChangeText={(text) => this.setState({ text })}
            value={this.state.text}
          />
          <Button title="Post" onPress={this.submitPost} />

          <FlatList
            data={this.state.listData}
            renderItem={({ item, index }) => (
              <View>
                <Card>
                  <Ionicons
                    name={"trash-outline"}
                    size={16}
                    onPress={() => {
                      this.deletePost(item.post_id);
                    }}
                  />
                  <Card.Title>
                    {item.author.first_name} {item.author.last_name}
                  </Card.Title>

                  <Card.Divider />
                  <Text>{item.text}</Text>
                  <Card.Divider style={styles.divider} />
                  <Ionicons
                    name={"thumbs-up-outline"}
                    size={16}
                    onPress={() => {
                      this.likePost(item.post_id);
                    }}
                  />
                  <Text>
                    Likes: {item.numLikes.toString()} Time: {item.timestamp}
                  </Text>
                </Card>
              </View>
            )}
            keyExtractor={(item, index) => item.post_id.toString()}
          />
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    gap: 10,
    marginTop: 10,
  },
  divider: {
    marginTop: 10,
  },
  nametext: {
    fontWeight: "bold",
    fontSize: 25,
  },
});

export default FriendProfileScreen;
