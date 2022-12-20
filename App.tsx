import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import Home from "./screens/Home";
import EStyleSheet from "react-native-extended-stylesheet";
import { Button, StatusBar, Text } from "react-native";
import JustNamePokemonScreen from "./screens/PokemonScreen";
import PokemonSearch from "./screens/PokemonSearch";

const Stack = createNativeStackNavigator();

EStyleSheet.build();

export default function App() {
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen
                    name="Home"
                    component={Home}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="Poke"
                    component={JustNamePokemonScreen}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="Search"
                    component={PokemonSearch}
                    options={{ headerShown: false }}
                />
            </Stack.Navigator>
        </NavigationContainer>
    );
}
