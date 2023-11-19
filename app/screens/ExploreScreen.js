import React, {useState, useEffect} from 'react';
import {Platform, ScrollView, StatusBar, StyleSheet, View} from "react-native";
import GetImage from "../Components/GetImage";
import NavBottom from "../Components/NavBottom";

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
    const [pageNum, setPageNum] = useState(GenerateNewRandomNumber(1, 83));

    const scrollHandler = (event) => {
        const scrollViewCurrentOffset = event.nativeEvent.contentOffset.y;
        const scrollViewHeight = event.nativeEvent.contentSize.height;
        const scrollViewHeightNow = event.nativeEvent.layoutMeasurement.height;
        if (scrollViewCurrentOffset + scrollViewHeightNow >= scrollViewHeight - 5) {
            const newPageNum = GenerateNewRandomNumber(1, 154);
            setPageNum(newPageNum);
            console.log("yes" + newPageNum);
        }
    }

    useEffect(() => {
        fetch(`https://api.artic.edu/api/v1/artworks/search?q=[term][is_public_domain]=true&page=${pageNum}&limit=8&fields=id,title,image_id,artist_title`)
            .then(response => response.json())
            .then(data => {
                setArtworksList(prevArtworksList => [...prevArtworksList, ...data.data]);
                //console.log(artworksList);
            })
            .catch(error => console.error('Error:', error));
        console.log("useEffect go");
    }, [pageNum]);

    return (

        <View style={styles.container}>
            <ScrollView
                onScroll={scrollHandler}
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
})

export default ExploreScreen;