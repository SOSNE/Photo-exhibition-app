import React from 'react';
import {Image, TouchableOpacity, View} from "react-native";
import * as FileSystem from 'expo-file-system';
import deepEqual from 'deep-equal';

let data = [];

const readDataFromFile = async (path, object) => {

    try {
        const fileContent = await FileSystem.readAsStringAsync(path);
        data = JSON.parse(fileContent);
        if (!data.some(item => deepEqual(item, object))) {
            data.push(object);
            await FileSystem.writeAsStringAsync(path, JSON.stringify(data))
        } else {
            data = data.filter(item => !deepEqual(item, object));
            await FileSystem.writeAsStringAsync(path, JSON.stringify(data));
        }


    } catch (error) {
        return null
    }
    //console.log(data)
}

function FavouriteSave({path, object}) {
    return (
        <View>
            <TouchableOpacity
                onPress={() => readDataFromFile(path, object)
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