import React, {Component} from 'react';
import {Button, ScrollView, TextInput, View, StyleSheet} from 'react-native';
import {editProfile} from '../api/SpacebookService';
import AsyncStorage from '@react-native-async-storage/async-storage';

class EditProfileScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      token: '',
      id: '',
    };
  }

  componentDidMount = async () => {
    await this.retrieveFromAsync();
  };

  retrieveFromAsync = async () => {
    const token = await AsyncStorage.getItem('@session_token');
    const id = await AsyncStorage.getItem('@id');

    this.setState({
      token: token,
      id: id,
    });
  };

  editProfile() {
    const updatedInfo = {};
    if (this.state.firstName != '') {
      updatedInfo.firstName = this.state.firstName;
    }
    if (this.state.lastName != '') {
      updatedInfo.lastName = this.state.lastName;
    }
    if (this.state.email != '') {
      updatedInfo.email = this.state.email;
    }
    if (this.state.password != '') {
      updatedInfo.password = this.state.password;
    }

    editProfile(this.state.token, this.state.id, updatedInfo).then(
        (response) => {
          if (response.status === 200) {
            this.props.navigation.navigate('Profile');
          } else {
            this.props.navigation.navigate('Message', {
              message: 'Unable to update profile, check entered details.',
            });
          }
        }
    );
  }

  render() {
    return (
      <ScrollView>
        <TextInput
          placeholder="First Name"
          onChangeText={(firstName) => this.setState({firstName})}
          value={this.state.firstName}
          style={{padding: 5, borderWidth: 1, margin: 5}}
        />
        <TextInput
          placeholder="Last Name"
          onChangeText={(lastName) => this.setState({lastName})}
          value={this.state.lastName}
          style={{padding: 5, borderWidth: 1, margin: 5}}
        />
        <TextInput
          placeholder="Email"
          onChangeText={(email) => this.setState({email})}
          value={this.state.email}
          style={{padding: 5, borderWidth: 1, margin: 5}}
        />
        <TextInput
          placeholder="Password"
          onChangeText={(password) => this.setState({password})}
          value={this.state.password}
          secureTextEntry
          style={{padding: 5, borderWidth: 1, margin: 5}}
        />
        <View style={styles.container}>
          <Button
            color="salmon"
            title="Update Details"
            onPress={() => this.editProfile()}
          />
          <Button
            color="salmon"
            title="Change Profile Picture"
            onPress={() => this.props.navigation.navigate('Take Photo')}
          />
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    marginTop: 10,
    marginBottom: 10,
    flex: 1,
    alignItems: 'center',
    gap: 10,
  },
});

export default EditProfileScreen;
