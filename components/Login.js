import React, { Component } from "react";
import { Button, StyleSheet, View} from "react-native";
import { ScrollView, TextInput } from "react-native-gesture-handler";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Text } from "react-native-elements";

class LoginScreen extends Component {
  constructor(props) {
    super(props);

    // TODO: Remove hardcoded account
    this.state = {
      email: "email@email.com",
      password: "password",
    };
  }

  login = async () => {
    fetch("http://localhost:3333/api/1.0.0/login", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(this.state),
    })
      .then((response) => {
        if (response.status === 200) {
          return response.json();
        }
        if (response.status === 400) {
          this.props.navigation.navigate("Message", {message: "Incorrect Email/Password, please try again."});          
          return;
        } else {
          throw "Something went wrong";
        }
      })
      .then(async (responseJson) => {
        console.log(responseJson);
        await AsyncStorage.setItem("@session_token", responseJson.token);
        await AsyncStorage.setItem("@id", responseJson.id);

        this.props.navigation.navigate("Home");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  render() {
    return (
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.welcomeText}>Welcome to SpaceBook</Text>
        <View>
        <TextInput
          placeholder="Enter your email..."
          onChangeText={(email) => this.setState({ email })}
          value={this.state.email}
          style={{ padding: 5, borderWidth: 1, margin: 5 }}
        />
        <TextInput
          placeholder="Enter your password..."
          onChangeText={(password) => this.setState({ password })}
          value={this.state.password}
          secureTextEntry
          style={{ padding: 5, borderWidth: 1, margin: 5 }}
        />
        </View>
        <Button style={styles.buttons} title="Login" onPress={() => this.login()}
        color="tomato" />
        <Button style={styles.buttons}
          title="Sign Up"
          color="salmon"
          onPress={() => this.props.navigation.navigate("Signup")}
        />
      </ScrollView>
    );
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    gap: 10,
    marginTop: 10,
  },
  buttons: {
    margin: 30

  },
  welcomeText: {
    flex: 0.3,
    fontSize: 40,
    textAlign: "center",
    fontWeight: 'bold'
  }
});

export default LoginScreen;
