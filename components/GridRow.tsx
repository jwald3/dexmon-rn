import React from "react";
import { View, Text, Image, Dimensions, Platform } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { capitalize } from "../typescript/functions";
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
        // <View
        //     style={{
        //         width: gridRowMaxWidth,
        //         height: 80,
        //         flexDirection: "row",
        //         justifyContent: "space-around",
        //         marginLeft: "auto",
        //         marginRight: "auto",
        //     }}
        // >
        <View
            style={{
                width: "100%",
                marginLeft: "auto",
                marginRight: "auto",
            }}
        >
            {Platform.OS !== "web" ? (
                <ScrollView
                    horizontal={true}
                    contentContainerStyle={{
                        height: 100,
                        minWidth: gridRowMaxWidth,
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
                    <GridItem
                        category={"Type"}
                        value={pokemon.types
                            .map((type) => type.type.name)
                            .map((type) => capitalize(type))
                            .join("\n")}
                        image={false}
                    />
                </ScrollView>
            ) : (
                <View
                    style={{
                        display: "flex",
                        flexDirection: "row",
                        width: "100%",
                        height: 100,
                        justifyContent: "space-between",
                        minWidth: 600,
                    }}
                >
                    <GridItem
                        category={"Classification"}
                        value={pokemon.classification[0].genus}
                        image={false}
                    />
                    <View style={{ marginHorizontal: 5 }} />
                    <GridItem
                        category={"Sprite"}
                        value={pokemon.image_url}
                        image={true}
                    />
                    <View style={{ marginHorizontal: 5 }} />
                    <GridItem
                        category={"Height"}
                        value={`${pokemon.height / 10} m`}
                        image={false}
                    />
                    <View style={{ marginHorizontal: 5 }} />
                    <GridItem
                        category={"Weight"}
                        value={`${pokemon.weight / 10} kg`}
                        image={false}
                    />
                    <View style={{ marginHorizontal: 5 }} />
                    <GridItem
                        category={"Type"}
                        value={pokemon.types
                            .map((type) => type.type.name)
                            .map((type) => capitalize(type))
                            .join("\n")}
                        image={false}
                    />
                </View>
            )}
        </View>
    );
};

export default GridRow;
