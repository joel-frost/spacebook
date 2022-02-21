import React, { Component } from 'react';
import { View, Text, ActivityIndicator } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { FlatList } from 'react-native-gesture-handler';


class ProfileScreen extends Component {

    constructor(props) {
        super(props);

        this.state = {
            isLoading: true,
            listData: []
        }
    }

    componentDidMount() {
        this.getPosts();
    }

    getPosts = async () => {
        let token = await AsyncStorage.getItem('@session_token');
        let id = await AsyncStorage.getItem('@id');

        return fetch(`http://localhost:3333/api/1.0.0/user/${id}/post`, {
            method: 'get',
            headers: {
                'Content-Type': 'application/json',
                'X-Authorization': token
            }
        })
            .then((response) => {
                if (response.status === 200) {
                    return response.json()
                } else if (response.status === 400) {
                    throw 'Unable to get posts';
                } else {
                    throw 'Something went wrong';
                }
            })
            .then(async (responseJson) => {

                console.log(responseJson);
                this.setState({
                    isLoading: false,
                    listData: responseJson
                })
            })

    }

    render() {
        if (this.state.isLoading) {
            return (
                <View>
                    <ActivityIndicator
                        size="large"
                        color="#00ff00"
                    />
                </View>
            );

        } else {
            return (
                <FlatList data={this.state.listData}
                    renderItem={({item}) =>
                        <View>
                            <Text>{item.text}</Text>
                        </View>
                    }
                />
            );

        }
    }
}

export default ProfileScreen;