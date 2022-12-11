import * as React from "react";
import { View, Text, StyleSheet } from "react-native";

type Props = {
    type: string;
};

const PokemonType: React.FC<Props> = ({ type }) => {
    return (
        <View style={styles.container}>
            <Text style={styles.text}>{type}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 8,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: "#aaa",
        boxShadow: "0 0 2px #ccc",
        backgroundColor: "#6F35FC",
    },
    text: {
        fontSize: 14,
        textAlign: "center",
        color: "#fff",
    },
});

export default PokemonType;
