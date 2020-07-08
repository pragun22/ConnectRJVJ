import React, { Component } from 'react';
import { ScrollView, View, FlatList, TouchableOpacity } from 'react-native';
import { List, ListItem, Text, Card } from 'react-native-elements';
import Carousel from 'react-native-snap-carousel';
import { sliderWidth, itemWidth } from './carastyle.js';
import SliderEntry from './sliderEntry';
import styles from './indexstyle.js';
import { AsyncStorage } from "react-native"

class UserPage extends Component {
    constructor() {
        super();
        this.state = {
            ENTRIES1: [
                {
                    title: 'BOB BAKER',
                    subtitle: 'Hey! I am Bob Baker , follow me on ConnectRJ/VJ',
                    illustration: 'https://www.livewires.org.in/images/radio-jockey-clip.png'
                },
                {
                    title: 'JOHN STEW',
                    subtitle: 'Hey! I am John Stew , follow me on ConnectRJ/VJ',
                    illustration: 'https://s4.scoopwhoop.com/anj/radio/217444108.jpg'
                },
                {
                    title: 'JAKE PERALTA',
                    subtitle: 'Hey! I am Jake Peralta , follow me on ConnectRJ/VJ',
                    illustration: 'https://uproxx.files.wordpress.com/2016/09/brooklyn-nine-nine4.jpg?quality=95&w=650&h=360'
                        // ))
                },
                        // ))
                {
                        // ))
                    title: 'MAGNUS CHASE',
                    subtitle: 'Hey! I am Magnus Chase , follow me on ConnectRJ/VJ',
                    illustration: 'https://images.firstpost.com/wp-content/uploads/2013/09/Tom-Hardy-Reuters.jpg'
                },
                {
                    title: 'LYRA SCHULZ',
                    subtitle: 'Hey! I am Lyra Schulz , follow me on ConnectRJ/VJ',
                    illustration: 'https://pbs.twimg.com/media/DKuUyAjUEAAdTVr.jpg'
                },
                {
                    title: 'LUCIFER DADDARIO',
                    subtitle: 'Hey! I am Lucifer Daddario , follow me on ConnectRJ/VJ',
                    illustration: 'https://cdn.images.express.co.uk/img/dynamic/20/590x/secondary/Lucifer-1240036.jpg?r=1533669636312'
                }
            ],
            playlist: [
                {
                    title: 'playlist 1',
                    genre: 'Country',
                    artist: 'Bob Baker',
                    pic: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRJmTRlSOYuTaLYGTHeMjMXtEgYZX8yTsC8TEA_rKHEOO1RKuxE'
                },

                {
                    title: 'playlist 2',
                    genre: 'rock',
                    artist: 'Lucifer Daddario',
                    pic: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRBuVkjVn66CiC8sEqRvOEvWLtrqbqBHP9n0PvtI26fPyGFZgEH'
                },
                {
                    title: 'playlist 3',
                    artist: 'Lyra Schulz',
                    genre: 'romantic',
                    pic: 'https://is2-ssl.mzstatic.com/image/thumb/Music18/v4/29/23/ac/2923ac9d-45fc-fb95-4899-196d768e3b4a/source/1200x1200bb.jpg'
                },
                {
                    title: 'playlist 4',
                    artist: 'Bob Baker',
                    genre: 'country',
                    pic: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTyK_jCElVIF9LgLtYjPhc-F6TNisQDaqpC66JNFtXiDcOkkkb4'
                },
                {
                    title: 'playlist 5',
                    artist: 'Jake Peralta',
                    genre: 'Death Metal',
                    pic: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR0YOkI-doyoVYMm5jUdFp5I12u77Qk8ltZvx_6j3_neuVih1b1'
                },
                {
                    title: 'playlist 6',
                    artist: 'Magnus Chase',
                    genre: 'romantic',
                    pic: 'https://i.pinimg.com/originals/5e/45/9f/5e459f898b2925210791a34a9398387c.jpg'
                },
                {
                    title: 'playlist 7',
                    genre: 'Metal',
                    artist: 'Jake Peralta',
                    pic: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTFXKilInjkYsOHLkoKt_dcqgThC54J7aYrgI15JRCY5sbHXvVa5Q'
                },
                {
                    title: 'playlist 8',
                    genre: 'Jazz',
                    artist: 'Lyra Schulz',
                    pic: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTNLEr4-6Icdmy9Jo0X1qBJTG8JZErhTP8HrCC5-bZiNOIcdETy'
                },
                {
                    title: 'playlist 9',
                    genre: 'Symphony',
                    artist: 'John Stew',
                    pic: 'https://i.scdn.co/image/594d5bd732b054e43da374975867e30d5aa5657c'
                },
            ],
            stat: 'false',
        };
    }
    _renderItem({ item, index }) {
        return (
            <View style={styles.slide}>
                <Text style={styles.title}>{item.title}</Text>
            </View>
        );
    }
    _renderItemWithParallax({ item, index }, parallaxProps) {
        return (
            <SliderEntry
                data={item}
                even={true}
                parallax={true}
                parallaxProps={parallaxProps}
            />
        );
    }
    _renderList({ item }) {
        return (
            <ListItem
                title={item.title}
                subtitle={`genre: ${item.genre} artist:${item.artist}`}
                avatar={{ uri: item.pic }}
                containerStyle={{ borderBottomWidth: 0 }}
            />
        );
    }
    renderSeparator = () => {
        return (
            <View
                style={{
                    height: 1,
                    width: "86%",
                    backgroundColor: "#CED0CE",
                    marginLeft: "14%"
                }}
            />
        );
    };



    render() {
        let ob = {
            status: 'true',
        };
        AsyncStorage.setItem("status", JSON.stringify(ob))
        const { navigation } = this.props;
        const details = JSON.parse(navigation.getParam('User'));
        console.log(details)
        return (
            <ScrollView>
                <Card style={styles.container}>
                    {
                        <View style={styles.subContainer}>
                            <Text h2>Welcome</Text>
                            <Text h3>{details.username}</Text>
                        </View>
                    }
                </Card>
                <Card>
                    <View><Text h4>Your Favourite RJs and VJs</Text></View>
                    <TouchableOpacity onPress={() => { this.props.navigation.navigate('RJ_Profile'); }}>
                        <Carousel
                            ref={(c) => { this._carousel = c; }}
                            data={this.state.ENTRIES1}
                            renderItem={this._renderItemWithParallax}
                            sliderWidth={sliderWidth}
                            itemWidth={itemWidth}
                            hasParallaxImages={true}
                        />
                    </TouchableOpacity>
                    <List>
                        <TouchableOpacity onPress={() => { this.props.navigation.navigate('APPlayer') }}>
                            <FlatList
                                data={this.state.playlist}
                                renderItem={this._renderList}
                                keyExtractor={item => item.title}
                                ItemSeparatorComponent={this.renderSeparator}
                            />
                        </TouchableOpacity>
                    </List>
                </Card>
            </ScrollView>
        );
    }
}

export default UserPage;