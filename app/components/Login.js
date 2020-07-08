import React, { Component } from 'react';
import t from 'tcomb-form-native';
import { AppRegistry, Text, View, Button, Alert, StyleSheet, TouchableHighlight, TouchableOpacity } from 'react-native';
import IOSIcon from "react-native-vector-icons/Ionicons"

class Login extends Component {
    static navigationOptions = ({ navigation }) => ({
        title: 'Login',
        headerLeft: (<TouchableOpacity style={{ marginLeft: 20 }} onPress={() => navigation.toggleDrawer()}>
            <IOSIcon name="ios-menu" size={30} />
        </TouchableOpacity>
        ),
    });

    handleSubmit = () => {
        const value = this._form.getValue(); // use that ref to get the form value
        fetch('http://10.42.0.1:8080/login/', {
            method: 'POST',
            body: JSON.stringify(value),
        })
            .then(response => {
                if (response.status >= 200 && response.status < 300) {
                    response.json()
                        .then(data => {
                            if (data == "User Not Found") {
                                console.log("Do Something here");
                            } else if (data == "Wrong Password") {
                                console.log("Do something different here");
                            } else {
                                this.props.navigation.navigate('User', { User: `${JSON.stringify(data)}`, })
                            }
                        })
                }
            })
            .catch((error) => {
                console.error(error);
            });
    }

    render() {
        const Form = t.form.Form;
        const User = t.struct({
            username: t.String,
            password: t.String,
        });
        return (
            <View style={styles.container}>
                <Form
                    ref={c => this._form = c}
                    type={User} />
                <TouchableHighlight
                    style={styles.button}
                    onPress={this.handleSubmit}
                >
                    <Text style={styles.buttonText}>Login</Text>

                </TouchableHighlight>

                <TouchableHighlight
                    style={styles.button}
                    onPress={this.handleSubmit}
                >
                    <Text style={styles.buttonText}>Forgot Password??</Text>

                </TouchableHighlight>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        marginTop: 50,
        padding: 20,
        backgroundColor: '#ffffff',
    },
    buttonContainer: {
        margin: 20
    },
    buttonText: {
        fontSize: 18,
        color: 'white',
        alignSelf: 'center'
    },
    button: {
        height: 36,
        backgroundColor: '#074546',
        marginBottom: 10,
        alignSelf: 'stretch',
        justifyContent: 'center'
    },

});

export default Login;