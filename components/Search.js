import React, {Component} from 'react';
import {Card} from 'react-native-elements';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {View, ActivityIndicator, StyleSheet, Button} from 'react-native';
import {ScrollView, FlatList, TextInput} from 'react-native-gesture-handler';
import {updateSearch, addFriend} from '../api/SpacebookService';

class SearchScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      searchTerm: '',
      listData: [],
      token: '',
    };
  }

  componentDidMount = async () => {
    await this.retrieveFromAsync();
  };

  retrieveFromAsync = async () => {
    const token = await AsyncStorage.getItem('@session_token');

    this.setState({
      token: token,
    });
  };

  updateSearch = async () => {
    this.setState.isLoading = true;

    updateSearch(this.state.token, this.state.searchTerm).then(
        async (responseJson) => {
          this.setState({
            isLoading: false,
            listData: responseJson,
          });
        }
    );
  };

  addFriend = async (userID) => {
    addFriend(this.state.token, userID).then((response) => {
      if (response.status === 201) {
        this.props.navigation.navigate('Message', {
          message: 'Friend Request Sent',
        });
      } else {
        this.props.navigation.navigate('Message', {
          message:
            'Unable to add friend, you may already have added this person.',
        });
      }
    });
  };

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
          <TextInput
            style={styles.input}
            multiline
            numberOfLines={3}
            placeholder="Enter Name"
            onChangeText={(searchTerm) => this.setState({searchTerm})}
            value={this.state.searchTerm}
          />
          <Button
            color="salmon"
            title="Search"
            onPress={() => this.updateSearch()}
          />
        </View>
        <View>
          <FlatList
            data={this.state.listData}
            renderItem={({item, index}) => (
              <View>
                <Card>
                  <Card.Title>
                    {item.user_givenname} {item.user_familyname}
                  </Card.Title>
                  <Card.Divider />
                  <Button
                    color="salmon"
                    title="Add Friend"
                    onPress={() => this.addFriend(item.user_id)}
                  />

                  <Card.Divider style={styles.divider} />
                </Card>
              </View>
            )}
            keyExtractor={(item, index) => item.user_id.toString()}
          />
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 20,
    alignItems: 'center',
  },
  divider: {
    marginTop: 10,
  },
  input: {
    marginBottom: 10,
    borderBottomWidth: 1.0,
  },
});

export default SearchScreen;
