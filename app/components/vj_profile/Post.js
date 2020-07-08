import React from 'react'
import { Image, StyleSheet, View, Text } from 'react-native'
import PropTypes from 'prop-types'

const styles = StyleSheet.create({
    container: {},
    postImage: {},
})

const Post = ({
    containerStyle,
    image,
    imageHeight,
    imageWidth,
    postWidth,
    words,
}) => {
    return (
        <View style={[styles.container, containerStyle]}>
            {image && (
                <Image
                    style={[
                        styles.postImage,
                        {
                            width: postWidth,
                            height: postWidth * (imageHeight / imageWidth),
                        },
                    ]}
                    source={{ uri: image }}
                />
            )}
            <Text>{words}</Text>
        </View>
    )
}

Post.propTypes = {
    containerStyle: PropTypes.oneOfType([PropTypes.object, PropTypes.number]),
    image: PropTypes.string,
    imageHeight: PropTypes.number,
    imageWidth: PropTypes.number,
    postWidth: PropTypes.number,
    words: PropTypes.string,
}

Post.defaultProps = {
    containerStyle: {},
    image: null,
    imageHeight: null,
    imageWidth: null,
    postWidth: null,
    words: null,
}

export default Post