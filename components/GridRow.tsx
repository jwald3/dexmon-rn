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
    flavor_text: {
        flavor_text: string;
        language: {
            name: string;
            url: string;
        };
    };
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
            <View
                style={{
                    flex: 1,
                    alignItems: "center",
                    marginHorizontal: 5,
                    shadowRadius: 10,
                    shadowColor: "#000",
                    shadowOpacity: 0.2,
                    shadowOffset: { height: 2, width: 2 },
                }}
            >
                <View
                    style={{
                        backgroundColor: "#42AD4A",
                        width: "100%",
                        justifyContent: "center",
                        alignItems: "center",
                    }}
                >
                    <Text
                        style={{
                            fontWeight: "bold",
                        }}
                    >
                        Sprite
                    </Text>
                </View>
                <View
                    style={{
                        flex: 1,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                    }}
                >
                    <Image
                        source={{
                            uri: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png",
                        }}
                        style={{ width: 48, height: 48 }}
                    />
                </View>
            </View>
            <GridItem
                category={"Height"}
                value={pokemon.classification[0].genus}
                image={false}
            />
            <GridItem
                category={"Weight"}
                value={pokemon.classification[0].genus}
                image={false}
            />
            <GridItem
                category={"Type"}
                value={pokemon.classification[0].genus}
                image={false}
            />
        </View>
    );
};

export default GridRow;
