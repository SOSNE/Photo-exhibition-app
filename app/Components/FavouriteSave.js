import React, {useEffect, useState} from 'react';
import {Image, TouchableOpacity, View} from "react-native";
import * as FileSystem from 'expo-file-system';
import deepEqual from 'deep-equal';

let data = [];

function FavouriteSave({path, object}) {
    const [artworksDataList, setArtworksDataList] = useState([]);
    const saveDataToFile = async (path, object) => {
        try {
            const fileContent = await FileSystem.readAsStringAsync(path);
            data = JSON.parse(fileContent);
            if (!data.some(item => deepEqual(item, object))) {
                data.push(object);
            } else {
                data = data.filter(item => !deepEqual(item, object));
            }
            await FileSystem.writeAsStringAsync(path, JSON.stringify(data));
            setArtworksDataList(data);
        } catch (error) {
            return null
        }
    }
    if (artworksDataList != null) {
        useEffect(() => {
            
            }, [artworksDataList]
        )
    }
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