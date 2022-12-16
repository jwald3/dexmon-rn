import { View, Text, Dimensions } from "react-native";
import React from "react";

interface FlavorTextProps {
    text: string;
}

const FlavorTextBox = ({ text }: FlavorTextProps) => {
    const screenWidth = Dimensions.get("screen").width;
    const gridRowMaxWidth = screenWidth * 0.9;

    return (
        <View
            style={{
                flex: 1,
                alignItems: "center",
                marginHorizontal: 5,
                borderWidth: 1,
                borderColor: "rgba(255,255,255,0.50)",
                borderRadius: 3,
                width: "100%",
            }}
        >
            <View
                style={{
                    backgroundColor: "#42AD4A",
                    width: "100%",
                    justifyContent: "center",
                    alignItems: "center",
                    paddingVertical: 3,
                }}
            >
                <Text
                    style={{
                        fontWeight: "bold",
                        color: "#F8F8FF",
                    }}
                >
                    Flavor Text
                </Text>
            </View>
            <View
                style={{
                    flex: 1,
                    width: "100%",
                    paddingHorizontal: 10,
                    justifyContent: "center",
                    backgroundColor: "rgba(255,255,255,0.10)",
                }}
            >
                <Text
                    style={{
                        color: "#fff",
                        textAlign: "center",
                    }}
                >
                    {text.split("\n").join(" ").replace("\f", " ")}
                </Text>
            </View>
        </View>
    );
};

export default FlavorTextBox;
