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
            chain: Props["chain"]["evolves_to"]
        ): Array<{
            species: string;
            evolves_to: Array<any>;
            image_url: string;
        }> => {
            return chain.flatMap((evolution) => [
                evolution,
                ...flattenChain(evolution.evolves_to),
            ]);
        };

        return [chain, ...flattenChain(chain.evolves_to)];
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
                    justifyContent: "center",
                    backgroundColor: "rgba(255,255,255,0.10)",
                }}
            >
                <FlatList
                    data={data}
                    renderItem={({ item }) => (
                        <View
                            style={{
                                width: (screenWidth * 0.9) / data.length - 20,
                                height: "100%",
                                alignItems: "center",
                                justifyContent: "center",
                                display: "flex",
                            }}
                        >
                            <Image
                                style={{
                                    width: 100,
                                    height: 100,
                                }}
                                source={{ uri: item.image_url }}
                                resizeMode="contain"
                            />
                            <Text style={{ color: "#f8f8ff" }}>
                                {item.species}
                            </Text>
                        </View>
                    )}
                    keyExtractor={(item) => item.species}
                    contentContainerStyle={{
                        flexDirection: "row",
                        width: "100%",
                        height: "100%",
                        justifyContent: "space-between",
                    }}
                />
            </View>
        </View>
    );
};

export default EvolutionChain;
