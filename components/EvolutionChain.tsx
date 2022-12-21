import React, { useMemo } from "react";
import { View, Text, FlatList } from "react-native";
import EvolutionChainItem from "./EvolutionChainItem";
import EStyleSheet from "react-native-extended-stylesheet";

interface Props {
    chain: {
        species: {
            name: string;
            url: string;
        };
        image_url: string;
        evolves_to: Array<{
            species: {
                name: string;
                url: string;
            };
            image_url: string;
            evolves_to: Array<{
                species: {
                    name: string;
                    url: string;
                };
                image_url: string;
                evolves_to: Array<{
                    species: {
                        name: string;
                        url: string;
                    };
                    image_url: string;
                    evolves_to: [];
                }>;
            }>;
        }>;
    };
}

const EvolutionChain: React.FC<Props> = ({ chain }) => {
    const data = useMemo(() => {
        const flattenChain = (
            chain: Props["chain"]["evolves_to"],
            level: number
        ): Array<{
            species: {
                name: string;
                url: string;
            };
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
        <View style={styles.mainContainer}>
            <View style={styles.headerContainer}>
                <Text style={styles.headerText}>Evolution Chain</Text>
            </View>
            <View style={styles.containerBody}>
                <FlatList
                    data={data}
                    renderItem={({ item, index }) => {
                        const nextItem = data[index + 1];
                        return (
                            <View style={styles.chainItemWrapper}>
                                <EvolutionChainItem item={item.species} />
                                {nextItem && nextItem.level === item.level && (
                                    <Text style={styles.orText}>OR</Text>
                                )}
                                {nextItem && nextItem.level > item.level && (
                                    <View style={styles.arrow} />
                                )}
                            </View>
                        );
                    }}
                    keyExtractor={(item) => item.species.name}
                    horizontal
                    showsHorizontalScrollIndicator={true}
                />
            </View>
        </View>
    );
};

export default EvolutionChain;

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
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "rgba(255,255,255,0.10)",
        overflow: "hidden",
    },
    chainItemWrapper: {
        flex: 1,
        height: "100%",
        alignItems: "center",
        justifyContent: "space-around",
        display: "flex",
        flexDirection: "row",
    },
    orText: {
        color: "$mainText",
        fontSize: 20,
    },
    arrow: {
        width: 15,
        height: 15,
        borderTopWidth: 2,
        borderRightWidth: 2,
        borderColor: "$mainText",
        transform: [
            {
                rotate: "45deg",
            },
        ],
    },
});
