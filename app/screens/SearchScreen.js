import React, {useEffect, useState} from 'react';
import {
    Platform,
    KeyboardAvoidingView,
    StatusBar,
    StyleSheet,
    TextInput,
    ScrollView
} from "react-native";
import NavBottom from "../Components/NavBottom";
import GetImage from "../Components/GetImage";
import * as FileSystem from "expo-file-system";


function SearchScreen({navigation}) {
    
    const [titleArtistText, onTitleArtistText] = useState('Useless Text');
    const [artworksSearchList, setArtworksSearchList] = useState([]);
    useEffect(() => {
        console.log(titleArtistText);
        fetch(`https://api.artic.edu/api/v1/artworks/search?q=${titleArtistText}&[term][is_public_domain]=true&limit=8&fields=id,title,image_id,artist_title,date_start,date_end,is_zoomable,inscriptions,description
`)
            .then(response => response.json())
            .then(data => {
                setArtworksSearchList(data.data);
            })
            .catch(error => console.error('Error:', error));

    }, [titleArtistText]);
    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : -363}
            style={styles.container}
        >
            <TextInput
                style={styles.textInput}
                onChangeText={onTitleArtistText}
                placeholder={"Search: Title/Artist"}
            />
            <ScrollView>
                <GetImage artworksList={artworksSearchList} navigation={navigation}/>
            </ScrollView>
            <NavBottom navigation={navigation}/>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#081C15",
        paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
        flex: 1,
        justifyContent: "flex-end",
        borderColor: "black",
        borderWidth: 1,
    },
    textInput: {
        height: 50,
        margin: 17,
        borderWidth: 1,
        borderRadius: 10,
        padding: 10,
        backgroundColor: "#b7e4c7",
        fontSize: 20,
        //bottom: Dimensions.get('window').height - 130,
    },
})
export default SearchScreen;