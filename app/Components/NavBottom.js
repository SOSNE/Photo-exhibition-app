import React from 'react';
import {Image, StyleSheet, TouchableOpacity, View} from "react-native";

function NavBottom({navigation}) {
    return (
        <View style={styles.navBarBottom}>
            <TouchableOpacity onPress={() => navigation.navigate('ExploreScreen')}>
                <Image
                    style={{height: 60, width: 60, bottom: 6.5}}
                    source={require('../assets/picture-100.png')}
                />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('SearchScreen')}>
                <Image
                    style={styles.navBarBottomButton}
                    source={require('../assets/search-100.png')}
                />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('FavouriteScreen')}>
                <Image style={styles.navBarBottomButton} source={require('../assets/heart-100.png')}/>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    navBarBottom: {
        width: "100%",
        height: 50,
        backgroundColor: '#40916c',
        flexDirection: "row",
        justifyContent: "space-evenly",
    },
    navBarBottomButton: {
        resizeMode: 'contain',
        width: 45,
        height: 50,
    },
})
export default NavBottom;