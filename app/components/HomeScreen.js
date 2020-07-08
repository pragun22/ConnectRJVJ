import React, { Component } from 'react';
import { Button, View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Expo from 'expo';
import IOSIcon from "react-native-vector-icons/Ionicons"


class HomeScreen extends Component {
    static navigationOptions = ({ navigation }) => ({
        title: 'Home',
        headerLeft: (<TouchableOpacity style={{ marginLeft: 20 }} onPress={() => navigation.toggleDrawer()}>
            <IOSIcon name="ios-menu" size={30} />
        </TouchableOpacity>
        ),
    });
    constructor(props) {
        super(props)
        this.state = {
            signedIn: false,
            name: "",
            photoUrl: ""
        }
    }

    signIn = async () => {
        try {
            const result = await Expo.Google.logInAsync({
                androidClientId:
                    "219638552622-q5sjmcu9o6g2tgb9bibuceionb5tmehu.apps.googleusercontent.com",
                //iosClientId: YOUR_CLIENT_ID_HERE,  <-- if you use iOS
                scopes: ["profile", "email"]
            })

            if (result.type === "success") {
                this.setState({
                    signedIn: true,
                    name: result.user.name,
                    photoUrl: result.user.photoUrl
                })
                this.props.navigation.navigate('User', { User: `${JSON.stringify({ username: this.state.name })}`, })
            } else {
                console.log("cancelled")
            }
        } catch (e) {
            console.log("error", e)
        }
    }

    render() {
        return (
            <View style={styles.myView} >
                <View>
                    <Text style={styles.text}>Connect RJ/VJ</Text>
                </View>
                <View style={styles.buttonContainer}>
                    <Button
                        title="Sign Up"
                        onPress={() => this.props.navigation.navigate('SignUp')}
                    />
                </View>
                <View style={styles.buttonContainer}>
                    <Button
                        title="Login"
                        onPress={() => this.props.navigation.navigate('Login')}
                    />
                </View>

                <View style={styles.buttonContainer}>
                    <Button
                        title="Login with Google"
                        onPress={() => this.signIn.bind(this)()}
                    />
                </View>

            </View>
        );
    }
}

const styles = StyleSheet.create({
    myView: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#074546'
    },
    text: {
        fontSize: 50,
        fontWeight: 'bold',
        bottom: 200,
        color: '#FFFFFF'
    },
    buttonContainer: {
        margin: 20,
        width: 300,
    },
    button: {
        backgroundColor: '#FFFFFF',
        fontSize: 100
    }
});

export default HomeScreen;