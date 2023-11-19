import React, {useState, useEffect} from 'react';
import {Platform, ScrollView, StatusBar, StyleSheet, Text, View} from "react-native";
import GetImage from "../Components/GetImage";
import NavBottom from "../Components/NavBottom";
import * as FileSystem from "expo-file-system";

let pageList = [];

function GenerateNewRandomNumber(min, max) {

    let checker = true;
    let pageGeneratedNumber;
    while (checker) {
        pageGeneratedNumber = Math.floor(Math.random() * (max - min + 1) + min);
        if (!pageList.includes(pageGeneratedNumber)) {
            pageList.push(pageGeneratedNumber);
            checker = false;
        }
    }
    return pageGeneratedNumber;
}

function ExploreScreen({navigation}) {

    const [artworksList, setArtworksList] = useState([]);
    const [pageNum, setPageNum] = useState(GenerateNewRandomNumber(1, 154));

    const scrollHandler = (event) => {
        const scrollViewCurrentOffset = event.nativeEvent.contentOffset.y;
        const scrollViewHeight = event.nativeEvent.contentSize.height;
        const scrollViewHeightNow = event.nativeEvent.layoutMeasurement.height;
        if (scrollViewCurrentOffset + scrollViewHeightNow >= scrollViewHeight - 5) {
            setPageNum(GenerateNewRandomNumber(1, 154));
        }
    }

    useEffect(() => {
        fetch(`https://api.artic.edu/api/v1/artworks/search?q=[term][is_public_domain]=true&page=${pageNum}&limit=8&fields=id,title,image_id,artist_title,date_start,date_end,is_zoomable,inscriptions,description`)
            .then(response => response.json())
            .then(data => {
                if (data.data !== undefined) {
                    setArtworksList(prevArtworksList => [...prevArtworksList, ...data.data]);
                } else {
                    setPageNum(GenerateNewRandomNumber(1, 154));
                }
                //console.log(artworksList);
            })
            .catch(error => console.error('Error:', error));
        console.log("useEffect go");
    }, [pageNum]);

    return (

        <View style={styles.container}>
            <View style={styles.textTopBarr}>
                <Text style={styles.mainTextTop}>Explore</Text>
            </View>
            <ScrollView
                onScroll={scrollHandler}
                style={{
                    marginTop: 20,
                }}
            >
                <View>
                    <GetImage artworksList={artworksList} navigation={navigation}/>
                </View>
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
        //justifyContent: "flex-end,
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

export default ExploreScreen;