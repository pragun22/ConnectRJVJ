import React from 'react'
import PropTypes from 'prop-types'
import IOSIcon from "react-native-vector-icons/Ionicons"
import contactData from './contact.json'

import Profile from './Profile'
import { TouchableOpacity } from "react-native";

const ProfileScreen = () => <Profile {...contactData} />

ProfileScreen.navigationOptions = ({ navigation }) => ({

    title: 'VJ_Profile',
    headerLeft: (<TouchableOpacity style={{ marginLeft: 20 }} onPress={() => navigation.toggleDrawer()}>
        <IOSIcon name="ios-menu" size={30} />
    </TouchableOpacity>
    ),

})

ProfileScreen.propTypes = {
    navigation: PropTypes.object.isRequired,
}

export default ProfileScreen