import React from "react";
import { View, Text, Image, Dimensions } from "react-native";

const GridRow: React.FC = () => {
    const screenWidth = Dimensions.get("screen").width;
    const gridRowMaxWidth = screenWidth * 0.9;

    return (
        <View
            style={{
                width: gridRowMaxWidth,
                height: 80,
                flexDirection: "row",
                justifyContent: "space-around",
                marginLeft: "auto",
                marginRight: "auto",
            }}
        >
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
                        Classification
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
                    <Text style={{ color: "#fff" }}>Seed Pokemon</Text>
                </View>
            </View>
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
                        Sprite
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
                    <Image
                        source={{
                            uri: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png",
                        }}
                        style={{ width: 48, height: 48 }}
                    />
                </View>
            </View>
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
                        Height
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
                    <Text style={{ color: "#fff" }}>0.7m</Text>
                </View>
            </View>
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
                        Weight
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
                    <Text style={{ color: "#fff" }}>6.9kg</Text>
                </View>
            </View>
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
                    <View style={{ backgroundColor: "rgba(255, 255, 255, 1" }}>
                        <Text
                            style={{
                                fontWeight: "bold",
                            }}
                        >
                            Type
                        </Text>
                    </View>
                </View>
                <View
                    style={{
                        flex: 1,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                    }}
                >
                    <Text style={{ color: "#fff" }}>Grass</Text>
                    <Text style={{ color: "#fff" }}>Poison</Text>
                </View>
            </View>
        </View>
    );
};

export default GridRow;
