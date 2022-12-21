import React from "react";
import {
    View,
    Text,
    Image,
    Dimensions,
    Platform,
    StyleSheet,
} from "react-native";
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
        <View style={styles.mainContainer}>
            {Platform.OS !== "web" ? (
                <ScrollView
                    horizontal={true}
                    contentContainerStyle={[
                        styles.scrollView,
                        { minWidth: gridRowMaxWidth },
                    ]}
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
                <View style={styles.webViewContainer}>
                    <GridItem
                        category={"Classification"}
                        value={pokemon.classification[0].genus}
                        image={false}
                    />
                    <View style={styles.webGaps} />
                    <GridItem
                        category={"Sprite"}
                        value={pokemon.image_url}
                        image={true}
                    />
                    <View style={styles.webGaps} />
                    <GridItem
                        category={"Height"}
                        value={`${pokemon.height / 10} m`}
                        image={false}
                    />
                    <View style={styles.webGaps} />
                    <GridItem
                        category={"Weight"}
                        value={`${pokemon.weight / 10} kg`}
                        image={false}
                    />
                    <View style={styles.webGaps} />
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

const styles = StyleSheet.create({
    mainContainer: {
        width: "100%",
        marginLeft: "auto",
        marginRight: "auto",
    },
    scrollView: {
        height: 100,
    },
    webViewContainer: {
        display: "flex",
        flexDirection: "row",
        width: "100%",
        height: 100,
        justifyContent: "space-between",
        minWidth: 600,
    },
    webGaps: {
        marginHorizontal: 5,
    },
});
