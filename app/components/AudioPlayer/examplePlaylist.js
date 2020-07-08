import React, { Component } from 'react';
import APPlayer from './APPlayer';

export const TRACKS = [
    {
        title: 'Stressed Out',
        artist: 'Twenty One Pilots',
        albumArtUrl: "https://images.pexels.com/photos/67636/rose-blue-flower-rose-blooms-67636.jpeg?auto=compress&cs=tinysrgb&h=350",
        audioUrl: "https://www.youtube.com/watch?v=kVpv8-5XWOI",
    },
    {
        title: 'Love Yourself',
        artist: 'Justin Bieber',
        albumArtUrl: "http://arrestedmotion.com/wp-content/uploads/2015/10/JB_Purpose-digital-deluxe-album-cover_lr.jpg",
        audioUrl: 'http://oranslectio.files.wordpress.com/2013/12/39-15-mozart_-adagio-fugue-in-c-minor-k-546.mp3',
    },
    {
        title: 'Hotline Bling',
        artist: 'Drake',
        albumArtUrl: 'https://upload.wikimedia.org/wikipedia/commons/c/c9/Drake_-_Hotline_Bling.png',
        audioUrl: 'http://russprince.com/hobbies/files/13%20Beethoven%20-%20Fur%20Elise.mp3',
    },
];

export default class Ap extends Component {
    render() {
        return <APPlayer tracks={TRACKS} />
    }
}
