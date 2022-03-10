import React, { Component } from 'react';
import { Button, ScrollView, TextInput } from 'react-native';
import { editProfile } from '../api/SpacebookService';
import AsyncStorage from "@react-native-async-storage/async-storage";

class EditProfileScreen extends Component {

    constructor(props){
        super(props);

        this.state = {
            first_name: "",
            last_name: "",
            email: "",
            password: "",
            token: "",
            id: "",
        }
    }

    componentDidMount = async () => {
        await this.retrieveFromAsync();
    }

    retrieveFromAsync = async () => {
        const token = await AsyncStorage.getItem("@session_token");
        const id = await AsyncStorage.getItem("@id");
    
        this.setState({
          token: token,
          id: id,
        });
    };

    editProfile() {
        let updatedInfo = {};
        if (this.state.first_name != "") {
            updatedInfo.first_name = this.state.first_name;
        }
        if (this.state.last_name != "") {
            updatedInfo.last_name = this.state.last_name;
        }
        if (this.state.email != "") {
            updatedInfo.email = this.state.email;
        }
        if (this.state.password != "") {
            updatedInfo.password= this.state.password;
        }

        editProfile(this.state.token, this.state.id, updatedInfo).then(() => {
            this.props.navigation.navigate("Profile");
        })
        
    }

    render(){
        return (
            <ScrollView>
                <TextInput
                    placeholder="First Name"
                    onChangeText={(first_name) => this.setState({first_name})}
                    value={this.state.first_name}
                    style={{padding:5, borderWidth:1, margin:5}}
                />
                <TextInput
                    placeholder="Last Name"
                    onChangeText={(last_name) => this.setState({last_name})}
                    value={this.state.last_name}
                    style={{padding:5, borderWidth:1, margin:5}}
                />
                <TextInput
                    placeholder="Email"
                    onChangeText={(email) => this.setState({email})}
                    value={this.state.email}
                    style={{padding:5, borderWidth:1, margin:5}}
                />
                <TextInput
                    placeholder="Password"
                    onChangeText={(password) => this.setState({password})}
                    value={this.state.password}
                    secureTextEntry
                    style={{padding:5, borderWidth:1, margin:5}}
                />
                <Button
                    title="Update Details"
                    onPress={() => this.editProfile()}
                />
            </ScrollView>
        )
    }
}

export default EditProfileScreen;
