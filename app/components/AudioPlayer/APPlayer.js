import React, { Component } from 'react';
import {
    View,
    StatusBar,
} from 'react-native';
import APHeader from './APHeader';
import AlbumArt from './AlbumArt';
import APTrackDetails from './APTrackDetails';
import APSeekBar from './APSeekBar';
import APControls from './APControls';
// import Video from 'react-native-video';
// import Sound from 'react-native-sound';

export default class APPlayer extends Component {
    constructor(props) {
        super(props);

        this.state = {
            paused: true,
            totalLength: 1,
            currentPosition: 0,
            selectedTrack: 0,
            repeatOn: false,
            shuffleOn: false,
            //   queue : JSON.parse(navigation.getParam('queue'))
        };
    }

    setDuration(data) {
        this.setState({ totalLength: Math.floor(data.duration) });
    }

    setTime(data) {
        this.setState({ currentPosition: Math.floor(data.currentTime) });
    }

    seek(time) {
        time = Math.round(time);
        this.refs.audioElement && this.refs.audioElement.seek(time);
        this.setState({
            currentPosition: time,
            paused: false,
        });
    }

    onBack() {
        if (this.state.currentPosition < 10 && this.state.selectedTrack > 0) {
            this.refs.audioElement && this.refs.audioElement.seek(0);
            this.setState({ isChanging: true });
            setTimeout(() => this.setState({
                currentPosition: 0,
                paused: false,
                totalLength: 1,
                isChanging: false,
                selectedTrack: this.state.selectedTrack - 1,
            }), 0);
        } else {
            this.refs.audioElement.seek(0);
            this.setState({
                currentPosition: 0,
            });
        }
    }

    onForward() {
        if (this.state.selectedTrack < this.props.tracks.length - 1) {
            this.refs.audioElement && this.refs.audioElement.seek(0);
            this.setState({ isChanging: true });
            setTimeout(() => this.setState({
                currentPosition: 0,
                totalLength: 1,
                paused: false,
                isChanging: false,
                selectedTrack: this.state.selectedTrack + 1,
            }), 0);
        }
    }

    render() {
        const track = this.props.tracks[this.state.selectedTrack];
        // const video = this.state.isChanging ? null : (
        // const video = (
        //   <Video source={{uri: track.audioUrl}} // Can be a URL or a local file.
        //     ref="audioElement"
        //     paused={this.state.paused}               // Pauses playback entirely.
        //     resizeMode="cover"           // Fill the whole screen at aspect ratio.
        //     repeat={true}                // Repeat forever.
        //     onLoadStart={this.loadStart} // Callback when video starts to load
        //     onLoad={this.setDuration.bind(this)}    // Callback when video loads
        //     onProgress={this.setTime.bind(this)}    // Callback every ~250ms with currentTime
        //     onEnd={this.onEnd}           // Callback when playback finishes
        //     onError={this.videoError}    // Callback when video cannot be loaded
        //     style={styles.audioElement} />
        // );
        // const sound = new Sound(track.audioUrl, null, (error) => {
        //     if (error) {
        //         console.log(error)
        //     }
        //     // play when loaded
        //     sound.play();
        // });

        return (
            <View style={styles.container}>
                <StatusBar hidden={true} />
                <APHeader message="Playing your favourite Playlists" />
                <AlbumArt url={track.albumArtUrl} />
                <APTrackDetails title={track.title} artist={track.artist} />
                <APSeekBar
                    onSeek={this.seek.bind(this)}
                    trackLength={this.state.totalLength}
                    onSlidingStart={() => this.setState({ paused: true })}
                    currentPosition={this.state.currentPosition} />
                <APControls
                    onPressRepeat={() => this.setState({ repeatOn: !this.state.repeatOn })}
                    repeatOn={this.state.repeatOn}
                    shuffleOn={this.state.shuffleOn}
                    forwardDisabled={this.state.selectedTrack === this.props.tracks.length - 1}
                    onPressShuffle={() => this.setState({ shuffleOn: !this.state.shuffleOn })}
                    onPressPlay={() => this.setState({ paused: false })}
                    onPressPause={() => this.setState({ paused: true })}
                    onBack={this.onBack.bind(this)}
                    onForward={this.onForward.bind(this)}
                    paused={this.state.paused} />
                {/* {video} */}
                {/* {sound} */}
            </View>
        );
    }
}

const styles = {
    container: {
        flex: 1,
        backgroundColor: 'rgb(4,4,4)',
    },
    audioElement: {
        height: 0,
        width: 0,
    }
};