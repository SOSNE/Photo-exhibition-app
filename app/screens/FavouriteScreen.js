import React, {useEffect, useState} from 'react';
import {Platform, ScrollView, StatusBar, StyleSheet, View} from "react-native";
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
            console.error('Błąd podczas pobierania danych do pliku:', error);
            return null
        }
    }
    useEffect(() => {
        readDataFromFile(`${FileSystem.documentDirectory}favouriteSave.json`);
    }, [data]);

    return (
        <View style={styles.container}>
            <ScrollView>
                
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
})
export default FavouriteScreen;