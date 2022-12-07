import { View, Text, Image } from "react-native";
import { useNavigation, useRoute, RouteProp } from "@react-navigation/native";
import React from "react";
import { UpdatedPokemonResponse } from "./HomeScreen";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

export type RootStackParamList = {
    Pokemon: {
        pokemon: UpdatedPokemonResponse;
    };
};

const PokemonScreen = () => {
    const {
        params: { pokemon },
    } = useRoute<RouteProp<RootStackParamList, "Pokemon">>();

    return (
        <View>
            <Text>{pokemon.name}</Text>
            <View>
                <Image
                    style={{
                        height: 96,
                        width: 96,
                    }}
                    source={{ uri: pokemon.image_url }}
                />
            </View>
        </View>
    );
};

export default PokemonScreen;
