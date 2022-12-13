import React from "react";
import { View, Text, Image, Dimensions } from "react-native";
import GridItem from "./GridItem";

type UpdatedPoke = {
    name: string;
    url: string;
    image_url: string;
    id: number;
    types: [
        {
            type: {
                name: string;
                url: string;
            };
        }
    ];
    stats: [
        {
            base_stat: number;
            stat: {
                name: string;
                url: string;
            };
        }
    ];
    official_art: string;
    classification: Array<{
        genus: string;
        language: {
            name: string;
            url: string;
        };
    }>;
    flavor_text: Array<{
        flavor_text: string;
        language: {
            name: string;
            url: string;
        };
    }>;
    height: number;
    weight: number;
};

interface RowProps {
    pokemon: UpdatedPoke;
}

const GridRow = ({ pokemon }: RowProps) => {
    const screenWidth = Dimensions.get("screen").width;
    const gridRowMaxWidth = screenWidth * 0.9;

    return (
        <View
            style={{
                width: gridRowMaxWidth,
                height: 80,
                flexDirection: "row",
                justifyContent: "space-around",
                marginLeft: "auto",
                marginRight: "auto",
            }}
        >
            <GridItem
                category={"Classification"}
                value={pokemon.classification[0].genus}
                image={false}
            />
            <GridItem
                category={"Sprite"}
                value={pokemon.image_url}
                image={true}
            />
            <GridItem
                category={"Height"}
                value={`${pokemon.height / 10} m`}
                image={false}
            />
            <GridItem
                category={"Weight"}
                value={`${pokemon.weight / 10} kg`}
                image={false}
            />
            <GridItem category={"Type"} value={"Grass\nPoison"} image={false} />
        </View>
    );
};

export default GridRow;
