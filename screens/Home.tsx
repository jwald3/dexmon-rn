import { View, FlatList, ActivityIndicator } from "react-native";
import React, { useState, useEffect } from "react";
import axios from "axios";
import PokedexItem from "../components/PokedexItem";
import Header from "../components/Header";
import EStyleSheet from "react-native-extended-stylesheet";
import { PokemonObject } from "../typescript/types";

type BasePokemonResponse = {
    name: string;
    url: string;
};

type RenderPokemon = {
    item: PokemonObject;
};

const Home = () => {
    const [currentPage, setCurrentPage] = useState(0);
    const [isLoading, setIsLoading] = useState(false);
    const [updatedPokemonList, setUpdatedPokemonList] = useState<
        Array<PokemonObject>
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
                        height: res.data.height,
                        weight: res.data.weight,
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
            <Header
                title="Dexmon"
                showBackButton={false}
                showSearchButton={true}
            />
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

const styles = EStyleSheet.create({
    container: {
        backgroundColor: "$mainDark",
        flex: 1,
    },
    loader: {
        marginVertical: 16,
        alignItems: "center",
    },
});
