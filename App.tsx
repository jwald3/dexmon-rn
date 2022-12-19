import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import PokemonScreen from "./screens/PokemonScreen";
import Home from "./screens/Home";
import EStyleSheet from "react-native-extended-stylesheet";
import { Button, StatusBar, Text } from "react-native";
import JustNamePokemonScreen from "./screens/JustNamePokemonScreen";

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
                    name="Pokemon"
                    component={PokemonScreen}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="Poke"
                    component={JustNamePokemonScreen}
                    options={{ headerShown: false }}
                />
            </Stack.Navigator>
        </NavigationContainer>
    );
}
