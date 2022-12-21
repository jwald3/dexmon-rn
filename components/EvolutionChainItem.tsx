import {
    View,
    Text,
    Image,
    TouchableOpacity,
    Dimensions,
    StyleSheet,
} from "react-native";
import React, { useLayoutEffect, useState } from "react";
import { capitalize } from "../typescript/functions";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

interface EvoItems {
    item: {
        name: string;
        url: string;
    };
}

export interface PokemonResponse {
    name: string;
}

export type RootStackParamList = {
    Poke: {
        pokemon: PokemonResponse;
    };
};

const EvolutionChainItem = ({ item }: EvoItems) => {
    const [imageUrl, setImageUrl] = useState("");

    const screenWidth = Dimensions.get("screen").width;

    const navigation =
        useNavigation<NativeStackNavigationProp<RootStackParamList, "Poke">>();

    useLayoutEffect(() => {
        axios
            .get(`https://pokeapi.co/api/v2/pokemon/${item.name}/`)
            .then((data) => setImageUrl(data.data.sprites.front_default));
    }, []);

    return imageUrl !== "" ? (
        <TouchableOpacity
            style={[
                styles.mainContainer,
                { minWidth: Math.min(screenWidth / 10, 85) },
            ]}
            onPress={() =>
                navigation.push("Poke", { pokemon: { name: item.name } })
            }
        >
            <Image style={styles.image} source={{ uri: imageUrl }} />
            <Text style={styles.imageCaption}>{capitalize(item.name)}</Text>
        </TouchableOpacity>
    ) : (
        <View></View>
    );
};

export default EvolutionChainItem;

const styles = StyleSheet.create({
    mainContainer: {
        alignItems: "center",
        marginHorizontal: 5,
        flex: 1,
        padding: 10,
    },
    image: {
        width: 75,
        height: 75,
    },
    imageCaption: {
        color: "#F8F8FF",
        fontSize: 12,
    },
});
