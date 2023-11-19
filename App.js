import React from "react";
import ExploreScreen from "./app/screens/ExploreScreen";
import SearchScreen from "./app/screens/SearchScreen";
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import PhotoOverview from "./app/screens/PhotoOverview";
import FavouriteScreen from "./app/screens/FavouriteScreen";
import AboutArtistScreen from "./app/screens/AboutArtistScreen";


const Stack = createStackNavigator();


export default function App() {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="Home" screenOptions={{headerShown: false}}>
                <Stack.Screen name={"ExploreScreen"} component={ExploreScreen}/>
                <Stack.Screen name={"SearchScreen"} component={SearchScreen}/>
                <Stack.Screen name={"FavouriteScreen"} component={FavouriteScreen}/>
                <Stack.Screen name={"PhotoOverview"} component={PhotoOverview}/>
                <Stack.Screen name={"AboutArtistScreen"} component={AboutArtistScreen}/>
            </Stack.Navigator>
        </NavigationContainer>
    );
}
