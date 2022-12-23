import React from "react";
import { View, Image, Text } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { ChevronRightIcon } from "react-native-heroicons/outline";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { capitalize } from "../typescript/functions";
import EStyleSheet from "react-native-extended-stylesheet";
import { PokemonObject } from "../typescript/types";

interface PokedexItemProps {
    pokemon: PokemonObject;
}

export interface PokemonResponse {
    name: string;
}

export type RootStackParamList = {
    Poke: {
        pokemon: PokemonResponse;
    };
};

function PokedexItem({ pokemon }: PokedexItemProps) {
    const navigation =
        useNavigation<NativeStackNavigationProp<RootStackParamList, "Poke">>();

    return (
        <TouchableOpacity
            onPress={() => navigation.navigate("Poke", { pokemon })}
        >
            <View style={styles.container}>
                <View style={styles.circle}>
                    <Image
                        style={styles.pokemonImage}
                        source={{ uri: pokemon.image_url }}
                    />
                </View>
                <Text style={styles.pokemonName}>
                    {capitalize(pokemon.name)}
                </Text>
                <View style={styles.arrow}>
                    <ChevronRightIcon size={28} color="#fff" />
                </View>
            </View>
        </TouchableOpacity>
    );
}

const styles = EStyleSheet.create({
    container: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        paddingVertical: 20,
        paddingHorizontal: 10,
        borderBottomWidth: 1,
        borderBottomColor: "$mainAccent",
        borderBottomStyle: "solid",
        marginHorizontal: 10,
    },
    circle: {
        height: 100,
        width: 100,
        borderRadius: 50,
        borderWidth: 2,
        borderColor: "$mainText",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "rgba(255, 255, 255, 0.8)", // add this line
    },
    pokemonImage: {
        height: 96,
        width: 96,
    },
    pokemonName: {
        fontSize: 20,
        fontWeight: "bold",
        color: "$mainText",
        marginLeft: 20,
    },
    arrow: {
        marginLeft: "auto",
    },
});

export default PokedexItem;
