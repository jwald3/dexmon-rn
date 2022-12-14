import { View, Text, Image } from "react-native";
import React, { useEffect, useState } from "react";
import { PokemonResponse } from "../components/EvolutionChainItem";
import { useRoute, RouteProp } from "@react-navigation/native";
import axios from "axios";
import { ScrollView } from "react-native-gesture-handler";
import { capitalize } from "../typescript/functions";
import FlavorTextBox from "../components/FlavorTextBox";
import EvolutionChain from "../components/EvolutionChain";
import BarChart from "../components/BarChartWrapper";
import GridRow from "../components/GridRow";
import EStyleSheet from "react-native-extended-stylesheet";
import Header from "../components/Header";
import { PokemonObject } from "../typescript/types";

export type RootStackParamList = {
    Pokemon: {
        pokemon: PokemonResponse;
    };
};

const JustNamePokemonScreen = () => {
    const {
        params: { pokemon },
    } = useRoute<RouteProp<RootStackParamList, "Pokemon">>();

    const [updatedPokemon, setUpdatedPokemon] = useState<PokemonObject>();
    const [fullPokemonObj, setFullPokemonObj] = useState<PokemonObject>();

    useEffect(() => {
        axios
            .get(`https://pokeapi.co/api/v2/pokemon/${pokemon.name}`)
            .then((data) => {
                const updatedPoke = {
                    name: pokemon.name,
                    height: data.data.height,
                    weight: data.data.weight,
                    types: data.data.types,
                    official_art:
                        data.data.sprites["other"]["official-artwork"]
                            .front_default,
                    id: data.data.id,
                    stats: data.data.stats,
                    image_url: data.data.sprites.front_default,
                    classification: undefined,
                };

                setUpdatedPokemon(updatedPoke);
            });
    }, []);

    useEffect(() => {
        updatedPokemon &&
            axios
                .get(
                    `https://pokeapi.co/api/v2/pokemon-species/${updatedPokemon.id}`
                )
                .then((data) => {
                    const updatePoke = {
                        name: updatedPokemon.name,
                        image_url: updatedPokemon.image_url,
                        id: updatedPokemon.id,
                        types: updatedPokemon.types,
                        stats: updatedPokemon.stats,
                        official_art: updatedPokemon.official_art,
                        classification: data.data.genera,
                        flavor_text: data.data.flavor_text_entries,
                        height: updatedPokemon.height,
                        weight: updatedPokemon.weight,
                        chain: data.data.evolution_chain,
                        url: "",
                    };

                    const filteredClassification =
                        updatePoke.classification.filter(
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

                    // Handle the promise returned by the Axios call
                    axios.get(updatePoke.chain.url).then((data) => {
                        // Update the evolution_chain property with the data returned by the Axios call
                        updatePoke.chain = data.data.chain;

                        // Create the newPoke object with the updated evolution_chain property
                        const newPoke = {
                            name: updatePoke.name,
                            image_url: updatePoke.image_url,
                            id: updatePoke.id,
                            types: updatePoke.types,
                            stats: updatePoke.stats,
                            official_art: updatePoke.official_art,
                            classification: filteredClassification,
                            flavor_text: filteredText,
                            height: updatePoke.height,
                            weight: updatePoke.weight,
                            chain: updatePoke.chain,
                            url: updatePoke.url,
                        };

                        // Set the updatedPokemon state with the newPoke object
                        setFullPokemonObj(newPoke);
                    });
                });
    }, [updatedPokemon]);

    return fullPokemonObj ? (
        <View>
            <Header
                title="Pokemon"
                showBackButton={true}
                showSearchButton={true}
            />
            <ScrollView style={styles.mainContainer}>
                <View style={styles.container}>
                    <View style={styles.header}>
                        <Text style={styles.title}>
                            {capitalize(fullPokemonObj.name)}
                        </Text>
                        <View style={styles.imageContainer}>
                            <View style={styles.circle}>
                                <View style={styles.innerCircle} />
                                <Image
                                    style={styles.image}
                                    source={{
                                        uri: fullPokemonObj.official_art,
                                    }}
                                    resizeMode="contain"
                                />
                            </View>
                        </View>
                    </View>
                    <View
                        style={[
                            styles.componentWrapper,
                            {
                                marginTop: 0,
                                minHeight: 75,
                                height: 100,
                            },
                        ]}
                    >
                        <GridRow pokemon={fullPokemonObj} />
                    </View>
                    <View
                        style={[
                            styles.componentWrapper,
                            {
                                minHeight: 75,
                                height: 100,
                            },
                        ]}
                    >
                        <FlavorTextBox
                            text={fullPokemonObj.flavor_text?.[0].flavor_text}
                        />
                    </View>
                    {fullPokemonObj.chain !== undefined ? (
                        <View style={styles.componentWrapper}>
                            <EvolutionChain chain={fullPokemonObj.chain} />
                        </View>
                    ) : null}
                    <View style={styles.componentWrapper}>
                        <BarChart
                            stats={fullPokemonObj.stats.map((stat) => ({
                                name: stat.stat.name,
                                value: stat.base_stat,
                            }))}
                            maxX={200}
                        />
                    </View>
                </View>
            </ScrollView>
        </View>
    ) : (
        <View></View>
    );
};

const styles = EStyleSheet.create({
    mainContainer: {
        backgroundColor: "#383838",
        paddingVertical: 30,
    },
    container: {
        flex: 1,
        backgroundColor: "$mainDark",
        paddingBottom: 180,
    },
    header: {
        alignItems: "center",
        paddingTop: 20,
        paddingBottom: 20,
        color: "$mainText",
    },
    title: {
        fontSize: 24,
        fontWeight: "bold",
        color: "$mainText",
    },
    subtitleText: {
        fontSize: 16,
        color: "$mainText",
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
    componentWrapper: {
        width: "90%",
        marginLeft: "auto",
        marginRight: "auto",
        marginTop: 50,
        height: 215,
    },
});

export default JustNamePokemonScreen;
