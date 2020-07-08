import React, { Component } from 'react';
import t from 'tcomb-form-native';
import { Text, View, StyleSheet, TouchableHighlight, TouchableOpacity } from 'react-native';
import IOSIcon from "react-native-vector-icons/Ionicons"

class SignUp extends Component {
    static navigationOptions = ({ navigation }) => ({
        title: 'SignUp',
        headerLeft: (<TouchableOpacity style={{ marginLeft: 20 }} onPress={() => navigation.toggleDrawer()}>
            <IOSIcon name="ios-menu" size={30} />
        </TouchableOpacity>
        ),
    });
    handleSubmit = () => {
        const value = this._form.getValue();

        if (value.password != value.confirm_password) {
            console.log("Do something");
        } else if (value.password.length < 8 || value.password.length > 16) {
            console.log("length of password should be between 8 and 16, inclusive of both");
        } else {
            fetch('http://10.42.0.1:8080/signUp/', {
                method: 'POST',
                body: JSON.stringify(value),
            })
                .then(response => {
                    if (response.status == 400) {
                        response.json()
                            .then(
                                data => {
                                    this.props.navigation.navigate('User', { User: `${JSON.stringify(value)}`, })
                                })
                    }
                })
                .catch((error) => {
                    console.error(error);
                });
        }
    }

    render() {
        const Form = t.form.Form;
        const User = t.struct({
            name: t.String,
            email: t.String,
            username: t.String,
            password: t.String,
            confirm_password: t.String,
            Radiojockey: t.Boolean,
            Videojockey: t.Boolean,
        });
        return (
            <View style={styles.container}>
                <Form
                    ref={c => this._form = c}
                    type={User}
                />
                <TouchableHighlight
                    style={styles.button}
                    onPress={this.handleSubmit}
                >
                    <Text style={styles.buttonText}>Join Us!</Text>
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
        backgroundColor: '#ffffff'
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
    }
});

export default SignUp;