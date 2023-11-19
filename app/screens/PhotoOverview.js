import React from 'react';
import {Image, Platform, ScrollView, StatusBar, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import FavouriteSave from "../Components/FavouriteSave";
import * as FileSystem from "expo-file-system";


function PhotoOverview({route, navigation}) {
    const image = route.params?.data;
    return (
        <View style={styles.container}>
            <ScrollView contentContainerStyle={{flexGrow: 1, alignItems: 'center'}}>
                <View style={styles.panel}>
                    <Image
                        source={{uri: `https://www.artic.edu/iiif/2/${image.image_id}/full/843,/0/default.jpg`}}
                        minScale={0.5}
                        maxScale={3}
                        style={{
                            width: '95%',
                            height: undefined,
                            aspectRatio: .7,
                            marginTop: 10,
                        }}
                        resizeMode="contain"
                    />
                    <View
                        style={{
                            backgroundColor: "black",
                            height: 2,
                            width: "95%",
                            marginTop: 8,
                        }}
                    />
                    <View>
                        {image.title !== null && <Text style={styles.textTitle}>{image.title}</Text>}
                    </View>
                    <View style={{
                        flexDirection: "row",
                        marginLeft: 30,
                    }}>
                        <TouchableOpacity onPress={() =>
                            navigation.navigate('AboutArtistScreen', {data: image})}
                        >
                            {image.artist_title !== null && <Text style={styles.textArtist}>
                                Artist: {image.artist_title}
                            </Text>}
                        </TouchableOpacity>
                        <View style={{
                            bottom: 4
                        }}>
                            <FavouriteSave object={image} path={`${FileSystem.documentDirectory}favouriteSave.json`}/>
                        </View>
                    </View>
                    <View style={{
                        alignItems: "center",
                        marginLeft: 40,
                        marginRight: 40
                    }}>
                        {image.description !== null && <Text>Description: {image.description}</Text>}
                        <Text>Start date: {image.date_start}</Text>
                        <Text>End date: {image.date_end}</Text>
                    </View>
                </View>

            </ScrollView>
        </View>
    );
}


const styles = StyleSheet.create({
    container: {
        backgroundColor: "#081C15",
        paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
        flex: 1,
        alignItems: "center"
    },
    panel: {
        backgroundColor: "#B7E4C7",
        width: "95%",
        alignItems: "center",
        marginTop: 20,
        borderRadius: 15,
        paddingBottom: 15,
    },
    textTitle: {
        fontSize: 20,
        textAlign: "center",
        margin: 20,
    },
    textArtist: {
        fontSize: 17,
        marginBottom: 20,
        textDecorationLine: "underline",
    }
})
export default PhotoOverview;