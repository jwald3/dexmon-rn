import React from "react";
import { View, Text, StyleSheet } from "react-native";

interface Stats {
    name: string;
    value: number;
}

interface Props {
    stats: Stats[];
    maxX: number;
}

const BarChart = (props: Props) => {
    const { stats, maxX } = props;

    const statAbbrevs = {
        hp: "HP",
        attack: "ATK",
        defense: "DEF",
        "special-attack": "SpA",
        "special-defense": "SpD",
        speed: "SPE",
    };

    const statColors = {
        hp: "#FF5959",
        attack: "#F5AC78",
        defense: "#FAE078",
        "special-attack": "#9DB7F5",
        "special-defense": "#A7DB8D",
        speed: "#FA92B2",
    };

    return (
        <View style={styles.chartContainer}>
            <View style={styles.chartTitleContainer}>
                <Text style={styles.chartTitleText}>Stats</Text>
            </View>
            <View style={styles.chartBody}>
                {stats.map((stat, index) => (
                    <View key={stat.name} style={styles.chartRowContainer}>
                        <View style={styles.chartStatLabelContainer}>
                            <Text style={styles.chartStatLabelText}>
                                {stat.name.replace(
                                    stat.name,
                                    (m) =>
                                        statAbbrevs[
                                            m as keyof typeof statAbbrevs
                                        ]
                                )}
                                :
                            </Text>
                        </View>

                        <View style={styles.chartRowBody}>
                            <View
                                style={{
                                    width:
                                        Math.min(
                                            (stat.value / maxX) * 100,
                                            100
                                        ) + "%",
                                    height: 20,
                                    backgroundColor: stat.name.replace(
                                        stat.name,
                                        (m) =>
                                            statColors[
                                                m as keyof typeof statColors
                                            ]
                                    ),
                                }}
                            >
                                {stat.value >= 20 && (
                                    <Text style={styles.textOnBar}>
                                        {stat.value}
                                    </Text>
                                )}
                            </View>
                            {stat.value < 20 && (
                                <Text style={styles.textBesideBar}>
                                    {stat.value}
                                </Text>
                            )}
                        </View>
                    </View>
                ))}
            </View>
        </View>
    );
};

export default BarChart;

const styles = StyleSheet.create({
    chartContainer: {
        backgroundColor: "rgba(255,255,255,0.10)",
        width: "100%",
        marginLeft: "auto",
        marginRight: "auto",
        borderWidth: 1,
        borderColor: "rgba(255,255,255,0.50)",
        borderRadius: 3,
        flex: 1,
        justifyContent: "center",
    },
    chartTitleContainer: {
        backgroundColor: "#42AD4A",
        paddingVertical: 3,
        width: "100%",
        justifyContent: "center",
        alignItems: "center",
    },
    chartTitleText: {
        fontWeight: "bold",
        color: "#F8F8FF",
    },
    chartBody: {
        flex: 1,
        paddingVertical: "auto",
    },
    chartRowContainer: {
        flexDirection: "row",
        paddingTop: 5,
        paddingBottom: 5,
        alignItems: "center",
        borderTopColor: "#f8f8ff",
        borderTopWidth: 1,
        paddingLeft: 5,
        paddingRight: 5,
    },
    chartStatLabelContainer: {
        width: 50,
    },
    chartStatLabelText: {
        color: "#f8f8ff",
        marginRight: 10,
    },
    chartRowBody: {
        flex: 1,
        flexDirection: "row",
    },
    textOnBar: {
        position: "absolute",
        right: 10,
        top: 0,
        bottom: 0,
        justifyContent: "center",
        color: "#16161d",
        fontWeight: "bold",
    },
    textBesideBar: {
        marginLeft: 10,
        color: "#f8f8ff",
        fontWeight: "bold",
    },
});
