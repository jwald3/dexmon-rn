import { View, Text, Image } from "react-native";
import React from "react";

interface GridItemProps {
    category: string;
    value: string;
    image: boolean;
}

const GridItem = ({ category, value, image }: GridItemProps) => {
    return (
        <View
            style={{
                flex: 1,
                alignItems: "center",
                marginHorizontal: 5,
                borderWidth: 1,
                borderColor: "rgba(255,255,255,0.50)",
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
                    paddingHorizontal: 5,
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
                    <Text style={{ color: "#fff" }}>{value}</Text>
                )}
            </View>
        </View>
    );
};

export default GridItem;
