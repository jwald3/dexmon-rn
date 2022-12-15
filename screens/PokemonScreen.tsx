import { View, Text, Image, StyleSheet } from "react-native";
import { useNavigation, useRoute, RouteProp } from "@react-navigation/native";
import React, { useState, useEffect } from "react";
import { UpdatedPokemonResponse } from "./Home";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { LinearGradient } from "expo-linear-gradient";
import { capitalize } from "../typescript/functions";
import axios from "axios";
import PokemonType from "../components/PokemonType";
import EStyleSheet from "react-native-extended-stylesheet";
import GridRow from "../components/GridRow";
import FlavorTextBox from "../components/FlavorTextBox";
import BarChart from "../components/BarChartWrapper";
import { ScrollView } from "react-native-gesture-handler";

export type RootStackParamList = {
    Pokemon: {
        pokemon: UpdatedPokemonResponse;
    };
};

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

const PokemonScreen = () => {
    const {
        params: { pokemon },
    } = useRoute<RouteProp<RootStackParamList, "Pokemon">>();

    const [updatedPokemon, setUpdatedPokemon] = useState<UpdatedPoke>();

    console.log(updatedPokemon);

    useEffect(() => {
        axios
            .get(`https://pokeapi.co/api/v2/pokemon-species/${pokemon.id}`)
            .then((data) => {
                const updatePoke = {
                    name: pokemon.name,
                    url: pokemon.url,
                    image_url: pokemon.image_url,
                    id: pokemon.id,
                    types: pokemon.types,
                    stats: pokemon.stats,
                    official_art: pokemon.official_art,
                    classification: data.data.genera,
                    flavor_text: data.data.flavor_text_entries,
                    height: pokemon.height,
                    weight: pokemon.weight,
                };

                const filteredClassification = updatePoke.classification.filter(
                    (classification: {
                        genus: string;
                        language: { name: string };
                    }) => classification.language.name === "en"
                );

                const filteredText = updatePoke.flavor_text.filter(
                    (text: {
                        flavor_text: string;
                        language: { name: string };
                    }) => text.language.name === "en"
                );

                const newPoke = {
                    name: updatePoke.name,
                    url: updatePoke.url,
                    image_url: updatePoke.image_url,
                    id: updatePoke.id,
                    types: updatePoke.types,
                    stats: updatePoke.stats,
                    official_art: updatePoke.official_art,
                    classification: filteredClassification,
                    flavor_text: filteredText,
                    height: updatePoke.height,
                    weight: updatePoke.weight,
                };

                setUpdatedPokemon(newPoke);
            });
    }, []);

    return updatedPokemon ? (
        <ScrollView style={{ backgroundColor: "#383838", paddingVertical: 30 }}>
            <View style={styles.container}>
                <View style={styles.header}>
                    <Text style={styles.title}>
                        {capitalize(updatedPokemon.name)}
                    </Text>
                    <View style={styles.imageContainer}>
                        <View style={styles.circle}>
                            <View style={styles.innerCircle} />
                            <Image
                                style={styles.image}
                                source={{ uri: updatedPokemon.official_art }}
                                resizeMode="contain"
                            />
                        </View>
                    </View>
                </View>
                <View
                    style={{
                        width: "90%",
                        marginLeft: "auto",
                        marginRight: "auto",
                    }}
                >
                    <GridRow pokemon={updatedPokemon} />
                </View>
                <View
                    style={{
                        width: "90%",
                        marginLeft: "auto",
                        marginRight: "auto",
                        marginTop: 50,
                        minHeight: 75,
                        height: 100,
                    }}
                >
                    <FlavorTextBox
                        text={updatedPokemon.flavor_text[0].flavor_text}
                    />
                </View>
                <View
                    style={{
                        width: "100%",
                        marginLeft: "auto",
                        marginRight: "auto",
                        marginTop: 50,
                        height: 215,
                    }}
                >
                    <BarChart
                        stats={[
                            { name: "hp", value: 100 },
                            { name: "atk", value: 200 },
                            { name: "def", value: 50 },
                            { name: "spa", value: 100 },
                            { name: "spd", value: 20 },
                            { name: "spe", value: 100 },
                        ]}
                        maxX={200}
                    />
                </View>
            </View>
        </ScrollView>
    ) : (
        <View></View>
    );
};

const styles = EStyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#383838",
        paddingBottom: 60,
    },
    header: {
        alignItems: "center",
        paddingTop: 20,
        paddingBottom: 20,
        color: "#fff",
    },
    title: {
        fontSize: 24,
        fontWeight: "bold",
        color: "#fff",
    },
    subtitleText: {
        fontSize: 16,
        color: "#fff",
    },
    imageContainer: {
        position: "relative",
    },
    image: {
        width: 220,
        height: 220,
        alignSelf: "start",
        marginLeft: 10,
        marginTop: 10,
    },
    circle: {
        width: 250,
        height: 250,
        borderRadius: 120,
        // borderWidth: 2,
        // borderColor: "#333",
        overflow: "hidden",
        position: "relative",
    },
    innerCircle: {
        width: 200,
        height: 200,
        borderRadius: 100,
        backgroundColor: "rgba(255,255,255,0.50)",
        position: "absolute",
        top: 20,
        left: 20,
        boxShadow: "0 0 8px #333",
        shadowColor: "#000",
        shadowOffset: { width: -2, height: -2 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
        elevation: 1,
    },
    body: {
        padding: 20,
        maxWidth: 1000,
        width: 500,
        marginLeft: "auto",
        marginRight: "auto",
    },
    typesContainer: {
        maxWidth: 500,
        flex: 1,
        flexDirection: "row",
        marginLeft: "auto",
        marginRight: "auto",
    },
    subtitle: {
        fontSize: 18,
        fontWeight: "bold",
        marginTop: 10,
        marginBottom: 10,
        alignSelf: "center",
    },
    type: {
        padding: 5,
        margin: 5,
        borderRadius: 10,
        backgroundColor: "#ccc",
    },
});

export default PokemonScreen;
