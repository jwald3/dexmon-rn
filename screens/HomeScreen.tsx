import {
    View,
    Text,
    Image,
    StyleSheet,
    FlatList,
    ScrollView,
} from "react-native";
import React, { useEffect, useState } from "react";
import axios from "axios";
import PokedexItem from "../components/PokedexItem";

type BasePokemonResponse = {
    name: string;
    url: string;
};

export type UpdatedPokemonResponse = {
    name: string;
    url: string;
    image_url: string;
};

const HomeScreen = () => {
    const [pokemonList, setPokemonList] = useState<Array<BasePokemonResponse>>(
        []
    );
    const [updatedPokemonList, setUpdatedPokemonList] = useState<
        Array<UpdatedPokemonResponse>
    >([]);

    useEffect(() => {
        const fetchData = async () => {
            const response = await axios.get(
                "https://pokeapi.co/api/v2/pokemon"
            );

            setPokemonList(response.data.results);
        };
        fetchData();
    }, []);

    useEffect(() => {
        pokemonList.forEach((pokemon) =>
            axios.get(pokemon.url).then((data) => {
                setUpdatedPokemonList((prev) => [
                    ...prev,
                    {
                        name: pokemon.name,
                        url: pokemon.url,
                        image_url: data.data.sprites.front_default,
                    },
                ]);
            })
        );
    }, [pokemonList]);

    return (
        <View style={styles.container}>
            <ScrollView
                contentContainerStyle={{
                    flexGrow: 1,
                    marginTop: 10,
                }}
            >
                <FlatList
                    data={updatedPokemonList}
                    renderItem={({ item }) => <PokedexItem pokemon={item} />}
                />
            </ScrollView>
        </View>
    );
};

export default HomeScreen;

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#F1948A", // pink
        backgroundImage: "linear-gradient(to right, #F1948A, #FADBD8)", // gradient
        flex: 1,
    },
});
