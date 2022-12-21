import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import Home from "./screens/Home";
import EStyleSheet from "react-native-extended-stylesheet";
import JustNamePokemonScreen from "./screens/PokemonScreen";
import PokemonSearch from "./screens/PokemonSearch";

const Stack = createNativeStackNavigator();

EStyleSheet.build({
    $mainAccent: "#42AD4A",
    $mainDark: "#383838",
    $mainText: "#F8F8FF",
});

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
