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
                shadowRadius: 10,
                shadowColor: "#000",
                shadowOpacity: 0.2,
                shadowOffset: { height: 2, width: 2 },
            }}
        >
            <View
                style={{
                    backgroundColor: "#42AD4A",
                    width: "100%",
                    justifyContent: "center",
                    alignItems: "center",
                }}
            >
                <Text
                    style={{
                        fontWeight: "bold",
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
