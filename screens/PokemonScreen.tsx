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
    flavor_text: {
        flavor_text: string;
        language: {
            name: string;
            url: string;
        };
    };
};

const PokemonScreen = () => {
    const {
        params: { pokemon },
    } = useRoute<RouteProp<RootStackParamList, "Pokemon">>();

    const [updatedPokemon, setUpdatedPokemon] = useState<UpdatedPoke>();

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
                };

                setUpdatedPokemon(newPoke);
            });
    }, []);

    console.log(updatedPokemon);

    return updatedPokemon ? (
        <LinearGradient
            colors={["#ebfaf5", "#85e0c2"]}
            style={styles.container}
        >
            <View style={styles.header}>
                <Text style={styles.title}>
                    {capitalize(updatedPokemon.name)}
                </Text>
                <Text>{updatedPokemon.classification[0].genus}</Text>
                <View style={styles.imageContainer}>
                    <View style={styles.circle}>
                        <View style={styles.innerCircle} />
                        <Image
                            style={styles.image}
                            source={{ uri: updatedPokemon.official_art }}
                            resizeMode="cover"
                        />
                    </View>
                </View>
            </View>
            <View style={styles.body}>
                <Text style={styles.subtitle}>Types:</Text>
                <View style={styles.typesContainer}>
                    {pokemon.types.map((type) => (
                        <View style={styles.type}>
                            <PokemonType type={type.type.name} />
                        </View>
                    ))}
                </View>

                <Text style={styles.subtitle}>Details:</Text>
            </View>
        </LinearGradient>
    ) : (
        <View></View>
    );
};

const styles = EStyleSheet.create({
    container: {
        flex: 1,
    },
    header: {
        alignItems: "center",
        paddingTop: 20,
        paddingBottom: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: "bold",
    },
    imageContainer: {
        position: "relative",
    },
    image: {
        width: 220,
        height: 220,
        alignSelf: "center",
    },
    circle: {
        width: 240,
        height: 240,
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
        backgroundColor: "rgba(255,255,255,0.55)",
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
