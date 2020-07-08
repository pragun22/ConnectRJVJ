import PropTypes from 'prop-types';
import React, { Component } from 'react';
import styles from './SideMenu.style';
import { NavigationActions } from 'react-navigation';
import { ScrollView, Text, View } from 'react-native';
import { AsyncStorage } from "react-native"


class SideMenu extends Component {
    constructor() {
        super();
        this.state = {
            log: 'false',
            stat: 'false',
        }
    }
    navigateToScreen = (route) => () => {
        const navigateAction = NavigationActions.navigate({
            routeName: route
        });
        this.props.navigation.dispatch(navigateAction);
    }

    render() {
        AsyncStorage.getItem('status', (err, result) => {
            this.state.stat = result
        });
        console.log(this.state.stat, "in side");
        if (this.state.stat == '{"status":"true"}') this.state.log = 'true';
        return (
            <View style={styles.container}>
                <ScrollView>
                    <View style={styles.navSectionStyle}>
                        <Text style={styles.navItemStyle} onPress={this.navigateToScreen("Current")}>
                            Hey There!
                        </Text>
                    </View>
                    {this.state.log == 'false' &&
                        <View>
                            <Text style={styles.sectionHeadingStyle}>
                                Welcome. Please Log in to continue.
                            </Text>
                            <View style={styles.navSectionStyle}>
                                <Text style={styles.navItemStyle} onPress={this.navigateToScreen("SignUp")}>
                                    Login/Signup
                                </Text>
                            </View>
                        </View>
                    }
                    {this.state.log == 'true' &&
                        <View>
                            <Text style={styles.sectionHeadingStyle}>
                                Get Ready!
                            </Text>
                            <View style={styles.navSectionStyle}>
                                <Text style={styles.navItemStyle} onPress={this.navigateToScreen('User', { User: `${JSON.stringify("")}`, })}>
                                    Dashboard
                                </Text>
                            </View>
                            <View style={styles.navSectionStyle}>
                                <Text style={styles.navItemStyle} onPress={this.navigateToScreen('RJ_Profile')}>
                                    RJ Profile
                                </Text>
                            </View>
                            <View style={styles.navSectionStyle}>
                                <Text style={styles.navItemStyle} onPress={this.navigateToScreen('VJ_Profile')}>
                                    VJ Profile
                                </Text>
                            </View>
                            <View style={styles.navSectionStyle}>
                                <Text style={styles.navItemStyle} onPress={this.navigateToScreen('SearchBar')}>
                                    Search
                                </Text>
                            </View>
                        </View>
                    }
                </ScrollView>
                <View style={styles.footerContainer}>
                    <Text>Welcome to Rj/Vj Connect</Text>
                </View>
            </View>
        );
    }
}

SideMenu.propTypes = {
    navigation: PropTypes.object
};

export default SideMenu;