import React, {Component} from 'react';
import {Button, ScrollView, TextInput, View} from 'react-native';
import {signup} from '../api/SpacebookService';

class SignupScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      first_name: '',
      last_name: '',
      email: '',
      password: '',
      confPassword: '',
    };
  }

  signup = async () => {
    if (this.state.password === this.state.confPassword) {
      signup(this.state).then((response) => {
        if (response.status === 201) {
          this.props.navigation.navigate('Login');
        } else if (response.status === 400) {
          this.props.navigation.navigate('Message', {
            message: 'Unable to create account, please check details',
          });
        } else {
          throw new Error('Something went wrong');
        }
      });
    } else {
      this.props.navigation.navigate('Message', {
        message: 'Your entered passwords do not match.',
      });
    }
  };

  render() {
    return (
      <ScrollView>
        <TextInput
          placeholder="First Name"
          onChangeText={(first_name) => this.setState({first_name})}
          value={this.state.first_name}
          style={{padding: 5, borderWidth: 1, margin: 5}}
        />
        <TextInput
          placeholder="Last Name"
          onChangeText={(last_name) => this.setState({last_name})}
          value={this.state.last_name}
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
        <TextInput
          placeholder="Confirm Password"
          onChangeText={(confPassword) => this.setState({confPassword})}
          value={this.state.confPassword}
          secureTextEntry
          style={{padding: 5, borderWidth: 1, margin: 5}}
        />
        <View style={{flex: 1, alignItems: 'center', marginTop: 10}} >
          <Button color="salmon"
            title="Create an account" onPress={() => this.signup()} />
        </View>
      </ScrollView>
    );
  }
}

export default SignupScreen;
