import React, {useEffect, useState} from 'react';
import {Platform, ScrollView, StatusBar, StyleSheet, Text, View} from "react-native";
import NavBottom from "../Components/NavBottom";
import GetImage from "../Components/GetImage";
import * as FileSystem from "expo-file-system";


function FavouriteScreen({navigation}) {
    const [data, setData] = useState([]);
    const readDataFromFile = async (path) => {
        try {
            const fileContent = await FileSystem.readAsStringAsync(path);
            setData(JSON.parse(fileContent));
        } catch (error) {
            return null
        }
    }
    useEffect(() => {
        readDataFromFile(`${FileSystem.documentDirectory}favouriteSave.json`);
    }, [data]);

    return (
        <View style={styles.container}>
            <View style={styles.textTopBarr}>
                <Text style={styles.mainTextTop}>Your Favourites</Text>
            </View>
            <ScrollView style={{
                marginTop: 20,
            }}>

                <GetImage navigation={navigation} artworksList={data}></GetImage>
            </ScrollView>
            <NavBottom navigation={navigation}/>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#081C15",
        paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
        flex: 1,
        justifyContent: "flex-end",
    },
    mainTextTop: {
        marginTop: 5,
        textAlign: "center",
        color: "white",
        fontSize: 28,
    },
    textTopBarr: {
        alignSelf: "center",
        width: "95%",
        height: 50,
        backgroundColor: "#40916c",
        borderRadius: 15,
        marginTop: 10,
    },
})

export default FavouriteScreen;