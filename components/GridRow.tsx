import React from "react";
import { View, Dimensions, Platform } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { capitalize } from "../typescript/functions";
import GridItem from "./GridItem";
import EStyleSheet from "react-native-extended-stylesheet";
import { PokemonObject } from "../typescript/types";

interface RowProps {
    pokemon: PokemonObject;
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
                        value={pokemon.classification?.[0]?.genus}
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
                        value={pokemon.classification?.[0]?.genus}
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

const styles = EStyleSheet.create({
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
