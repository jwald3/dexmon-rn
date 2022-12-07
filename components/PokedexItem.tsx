import React from "react";
import { View, Image, Text, StyleSheet } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { UpdatedPokemonResponse } from "../screens/HomeScreen";
import { ChevronRightIcon } from "react-native-heroicons/outline";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

interface PokedexItemProps {
    pokemon: UpdatedPokemonResponse;
}

export type RootStackParamList = {
    Pokemon: undefined;
};

function PokedexItem({ pokemon }: PokedexItemProps) {
    const navigation =
        useNavigation<
            NativeStackNavigationProp<RootStackParamList, "Pokemon">
        >();

    return (
        <TouchableOpacity onPress={() => navigation.navigate("Pokemon")}>
            <View style={styles.container}>
                <View style={styles.circle}>
                    <Image
                        style={styles.pokemonImage}
                        source={{ uri: pokemon.image_url }}
                    />
                </View>
                <Text style={styles.pokemonName}>{pokemon.name}</Text>
                <View style={styles.arrow}>
                    <ChevronRightIcon size={28} color="#fff" />
                </View>
            </View>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        paddingVertical: 20,
        paddingHorizontal: 10,
        borderBottomWidth: 1,
        borderBottomColor: "#fff",
        borderBottomStyle: "solid",
        marginHorizontal: 10,
    },
    circle: {
        height: 100,
        width: 100,
        borderRadius: 50,
        borderWidth: 2,
        borderColor: "#fff",
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
        color: "#fff",
        marginLeft: 20,
    },
    arrow: {
        marginLeft: "auto",
    },
});

export default PokedexItem;
