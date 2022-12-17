import { View, Text, Image } from "react-native";
import React, { useEffect, useLayoutEffect, useState } from "react";
import { capitalize } from "../typescript/functions";
import axios from "axios";

interface EvoItems {
    item: {
        name: string;
        url: string;
    };
}

const EvolutionChainItem = ({ item }: EvoItems) => {
    const [imageUrl, setImageUrl] = useState("");

    useLayoutEffect(() => {
        axios
            .get(`https://pokeapi.co/api/v2/pokemon/${item.name}/`)
            .then((data) => setImageUrl(data.data.sprites.front_default));
    }, []);

    console.log(imageUrl);

    return imageUrl !== "" ? (
        <View
            style={{
                alignItems: "center",
                marginHorizontal: 5,
                flex: 1,
            }}
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
        </View>
    ) : (
        <View></View>
    );
};

export default EvolutionChainItem;
