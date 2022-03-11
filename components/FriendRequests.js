import React, {Component} from 'react';
import {
  View,
  ActivityIndicator,
  ScrollView,
  FlatList,
  Button,
} from 'react-native';
import {Text, Card} from 'react-native-elements';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  getFriendRequests,
  acceptFriendRequest,
  rejectFriendRequest,
} from '../api/SpacebookService';

class FriendRequestsScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: true,
      listData: [],
      token: '',
      id: '',
    };
  }

  componentDidMount = async () => {
    await this.retrieveFromAsync();
    this.getFriendRequests();
  };

  retrieveFromAsync = async () => {
    const token = await AsyncStorage.getItem('@session_token');
    const id = await AsyncStorage.getItem('@id');

    this.setState({
      token: token,
      id: id,
    });
  };

  getFriendRequests = async () => {
    getFriendRequests(this.state.token).then((response) => {
      console.log(response);
      this.setState({
        isLoading: false,
        listData: response,
      });
    });
  };

  acceptFriendRequest = async (id) => {
    acceptFriendRequest(this.state.token, id).then(() => {
      this.props.navigation.navigate('Message', {
        message: 'Friend request accepted.',
      });
    });
  };

  rejectFriendRequest = async (id) => {
    rejectFriendRequest(this.state.token, id).then(() => {
      this.props.navigation.navigate('Message', {
        message: 'Friend request rejected.',
      });
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

    if (this.state.listData.length <= 0) {
      return (
        <View>
          <Text>No friend requests at the moment!</Text>
        </View>
      );
    }
    return (
      <ScrollView>
        <FlatList
          data={this.state.listData}
          renderItem={({item, index}) => (
            <View>
              <Card>
                <Card.Title>
                  {item.first_name} {item.last_name}
                </Card.Title>

                <Card.Divider />
                <Button
                  title="Accept"
                  color="salmon"
                  onPress={() => this.acceptFriendRequest(item.user_id)}
                />
                <Button
                  title="Reject"
                  color="salmon"
                  onPress={() => this.rejectFriendRequest(item.user_id)}
                />
                <Text>Accept / Reject Here</Text>
              </Card>
            </View>
          )}
          keyExtractor={(item, index) => item.user_id.toString()}
        />
      </ScrollView>
    );
  }
}

export default FriendRequestsScreen;
