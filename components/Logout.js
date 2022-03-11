import React, {Component} from 'react';
import {Text, ScrollView, Button, StyleSheet, View} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {logout} from '../api/SpacebookService';

class LogoutScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      token: '',
      logoutConfirmed: false,
    };
  }

  componentDidMount() {
    this._unsubscribe = this.props.navigation.addListener('focus', () => {
      this.checkLoggedIn();
    });
  }

  componentWillUnmount() {
    this._unsubscribe();
  }

  checkLoggedIn = async () => {
    const value = await AsyncStorage.getItem('@session_token');
    if (value !== null) {
      this.setState({token: value});
    } else {
      this.props.navigation.navigate('Login');
    }
  };

  logout = async () => {
    logout()
        .then((response) => {
          if (response.status === 200) {
            this.props.navigation.navigate('Login');
          } else if (response.status === 401) {
            this.props.navigation.navigate('Login');
          } else {
            throw new Error('Something went wrong');
          }
        })
        .catch((error) => {

        });
  };

  render() {
    return (
      <ScrollView>
        <View style={styles.container}>
          <Text style={styles.leavingText}>
            Thanks for using SpaceBook. Click Below to Logout
          </Text>
          <Button color='tomato' title="Logout" onPress={() => this.logout()} />
        </View>
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
  leavingText: {
    flex: 0.3,
    fontSize: 40,
    textAlign: 'center',
    fontWeight: 'bold',
    margin: 30,
  },
});

export default LogoutScreen;
