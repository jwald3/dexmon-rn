import { View, Text, Image, Dimensions, Platform } from "react-native";
import React from "react";
import EStyleSheet from "react-native-extended-stylesheet";

interface GridItemProps {
    category: string;
    value: string | undefined;
    image: boolean;
}

const GridItem = ({ category, value, image }: GridItemProps) => {
    const screenWidth = Dimensions.get("screen").width;
    const gridRowMaxWidth = screenWidth * 0.9;

    return (
        <View
            style={[
                styles.mainContainer,
                {
                    minWidth:
                        Platform.OS !== "web"
                            ? Math.max(gridRowMaxWidth * 0.16 - 40, 120)
                            : "",
                    marginHorizontal: Platform.OS !== "web" ? 5 : "",
                    maxWidth:
                        Platform.OS !== "web"
                            ? Math.max(gridRowMaxWidth * 0.16 - 35, 150)
                            : "",
                },
            ]}
        >
            <View style={styles.headerContainer}>
                <Text style={styles.headerText}>{category}</Text>
            </View>
            <View style={styles.containerBody}>
                {image === true ? (
                    <>
                        <Image source={{ uri: value }} style={styles.image} />
                    </>
                ) : (
                    <Text style={styles.bodyText}>{value}</Text>
                )}
            </View>
        </View>
    );
};

export default GridItem;

const styles = EStyleSheet.create({
    mainContainer: {
        flex: 1,
        alignItems: "center",
        borderWidth: 1,
        borderColor: "rgba(255,255,255,0.50)",
        borderRadius: 3,
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
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "rgba(255,255,255,0.10)",
        width: "100%",
    },
    image: {
        width: 48,
        height: 48,
    },
    bodyText: {
        color: "$mainText",
        paddingHorizontal: 5,
    },
});
