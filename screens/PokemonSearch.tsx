import { View, Text } from "react-native";
import React from "react";
import Header from "../components/Header";

const PokemonSearch = () => {
    return (
        <View style={{ backgroundColor: "#383838", flex: 1 }}>
            <Header title="Search Pokemon" showBackButton={true} />
            <View>
                <Text style={{ color: "#fff" }}>Search Pokemon</Text>
            </View>
        </View>
    );
};

export default PokemonSearch;
