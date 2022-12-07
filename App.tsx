import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "./screens/HomeScreen";
import { NavigationContainer } from "@react-navigation/native";
import PokemonScreen from "./screens/PokemonScreen";
import Home from "./screens/Home";

const Stack = createNativeStackNavigator();

export default function App() {
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen name="Home" component={Home} />
                <Stack.Screen name="Pokemon" component={PokemonScreen} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}
