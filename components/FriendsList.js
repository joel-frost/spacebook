import React, {Component} from 'react';
import {
  View,
  ActivityIndicator,
  ScrollView,
  FlatList,
  Button,
  StyleSheet,
} from 'react-native';
import {Text, Card} from 'react-native-elements';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {getFriendsList} from '../api/SpacebookService';

class FriendsListScreen extends Component {
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
    this.getFriendsList();
  };

  retrieveFromAsync = async () => {
    const token = await AsyncStorage.getItem('@session_token');
    const id = await AsyncStorage.getItem('@id');

    this.setState({
      token: token,
      id: id,
    });
  };

  getFriendsList = async () => {
    getFriendsList(this.state.token, this.state.id).then(
        async (responseJson) => {
          this.setState({
            isLoading: false,
            listData: responseJson,
          });
        }
    );
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
          <Text>
            You haven't added any friends yet, use the seach feature to find
            some!
          </Text>
          <Button
            color="salmon"
            title="View Requests"
            onPress={() => this.props.navigation.navigate('Friend Requests')}
          />
        </View>
      );
    }
    return (
      <ScrollView>
        <View style={styles.container}>
          <Button
            color="salmon"
            title="View Requests"
            onPress={() => this.props.navigation.navigate('Friend Requests')}
          />
        </View>
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
                  title="View Profile"
                  onPress={() =>
                    this.props.navigation.navigate('Profile', {item})
                  }
                />
              </Card>
            </View>
          )}
          keyExtractor={(item, index) => item.user_id.toString()}
        />
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
  },
});

export default FriendsListScreen;
