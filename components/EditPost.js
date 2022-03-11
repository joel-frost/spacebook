import React, { Component } from "react";
import { Button, TextInput, View } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { editPost } from "../api/SpacebookService";

class EditPostScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      text: "",
      token: "",
      id: "",
      postID: "",
    };
  }

  componentDidMount = async () => {
    try {
      this.state.postID = this.props.route.params.postID;
    } catch (e) {
      throw "Unable to access post";
    }
    await this.retrieveFromAsync();
  };

  retrieveFromAsync = async () => {
    const token = await AsyncStorage.getItem("@session_token");
    const id = await AsyncStorage.getItem("@id");

    this.setState({
      token: token,
      id: id,
    });
  };

  editPost() {
    let updatedInfo = {};
    if (this.state.text != "") {
      updatedInfo.text = this.state.text;
    }

    editPost(
      this.state.token,
      this.state.id,
      this.state.postID,
      updatedInfo
    ).then((response) => {
      if (response.status === 200) {
        this.props.navigation.navigate("Profile");
      }
      if (response.status === 403) {
        this.props.navigation.navigate("Message", {
          message: "You can only edit your own posts.",
        });
        return;
      } else {
        throw "Something went wrong";
      }
    });
  }

  render() {
    return (
      <View>
        <TextInput
            multiline
            numberOfLines={5}
          placeholder="New Post Text"
          onChangeText={(text) => this.setState({ text })}
          value={this.state.text}
          style={{ padding: 5, borderWidth: 1, margin: 5 }}
        />
        <Button color="salmon" title="Update Post" onPress={() => this.editPost()} />
      </View>
    );
  }
}

export default EditPostScreen;
