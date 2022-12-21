import {
    View,
    Text,
    FlatList,
    TextInput,
    TouchableWithoutFeedback,
    Keyboard,
    Platform,
} from "react-native";
import React, { useEffect, useRef, useState } from "react";
import Header from "../components/Header";
import pokeData from "../data/PokemonData.json";
import PokedexItem from "../components/PokedexItem";
import { MagnifyingGlassIcon } from "react-native-heroicons/outline";
import EStyleSheet from "react-native-extended-stylesheet";
import { ScrollView } from "react-native-gesture-handler";

interface BasicPokemonData {
    name: string;
    url: string;
    image_url: string;
}

type RenderPokemon = {
    item: BasicPokemonData;
};

const PokemonSearch = () => {
    const [allPokemon] = useState<Array<BasicPokemonData>>(pokeData);

    const [filteredPokemon, setFilteredPokemon] = useState<
        Array<BasicPokemonData>
    >([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [messageText, setMessageText] = useState(
        "Begin searching Pokemon by typing a name"
    );

    const textInputRef = useRef<TextInput>(null);

    const handlePress = () => {
        if (Platform.OS !== "web") {
            if (textInputRef.current && textInputRef.current.isFocused()) {
                Keyboard.dismiss();
            }
        }
    };

    const [inputIsFocused, setInputIsFocused] = useState(false);

    useEffect(() => {
        if (searchQuery.length >= 2) {
            const poke = allPokemon.filter((pkmn) => {
                return pkmn.name
                    .toLowerCase()
                    .includes(searchQuery.toLowerCase());
            });
            if (poke.length === 0) {
                setMessageText(
                    `No Pokemon found with a name containing "${searchQuery}"`
                );
            } else {
                setFilteredPokemon(poke);
                setMessageText("");
            }
        } else if (searchQuery === "") {
            setFilteredPokemon([]);
            setMessageText("Begin searching Pokemon by typing a name");
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
        <TouchableWithoutFeedback onPress={handlePress}>
            <View style={styles.mainContainer}>
                <Header
                    title="Search Pokemon"
                    showBackButton={true}
                    showSearchButton={false}
                />

                <View style={styles.headerContainer}>
                    <View style={styles.subHeaderContainer}>
                        <MagnifyingGlassIcon color="#fff" size={20} />
                        <TextInput
                            ref={textInputRef}
                            placeholder="Search Pokemon by name"
                            keyboardType="default"
                            value={searchQuery}
                            onChangeText={(val) => setSearchQuery(val)}
                            style={styles.searchTextInput}
                        />
                    </View>
                </View>

                {messageText === "" ? (
                    <ScrollView>
                        <FlatList
                            data={filteredPokemon}
                            initialNumToRender={20}
                            renderItem={renderItem}
                            keyExtractor={(item) => String(item.name)}
                            removeClippedSubviews={true}
                            maxToRenderPerBatch={20}
                            contentContainerStyle={{ paddingBottom: 200 }}
                        />
                    </ScrollView>
                ) : (
                    <View style={styles.messageTextContainer}>
                        <Text style={styles.messageText}>{messageText}</Text>
                    </View>
                )}
            </View>
        </TouchableWithoutFeedback>
    );
};

export default PokemonSearch;

const styles = EStyleSheet.create({
    mainContainer: {
        backgroundColor: "$mainDark",
        flex: 1,
    },
    headerContainer: {
        backgroundColor: "$mainAccent",
    },
    subHeaderContainer: {
        display: "flex",
        flexDirection: "row",
        padding: 3,
        alignItems: "center",
        justifyContent: "space-around",
        width: "80%",
        marginLeft: "auto",
        marginRight: "auto",
        height: 50,
    },
    searchTextInput: {
        color: "$mainDark",
        flex: 1,
        marginLeft: 8,
        backgroundColor: "rgba(255, 255, 255, 0.5)",
        padding: 8,
        borderRadius: 3,
        paddingLeft: 8,
    },
    messageTextContainer: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        marginTop: "auto",
        marginBottom: "auto",
        height: "auto",
    },
    messageText: {
        color: "rgba(255, 255, 255, 0.7)",
    },
});
