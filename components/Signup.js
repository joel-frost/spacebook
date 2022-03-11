import React, { Component } from "react";
import { Button, ScrollView, TextInput } from "react-native";
import { signup } from "../api/SpacebookService";

class SignupScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      first_name: "",
      last_name: "",
      email: "",
      password: "",
      confPassword: "",
    };
  }

  signup = async () => {
    if (this.state.password === this.state.confPassword) {
      signup(this.state).then((response) => {
        if (response.status === 201) {
          this.props.navigation.navigate("Login");
        } else if (response.status === 400) {
          this.props.navigation.navigate("Message", {
            message: "Unable to create account, please check details",
          });
        } else {
          throw "Something went wrong";
        }
      });
    } else {
      this.props.navigation.navigate("Message", {
        message: "Your entered passwords do not match.",
      });
    }
  };

  render() {
    return (
      <ScrollView>
        <TextInput
          placeholder="Enter your first name..."
          onChangeText={(first_name) => this.setState({ first_name })}
          value={this.state.first_name}
          style={{ padding: 5, borderWidth: 1, margin: 5 }}
        />
        <TextInput
          placeholder="Enter your last name..."
          onChangeText={(last_name) => this.setState({ last_name })}
          value={this.state.last_name}
          style={{ padding: 5, borderWidth: 1, margin: 5 }}
        />
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
        <TextInput
          placeholder="Re-enter your password..."
          onChangeText={(confPassword) => this.setState({ confPassword })}
          value={this.state.confPassword}
          secureTextEntry
          style={{ padding: 5, borderWidth: 1, margin: 5 }}
        />
        <Button title="Create an account" onPress={() => this.signup()} />
      </ScrollView>
    );
  }
}

export default SignupScreen;
