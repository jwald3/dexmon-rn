import { View, FlatList, StyleSheet, ActivityIndicator } from "react-native";
import React, { useState, useEffect } from "react";
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
};

type RenderPokemon = {
    item: UpdatedPokemonResponse;
};

const Home = () => {
    const [currentPage, setCurrentPage] = useState(0);
    const [isLoading, setIsLoading] = useState(false);
    const [updatedPokemonList, setUpdatedPokemonList] = useState<
        Array<UpdatedPokemonResponse>
    >([]);

    useEffect(() => {
        const fetchData = async () => {
            // Use the page value to set the offset and limit query parameters
            const response = await axios.get(
                `https://pokeapi.co/api/v2/pokemon?offset=${
                    currentPage * 20
                }&limit=20`
            );

            const updatedList = response.data.results.map(
                async (pokemon: BasePokemonResponse) => {
                    // Make an API call to the pokemon's url
                    const res = await axios.get(pokemon.url);

                    return {
                        name: pokemon.name,
                        url: pokemon.url,
                        image_url: res.data.sprites.front_default,
                        types: res.data.types,
                        stats: res.data.stats,
                        official_art:
                            res.data.sprites["other"]["official-artwork"]
                                .front_default,
                        id: res.data.id,
                    };
                }
            );

            // Append the new data to the existing data in the updatedPokemonList state
            setUpdatedPokemonList(
                updatedPokemonList.concat(await Promise.all(updatedList))
            );
        };
        setIsLoading(true);
        fetchData();
        setIsLoading(false);
    }, [currentPage]);

    const loadMoreItems = () => {
        setCurrentPage(currentPage + 1);
    };

    const renderItem = ({ item }: RenderPokemon) => {
        return <PokedexItem pokemon={item} />;
    };

    const renderLoader = () => {
        return isLoading ? (
            <View style={styles.loader}>
                <ActivityIndicator size="large" color="#aaa" />
            </View>
        ) : null;
    };

    return (
        <View style={styles.container}>
            <FlatList
                data={updatedPokemonList}
                initialNumToRender={20}
                renderItem={renderItem}
                keyExtractor={(item) => String(item.name)}
                ListFooterComponent={renderLoader}
                onEndReached={loadMoreItems}
                onEndReachedThreshold={0.2}
                removeClippedSubviews={true}
                maxToRenderPerBatch={20}
            />
        </View>
    );
};

export default Home;

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#383838", // pink
        flex: 1,
    },
    loader: {
        marginVertical: 16,
        alignItems: "center",
    },
});
