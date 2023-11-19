import React, {useEffect, useState} from 'react';
import {Image, TouchableOpacity, View} from "react-native";
import * as FileSystem from 'expo-file-system';
import deepEqual from 'deep-equal';

//let [dataForButton, setDataForButton] = useState([]);
let data = [];

const saveDataToFile = async (path, object) => {

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
}

function FavouriteSave({path, object}) {
    useEffect(() => {

    }, [data]);
    console.log(data)
    return (
        <View>
            <TouchableOpacity
                onPress={() => saveDataToFile(path, object)
                }
            >
                {!data.some(item => deepEqual(item, object)) && <Image
                    source={require('../assets/heart-100.png')}
                    style={{
                        height: 30,
                        width: 30,
                        marginLeft: 15,
                    }}

                />}
                {data.some(item => deepEqual(item, object)) && <Image
                    source={require('../assets/icon-fill-heart-100.png')}
                    style={{
                        height: 30,
                        width: 30,
                        marginLeft: 15,
                    }}
                />}
            </TouchableOpacity>
        </View>
    );
}

export default FavouriteSave;