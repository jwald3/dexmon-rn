import { View, Text } from "react-native";
import React from "react";
import { PokemonResponse } from "../components/EvolutionChainItem";
import { useRoute, RouteProp } from "@react-navigation/native";

export type RootStackParamList = {
    Pokemon: {
        pokemon: PokemonResponse;
    };
};

const JustNamePokemonScreen = () => {
    const {
        params: { pokemon },
    } = useRoute<RouteProp<RootStackParamList, "Pokemon">>();

    return (
        <View>
            <Text>{pokemon.name}</Text>
        </View>
    );
};

export default JustNamePokemonScreen;
