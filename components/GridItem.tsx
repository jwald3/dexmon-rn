import { View, Text, Image, Dimensions } from "react-native";
import React from "react";

interface GridItemProps {
    category: string;
    value: string;
    image: boolean;
}

const GridItem = ({ category, value, image }: GridItemProps) => {
    const screenWidth = Dimensions.get("screen").width;
    const gridRowMaxWidth = screenWidth * 0.9;

    return (
        <View
            style={{
                flex: 1,
                minWidth: Math.max(gridRowMaxWidth * 0.16 - 35, 120),
                alignItems: "center",
                marginHorizontal: 5,
                borderWidth: 1,
                borderColor: "rgba(255,255,255,0.50)",
                borderRadius: 3,
                maxWidth: Math.max(gridRowMaxWidth * 0.16 - 35, 150),
                // background color must be set
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
                    {category}
                </Text>
            </View>
            <View
                style={{
                    flex: 1,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    backgroundColor: "rgba(255,255,255,0.10)",
                    width: "100%",
                }}
            >
                {image === true ? (
                    <>
                        <Image
                            source={{ uri: value }}
                            style={{ width: 48, height: 48 }}
                        />
                    </>
                ) : (
                    <Text style={{ color: "#fff", paddingHorizontal: 5 }}>
                        {value}
                    </Text>
                )}
            </View>
        </View>
    );
};

export default GridItem;
