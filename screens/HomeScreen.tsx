import { View, Text, Image } from "react-native";
import React, { useEffect, useState } from "react";
import axios from "axios";

type BasePokemonResponse = {
    name: string;
    url: string;
};

type UpdatedPokemonResponse = {
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
        <View>
            {updatedPokemonList.map((pokemon) => (
                <View key={pokemon.name}>
                    <Text>{pokemon.name}</Text>
                    <Image
                        source={{ uri: pokemon.image_url }}
                        style={{ height: 50, width: 50 }}
                    />
                </View>
            ))}
        </View>
    );
};

export default HomeScreen;
