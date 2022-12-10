import {
    View,
    Text,
    FlatList,
    Image,
    StyleSheet,
    ActivityIndicator,
} from "react-native";
import React, { useState, useEffect } from "react";
import axios from "axios";

type BasePokemonResponse = {
    name: string;
    url: string;
    image_url?: string;
};

type UpdatedPokemonResponse = {
    name: string;
    url: string;
    image_url: string;
    id: number;
};

type RenderPokemon = {
    item: UpdatedPokemonResponse | BasePokemonResponse;
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
                    };
                }
            );

            // Append the new data to the existing data in the updatedPokemonList state
            setUpdatedPokemonList(
                updatedPokemonList.concat(await Promise.all(updatedList))
            );
        };
        fetchData();
    }, [currentPage]);

    const loadMoreItems = () => {
        setCurrentPage(currentPage + 1);
    };

    const renderItem = ({ item }: RenderPokemon) => {
        return (
            <View style={styles.itemWrapper}>
                <Image
                    style={styles.itemImage}
                    source={{ uri: item.image_url }}
                />
                <View style={styles.contentWrapper}>
                    <Text style={styles.textName}>{`${item.name}`}</Text>
                </View>
            </View>
        );
    };

    const renderLoader = () => {
        return isLoading ? (
            <View style={styles.loader}>
                <ActivityIndicator size="large" color="#aaa" />
            </View>
        ) : null;
    };

    return (
        <FlatList
            data={updatedPokemonList}
            renderItem={renderItem}
            keyExtractor={(item) => String(item.name)}
            ListFooterComponent={renderLoader}
            onEndReached={loadMoreItems}
            onEndReachedThreshold={0.2}
        />
    );
};

export default Home;

const styles = StyleSheet.create({
    itemWrapper: {
        flexDirection: "row",
        paddingHorizontal: 16,
        paddingVertical: 16,
        borderBottomWidth: 1,
        borderColor: "#ddd",
    },
    itemImage: {
        width: 50,
        height: 50,
        marginRight: 16,
    },
    contentWrapper: {
        justifyContent: "space-around",
    },
    textName: {
        fontSize: 16,
    },
    textEmail: {
        color: "#777",
    },
    loader: {
        marginVertical: 16,
        alignItems: "center",
    },
});
