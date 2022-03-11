import React, { Component } from "react";
import { Text } from "react-native-elements";
import {ActivityIndicator, View, StyleSheet} from "react-native";

class MessageHandlerScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      errorMessage: "",
      isLoading: true,
    };
  }

  componentDidMount() {
    try {
      this.state.errorMessage = this.props.route.params.message;
      this.setState({isLoading: false});
    } catch (e) {
      throw "Unable to access profile";
    }
  }
  render() {

    if (this.state.isLoading) {
        return (
          <View style={styles.container}>
            <ActivityIndicator size="large" color="#00ff00" />
          </View>
        );
      }

    return <Text style={styles.text}>{this.state.errorMessage}</Text>;
  }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      gap: 10,
    },
    text: {
      fontWeight: 'bold',
      fontSize: 20,
      marginTop: 100,
      textAlign: "center",
      color: "red"
    },
  });

export default MessageHandlerScreen;
