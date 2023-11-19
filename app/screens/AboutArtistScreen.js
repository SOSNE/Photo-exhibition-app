import React, {useEffect, useState} from 'react';
import {Platform, ScrollView, StatusBar, StyleSheet, Text, View} from "react-native";
import GetImage from "../Components/GetImage";
import HTML from 'react-native-render-html';

function AboutArtistScreen({route, navigation}) {
    const image = route.params?.data;
    const [artworksArtistTitleList, setArtworksArtistTitleList] = useState([]);
    let [artistInformationList, setArtistInformationList] = useState([]);
    useEffect(() => {
        //console.log(titleArtistText);
        fetch(`https://api.artic.edu/api/v1/artworks/search?q=${image.artist_title}&[term][is_public_domain]=true&limit=8&fields=id,title,image_id,artist_title,date_start,date_end,is_zoomable,inscriptions,description
`)
            .then(response => response.json())
            .then(data => {
                setArtworksArtistTitleList(data.data);
            })
            .catch(error => console.error('Error:', error));

        fetch(`https://api.artic.edu/api/v1/agents/search?q=${image.artist_title}&[term][is_public_domain]=true&limit=1&fields=id,title,birth_date,death_date,description`)
            .then(response => response.json())
            .then(data => {
                setArtistInformationList(data.data);
                console.log(image.artist_title)
            })
            .catch(error => console.error('Error:', error));
    }, []);
    return (
        <View style={styles.container}>
            <View>{artistInformationList.length > 0 && <ScrollView>
                <View style={styles.artistInformationView}>
                    <Text style={{marginBottom: 20}}>
                        Name: {artistInformationList[0].title}
                    </Text>
                    <Text
                        style={{textAlign: "center"}}> Description: {artistInformationList[0].description !== null ? artistInformationList[0].description : 'N/A'}</Text>
                    <Text>Birth
                        date: {artistInformationList[0].birth_date !== null ? artistInformationList[0].birth_date : 'N/A'}</Text>
                    <Text>Death
                        date: {artistInformationList[0].death_date !== null ? artistInformationList[0].death_date : 'N/A'}</Text>
                </View>
                <View style={styles.artistArtList}>
                    <View style={styles.moreArtWorkText}>
                        <Text style={{textAlign: "center", fontSize: 15}}>More {artistInformationList[0].title} art
                            work</Text>
                    </View>

                    <GetImage navigation={navigation} artworksList={artworksArtistTitleList}/>

                </View>
            </ScrollView>}
            </View>
        </View>

    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#081C15",
        paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
        flex: 1,
    },
    artistInformationView: {
        width: "85%",
        alignSelf: "center",
        alignItems: "center",
        backgroundColor: "#D8F3DC",
        marginBottom: 20,
        marginTop: 20,
        paddingTop: 20,
        paddingBottom: 20,
        borderRadius: 15,
        borderColor: "black",
        borderWidth: 1,
    },
    artistArtList: {
        alignSelf: "center",
        backgroundColor: "#1f3f32",
        marginTop: 15,
        paddingTop: 20,
        width: "95%",
        borderRadius: 15,
        borderColor: "black",
        borderWidth: 1,
    },
    moreArtWorkText: {
        alignSelf: "center",
        width: "95%",
        backgroundColor: "#D8F3DC",
        paddingTop: 10,
        paddingBottom: 10,
        marginBottom: 20,
        borderRadius: 15,
        borderColor: "black",
        borderWidth: 1,
    }
})
export default AboutArtistScreen;