import React, { Component } from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { Camera } from "expo-camera";
import { savePhoto } from "../api/SpacebookService";
import AsyncStorage from "@react-native-async-storage/async-storage";

class TakePhotoScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      hasPermission: null,
      type: Camera.Constants.Type.back,
      token: "",
      id: "",
    };
  }

  async componentDidMount() {
    await this.retrieveFromAsync();
    const { status } = await Camera.requestCameraPermissionsAsync();
    this.setState({ hasPermission: status === "granted" });
  }

  retrieveFromAsync = async () => {
    const token = await AsyncStorage.getItem("@session_token");
    const id = await AsyncStorage.getItem("@id");

    this.setState({
      token: token,
      id: id,
    });
  };

  savePhoto = async (data) => {
    savePhoto(this.state.token, this.state.id, data).then(() => {
      this.props.navigation.navigate("Profile");
    });
  };

  takePicture = async () => {
    if (this.camera) {
      const options = {
        quality: 0.5,
        base64: true,
        onPictureSaved: (data) => this.savePhoto(data),
      };
      await this.camera.takePictureAsync(options);
    }
  };

  render() {
    if (this.state.hasPermission) {
      return (
        <View style={styles.container}>
          <Camera
            style={styles.camera}
            type={this.state.type}
            ref={(ref) => (this.camera = ref)}
          >
            <View style={styles.buttonContainer}>
              <TouchableOpacity
                style={styles.button}
                onPress={() => {
                  this.takePicture();
                }}
              >
                <Text style={styles.text}> Take Photo </Text>
              </TouchableOpacity>
            </View>
          </Camera>
        </View>
      );
    } else {
      return <Text>No access to camera</Text>;
    }
  }
}

export default TakePhotoScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  camera: {
    flex: 1,
  },
  buttonContainer: {
    flex: 1,
    backgroundColor: "transparent",
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "center",
  },
  button: {
    flex: 0.1,
    alignSelf: "flex-end",
    alignItems: "center",
    marginLeft: 75,
    marginBottom: 50,
  },
  text: {
    fontSize: 18,
    color: "white",
    textAlign: "center",
  },
});
