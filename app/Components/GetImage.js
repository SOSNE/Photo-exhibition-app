//import {ImageZoom} from '@likashefqet/react-native-image-zoom';
import React from 'react';
import {Image, StyleSheet, TouchableOpacity, Text, View} from "react-native";
import FavouriteSave from "./FavouriteSave";
import * as FileSystem from 'expo-file-system';


function GetImage({artworksList, navigation,}) {
    return (
        
        <View style={{alignItems: "center",}}>
            {artworksList.length > 0 && artworksList.map(image => (
                <View key={image.id} style={styles.imageSegment}>
                    <TouchableOpacity
                        style={{
                            width: "100%", height: 300, marginBottom: 20,
                        }}
                        onPress={() =>
                            navigation.navigate('PhotoOverview', {data: image})
                        }>
                        <Image
                            source={{
                                uri: `https://www.artic.edu/iiif/2/${image.image_id}/full/843,/0/default.jpg`,
                            }}
                            minScale={0.5}
                            maxScale={3}

                            style={{
                                width: "100%", height: 300, marginBottom: 20,
                            }}
                            resizeMode="center"
                        />
                    </TouchableOpacity>
                    <View style={styles.textContainer}>
                        <Text style={{textAlign: "center", fontSize: 16}}>{image.title}</Text>
                    </View>
                    <View style={styles.favouriteButton}>
                        <FavouriteSave path={`${FileSystem.documentDirectory}favouriteSave.json`} object={image}/>
                    </View>
                </View>
            ))}
        </View>
    );
}

const styles = StyleSheet.create({
    imageSegment: {
        width: "85%",
        alignItems: "center",
        backgroundColor: "#D8F3DC",
        marginBottom: 20,
        paddingTop: 20,
        borderRadius: 15,
        borderColor: "black",
        borderWidth: 1,
    },
    textContainer: {
        alignItems: 'center',
        marginLeft: 45,
        marginRight: 45,
    },
    favouriteButton: {
        bottom: 26,
        left: 138
    },
})
export default GetImage;