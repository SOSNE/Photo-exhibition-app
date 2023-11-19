import React from 'react';
import {Image, Platform, StatusBar, StyleSheet, Text, View} from "react-native";

function PhotoOverview({route}) {
    const image = route.params?.data;
    return (
        <View style={styles.container}>
            <View style={styles.panel}>

                <Image
                    source={{
                        uri: `https://www.artic.edu/iiif/2/${image.image_id}/full/843,/0/default.jpg`,
                    }}
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
                    }}
                />
                <View>
                    {image.title !== null && <Text style={styles.textTitle}>{image.title}</Text>}
                </View>
                <View>
                    {image.artist_title !== null && <Text style={styles.textArtist}>
                        Artist: {image.artist_title}
                    </Text>}
                </View>
            </View>
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
        borderRadius: 15
    },
    textTitle: {
        fontSize: 20,
        textAlign: "center",
        margin: 20,
    },
    textArtist: {
        fontSize: 15,
        marginBottom: 20,
    }
})
export default PhotoOverview;