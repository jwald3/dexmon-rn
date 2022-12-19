import { View, Text, FlatList } from "react-native";
import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import pokeData from "../data/PokemonData.json";
import PokedexItem from "../components/PokedexItem";
import { UpdatedPokemonResponse } from "./Home";

interface BasicPokemonData {
    name: string;
    url: string;
    image_url: string;
}

type RenderPokemon = {
    item: BasicPokemonData;
};

const PokemonSearch = () => {
    const [allPokemon, setAllPokemon] =
        useState<Array<BasicPokemonData>>(pokeData);

    const [filteredPokemon, setFilteredPokemon] =
        useState<Array<BasicPokemonData>>(pokeData);
    const [searchQuery, setSearchQuery] = useState("Char");

    useEffect(() => {
        if (searchQuery.length >= 1) {
            const poke = allPokemon.filter((pkmn) =>
                pkmn.name.toLowerCase().includes("char")
            );
            setFilteredPokemon(poke);
        }
    }, [searchQuery]);

    const renderItem = ({ item }: RenderPokemon) => {
        return (
            <PokedexItem
                pokemon={{
                    name: item.name,
                    url: item.url,
                    image_url: item.image_url,
                    id: 1,
                    types: [
                        {
                            type: {
                                name: "string",
                                url: "string",
                            },
                        },
                    ],
                    stats: [
                        {
                            base_stat: 1,
                            stat: {
                                name: "string",
                                url: "string",
                            },
                        },
                    ],
                    official_art: "string",
                    height: 1,
                    weight: 1,
                }}
            />
        );
    };

    return (
        <View style={{ backgroundColor: "#383838", flex: 1 }}>
            <Header title="Search Pokemon" showBackButton={true} />
            <View>
                <Text style={{ color: "#fff" }}>Search Pokemon</Text>
                <FlatList
                    data={filteredPokemon}
                    initialNumToRender={20}
                    renderItem={renderItem}
                    keyExtractor={(item) => String(item.name)}
                    removeClippedSubviews={true}
                    maxToRenderPerBatch={20}
                    contentContainerStyle={{ paddingBottom: 200 }}
                />
            </View>
        </View>
    );
};

export default PokemonSearch;
