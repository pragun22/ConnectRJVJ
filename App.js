/** @format */

import React, {Component} from 'react';
import {AppRegistry, View,Text, StyleSheet, TouchableOpacity} from 'react-native';
import { createStackNavigator, createDrawerNavigator } from 'react-navigation';
import HomeScreen from './app/components/HomeScreen';
import SignUp from './app/components/SignUp';
import Login from './app/components/Login';
import UserPage from './app/components/UserPage';
import SideMenu from './app/components/sideMenu';
import { AsyncStorage } from "react-native"
import RJ_Profile from './app/components/rj_profile'
import VJ_Profile from './app/components/vj_profile'
import APPlayer from './app/components/AudioPlayer/examplePlaylist'
import SearchBar from './app/components/SearchBar/SearchBar'

const RootStack = createStackNavigator(
    {
        Home: HomeScreen,
        SignUp: SignUp,
        Login : {screen: Login, navigationOptions: {title: "234"}},
        User : UserPage,
        RJ_Profile : RJ_Profile,
        VJ_Profile : VJ_Profile,
        APPlayer : APPlayer,
        SearchBar : SearchBar,
    },
    {
        initialRouteName: 'Home',
        navigationOptions: {
        headerStyle: {
            backgroundColor: '#000000',
        },
        headerTintColor: '#FFFFFF',
        headerTitleStyle: {
            fontWeight: 'bold',
        },
        },
    },
);
const Drawer = createDrawerNavigator({
    Current : { screen: RootStack},
    HomeScreen: createStackNavigator({HomeScreen: HomeScreen}),
    Login: createStackNavigator({Login: Login}),
    SignUp:createStackNavigator({SignUp: SignUp}),
    User :  createStackNavigator({ User: UserPage},{RJ_Profile : RJ_Profile}),
    RJ_Profile : createStackNavigator({RJ_Profile: RJ_Profile}),
    VJ_Profile : createStackNavigator({VJ_Profile: VJ_Profile}),
    SearchBar : createDrawerNavigator({SearchBar: SearchBar}),
},{
    contentComponent: SideMenu,
})

export default class Connect extends Component {
    constructor(){
        super();
    this.state = {
      log : 'fal',
    }
  }
  render() {
      let ob = {
        status : 'false',
      };
      AsyncStorage.setItem("status",JSON.stringify(ob));
      return (
        <View style={styles.container}>
            <Drawer/>
        </View>
      );
  }
}

const styles = StyleSheet.create({
    container : {
      flex: 1,
    }
});

AppRegistry.registerComponent(Connect, () => Connect);

//check out react-native log-android on terminal for console.log()
