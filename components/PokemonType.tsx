import * as React from "react";
import { View, Text } from "react-native";
import EStyleSheet from "react-native-extended-stylesheet";

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

const styles = EStyleSheet.create({
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
        color: "$mainText",
    },
});

export default PokemonType;
