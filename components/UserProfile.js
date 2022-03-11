import React, {Component} from 'react';
import {
  View,
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  Button,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {FlatList} from 'react-native-gesture-handler';
import {Text, Card, Input, Avatar} from 'react-native-elements';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {
  getUser,
  getPosts,
  submitPost,
  deletePost,
  likePost,
  unlikePost,
} from '../api/SpacebookService';

class UserProfileScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: true,
      listData: [],
      text: '',
      firstName: '',
      lastName: '',
      email: '',
      token: '',
      id: '',
      photo: null,
    };
  }

  componentDidMount() {
    this._unsubscribe = this.props.navigation.addListener('focus', () => {
      this.getData();
    });
  }

  componentWillUnmount() {
    this._unsubscribe();
  }

  retrieveFromAsync = async () => {
    const token = await AsyncStorage.getItem('@session_token');
    const id = await AsyncStorage.getItem('@id');

    this.setState({
      token,
      id,
    });
  };

  getUser = async () => {
    getUser(this.state.token, this.state.id).then(async (responseJson) => {
      console.log(responseJson);
      this.setState({
        firstName: responseJson.firstName,
        lastName: responseJson.lastName,
        email: responseJson.email,
      });
    });
  };

  formatDates(responseJson) {
    console.log(this.state.listData);
    for (let i = 0; i < responseJson.length; i++) {
      responseJson[i].timestamp = new Date(
          responseJson[i].timestamp
      ).toLocaleString();
    }
    return responseJson;
  }

  getPosts = async () => {
    getPosts(this.state.token, this.state.id).then(async (responseJson) => {
      console.log(responseJson);
      const formattedData = this.formatDates(responseJson);
      this.setState({
        isLoading: false,
        listData: formattedData,
      });
    });
  };

  getProfilePicture = async () => {
    fetch(`http://localhost:3333/api/1.0.0/user/${this.state.id}/photo`, {
      method: 'GET',
      headers: {
        'X-Authorization': this.state.token,
      },
    })
        .then((res) => res.blob())
        .then((resBlob) => {
          const data = URL.createObjectURL(resBlob);
          this.setState({
            photo: data,
            isLoading: false,
          });
        })
        .catch((err) => {
          console.log('error', err);
        });
  };

  submitPost = async () => {
    submitPost(this.state.token, this.state.id, this.state.text)
        .then((response) => {
          console.log(response);
          this.setState({
            text: '',
          });
          if (response.status === 201) {
            this.getPosts();
          } else if (response.status === 400) {
            throw new Error('Unable to submit post');
          } else {
            throw new Error('Something went wrong');
          }
        })
        .catch((e) => {
          console.log(e);
        });
  };

  deletePost = async (postID) => {
    deletePost(this.state.token, this.state.id, postID)
        .then((response) => {
          console.log(response);
          if (response.status === 200) {
            this.getPosts();
            console.log('Post Deleted');
          } else if (response.status === 400) {
            throw new Error('Unable to delete post');
          } else {
            throw new Error('Something went wrong');
          }
        })
        .catch((e) => {
          console.log(e);
        });
  };

  getData = async () => {
    await this.retrieveFromAsync();
    this.getUser();
    this.getProfilePicture();
    this.getPosts();
  };

  unlikePost = async (postID) => {
    unlikePost(this.state.token, this.state.id, postID).then((response) => {
      if (response.status !== 200) {
        this.props.navigation.navigate('Message', {
          message: 'You are unable to like your own posts.',
        });
      }
      this.getPosts();
    });
  };

  likePost = async (postID) => {
    likePost(this.state.token, this.state.id, postID).then((response) => {
      if (response.status === 200) {
        this.getPosts();
        return response;
      } else {
        this.unlikePost(postID);
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
          <Avatar size={128} rounded source={this.state.photo} />
          <Text style={styles.nametext}>
            {this.state.firstName} {this.state.lastName}
          </Text>
          <Button
            title="Edit Profile"
            color="salmon"
            onPress={() => this.props.navigation.navigate('Edit Profile')}
          />
          <Input
            placeholder="Type a post"
            multiline
            numberOfLines={5}
            onChangeText={(text) => this.setState({text})}
            value={this.state.text}
          />
          <Button title="Post" color="salmon" onPress={this.submitPost} />
        </View>
        <View>
          <FlatList
            data={this.state.listData}
            renderItem={({item, index}) => (
              <View>
                <Card>
                  <Ionicons
                    name="trash-outline"
                    size={16}
                    onPress={() => {
                      this.deletePost(item.post_id);
                    }}
                  />
                  <Card.Title>
                    {item.author.firstName} {item.author.lastName}
                  </Card.Title>

                  <Card.Divider />
                  <Text>{item.text}</Text>
                  <Card.Divider style={styles.divider} />
                  <Ionicons
                    name="thumbs-up-outline"
                    size={16}
                    onPress={() => {
                      this.likePost(item.post_id);
                    }}
                  />
                  <Text>Likes: {item.numLikes.toString()}</Text>
                  <Text>Time: {item.timestamp}</Text>
                  <Button
                    title="View Post"
                    color="salmon"
                    onPress={() =>
                      this.props.navigation.navigate('Post', {item})
                    }
                  />
                </Card>
              </View>

            )}
            keyExtractor={(item, index) => item.post_id.toString()}
          />
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
  divider: {
    marginTop: 10,
  },
  nametext: {
    fontWeight: 'bold',
    fontSize: 25,
  },
});

export default UserProfileScreen;
