import React from "react";
import ExploreScreen from "./app/screens/ExploreScreen";
import SearchScreen from "./app/screens/SearchScreen";
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import PhotoOverview from "./app/screens/PhotoOverview";
import NavBottom from "./app/Components/NavBottom";

const Stack = createStackNavigator();


export default function App() {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="Home" screenOptions={{headerShown: false}}>
                <Stack.Screen name={"ExploreScreen"} component={ExploreScreen}/>
                <Stack.Screen name={"SearchScreen"} component={SearchScreen}/>
                <Stack.Screen name={"PhotoOverview"} component={PhotoOverview}/>
            </Stack.Navigator>
        </NavigationContainer>
    );
}
