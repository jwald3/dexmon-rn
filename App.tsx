import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import PokemonScreen from "./screens/PokemonScreen";
import Home from "./screens/Home";
import EStyleSheet from "react-native-extended-stylesheet";
import { StatusBar } from "react-native";

const Stack = createNativeStackNavigator();

EStyleSheet.build();

export default function App() {
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen
                    name="Home"
                    component={Home}
                    options={{
                        title: "Dexmon",
                        headerTitleStyle: {
                            color: "#fff",
                        },
                        headerTintColor: "#fff",
                        headerStyle: {
                            backgroundColor: "#42AD4A",
                        },
                    }}
                />
                <Stack.Screen
                    name="Pokemon"
                    component={PokemonScreen}
                    options={{
                        headerTintColor: "#fff",
                        headerTitleStyle: {
                            color: "#fff",
                        },
                        headerStyle: {
                            backgroundColor: "#42AD4A",
                        },
                    }}
                />
            </Stack.Navigator>
        </NavigationContainer>
    );
}
