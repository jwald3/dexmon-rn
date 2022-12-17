import { View, Text, Image, TouchableOpacity, Dimensions } from "react-native";
import React, { useEffect, useLayoutEffect, useState } from "react";
import { capitalize } from "../typescript/functions";
import axios from "axios";
import { UpdatedPokemonResponse } from "../screens/Home";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

interface EvoItems {
    item: {
        name: string;
        url: string;
    };
}

export type RootStackParamList = {
    Pokemon: {
        pokemon: UpdatedPokemonResponse;
    };
};

const EvolutionChainItem = ({ item }: EvoItems) => {
    const [imageUrl, setImageUrl] = useState("");

    const screenWidth = Dimensions.get("screen").width;

    const navigation =
        useNavigation<
            NativeStackNavigationProp<RootStackParamList, "Pokemon">
        >();

    useLayoutEffect(() => {
        axios
            .get(`https://pokeapi.co/api/v2/pokemon/${item.name}/`)
            .then((data) => setImageUrl(data.data.sprites.front_default));
    }, []);

    console.log(imageUrl);

    return imageUrl !== "" ? (
        <TouchableOpacity
            style={{
                alignItems: "center",
                marginHorizontal: 5,
                flex: 1,
                minWidth: screenWidth / 5,
            }}
            // onPress={() => navigation.navigate("Pokemon", {})}
        >
            <Image
                style={{
                    width: 75,
                    height: 75,
                }}
                source={{ uri: imageUrl }}
            />
            <Text
                style={{
                    color: "#F8F8FF",
                    fontSize: 12,
                }}
            >
                {capitalize(item.name)}
            </Text>
        </TouchableOpacity>
    ) : (
        <View></View>
    );
};

export default EvolutionChainItem;
