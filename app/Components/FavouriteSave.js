import React from 'react';
import {Image, TouchableOpacity, View} from "react-native";

function FavouriteSave(object) {
    return (
        <View>
            <TouchableOpacity
                onPress={() => console.log("ok")
                }
            >
                <Image
                    source={require('../assets/heart-100.png')}
                    style={{
                        height: 30,
                        width: 30,
                        marginLeft: 15,
                    }}
                />
            </TouchableOpacity>
        </View>
    );
}

export default FavouriteSave;