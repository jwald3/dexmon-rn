import { View, Text } from "react-native";
import React from "react";
import EStyleSheet from "react-native-extended-stylesheet";

interface FlavorTextProps {
    text: string | undefined;
}

const FlavorTextBox = ({ text }: FlavorTextProps) => {
    return (
        <View style={styles.mainContainer}>
            <View style={styles.headerContainer}>
                <Text style={styles.headerText}>Flavor Text</Text>
            </View>
            <View style={styles.containerBody}>
                <Text style={styles.containerText}>
                    {text?.split("\n").join(" ").replace("\f", " ")}
                </Text>
            </View>
        </View>
    );
};

export default FlavorTextBox;

const styles = EStyleSheet.create({
    mainContainer: {
        flex: 1,
        alignItems: "center",
        marginHorizontal: 5,
        borderWidth: 1,
        borderColor: "rgba(255,255,255,0.50)",
        borderRadius: 3,
        width: "100%",
    },
    headerContainer: {
        backgroundColor: "$mainAccent",
        width: "100%",
        justifyContent: "center",
        alignItems: "center",
        paddingVertical: 3,
    },
    headerText: {
        fontWeight: "bold",
        color: "$mainText",
    },
    containerBody: {
        flex: 1,
        width: "100%",
        paddingHorizontal: 10,
        justifyContent: "center",
        backgroundColor: "rgba(255,255,255,0.10)",
    },
    containerText: {
        color: "$mainText",
        textAlign: "center",
    },
});
