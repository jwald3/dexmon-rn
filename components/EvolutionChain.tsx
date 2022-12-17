import React, { useMemo } from "react";
import { View, Text, Dimensions, FlatList, Image } from "react-native";

interface Props {
    chain: {
        species: string;
        image_url: string;
        evolves_to: Array<{
            species: string;
            image_url: string;
            evolves_to: Array<{
                species: string;
                image_url: string;
                evolves_to: Array<{
                    species: string;
                    image_url: string;
                    evolves_to: [];
                }>;
            }>;
        }>;
    };
}

const EvolutionChain: React.FC<Props> = ({ chain }) => {
    const screenWidth = Dimensions.get("window").width;

    const data = useMemo(() => {
        const flattenChain = (
            chain: Props["chain"]["evolves_to"],
            level: number
        ): Array<{
            species: string;
            evolves_to: Array<any>;
            image_url: string;
            level: number;
        }> => {
            return chain.flatMap((evolution) => [
                { ...evolution, level },
                ...flattenChain(evolution.evolves_to, level + 1),
            ]);
        };

        return [{ ...chain, level: 0 }, ...flattenChain(chain.evolves_to, 1)];
    }, [chain.evolves_to]);

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
                    Evolution Chain
                </Text>
            </View>
            <View
                style={{
                    flex: 1,
                    width: "100%",
                    alignItems: "center",
                    justifyContent: "center",
                    backgroundColor: "rgba(255,255,255,0.10)",
                }}
            >
                <FlatList
                    data={data}
                    renderItem={({ item, index }) => {
                        const nextItem = data[index + 1];
                        return (
                            <View
                                style={{
                                    flex: 1,
                                    height: "100%",
                                    alignItems: "center",
                                    justifyContent: "space-around",
                                    display: "flex",
                                    flexDirection: "row",
                                }}
                            >
                                <View
                                    style={{
                                        alignItems: "center",
                                        marginHorizontal: 5,
                                        flex: 1,
                                    }}
                                >
                                    <Image
                                        style={{
                                            width: 75,
                                            height: 75,
                                        }}
                                        source={{ uri: item.image_url }}
                                    />
                                    <Text
                                        style={{
                                            color: "#F8F8FF",
                                            fontSize: 12,
                                        }}
                                    >
                                        {item.species}
                                    </Text>
                                </View>
                                {nextItem && nextItem.level === item.level && (
                                    <Text
                                        style={{
                                            color: "#F8F8FF",
                                            fontSize: 20,
                                        }}
                                    >
                                        OR
                                    </Text>
                                )}
                                {nextItem && nextItem.level > item.level && (
                                    <View
                                        style={{
                                            width: 15,
                                            height: 15,
                                            borderTopWidth: 2,
                                            borderRightWidth: 2,
                                            borderColor: "#F8F8FF",
                                            transform: [
                                                {
                                                    rotate: "45deg",
                                                },
                                            ],
                                        }}
                                    />
                                )}
                            </View>
                        );
                    }}
                    keyExtractor={(item) => item.species}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                />
            </View>
        </View>
    );
};

export default EvolutionChain;
