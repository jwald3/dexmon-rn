import React from "react";
import { View, Text } from "react-native";

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

    return (
        <View
            style={{
                backgroundColor: "rgba(255,255,255,0.10)",
                width: "90%",
                marginLeft: "auto",
                marginRight: "auto",
                borderWidth: 1,
                borderColor: "rgba(255,255,255,0.50)",
                borderRadius: 3,

                flex: 1,
                justifyContent: "center",
            }}
        >
            <View
                style={{
                    backgroundColor: "#42AD4A",
                    paddingVertical: 3,
                    width: "100%",
                    justifyContent: "center",
                    alignItems: "center",
                }}
            >
                <Text
                    style={{
                        fontWeight: "bold",
                        color: "#F8F8FF",
                    }}
                >
                    Stats
                </Text>
            </View>
            <View style={{ flex: 1, paddingVertical: "auto" }}>
                {stats.map((stat, index) => (
                    <View
                        key={stat.name}
                        style={{
                            flexDirection: "row",
                            paddingTop: 5,
                            paddingBottom: 5,
                            alignItems: "center",
                            borderTopColor: "#f8f8ff",
                            borderTopWidth: 1,
                            paddingLeft: 5,
                            paddingRight: 5,
                        }}
                    >
                        <Text style={{ color: "#f8f8ff" }}>{stat.name}:</Text>
                        <View
                            style={{
                                marginLeft: 10,
                                width: (stat.value / maxX) * 100 + "%",
                                height: 20,
                                backgroundColor: "#2980B9",
                            }}
                        >
                            {stat.value > 50 && (
                                <Text
                                    style={{
                                        position: "absolute",
                                        right: 10,
                                        top: 0,
                                        bottom: 0,
                                        justifyContent: "center",
                                        color: "#f8f8ff",
                                    }}
                                >
                                    {stat.value}
                                </Text>
                            )}
                        </View>
                        {stat.value <= 50 && (
                            <Text style={{ marginLeft: 10, color: "#f8f8ff" }}>
                                {stat.value}
                            </Text>
                        )}
                    </View>
                ))}
            </View>
        </View>
    );
};

export default BarChart;
