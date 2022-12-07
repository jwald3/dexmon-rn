import { View, Text, Image, StyleSheet } from "react-native";
import { useNavigation, useRoute, RouteProp } from "@react-navigation/native";
import React from "react";
import { UpdatedPokemonResponse } from "./HomeScreen";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { LinearGradient } from "expo-linear-gradient";
import { capitalize } from "../typescript/functions";

export type RootStackParamList = {
    Pokemon: {
        pokemon: UpdatedPokemonResponse;
    };
};

const PokemonScreen = () => {
    const {
        params: { pokemon },
    } = useRoute<RouteProp<RootStackParamList, "Pokemon">>();

    return (
        <LinearGradient
            colors={["#ebfaf5", "#85e0c2"]}
            style={styles.container}
        >
            <View style={styles.header}>
                <Text style={styles.title}>{capitalize(pokemon.name)}</Text>
                <View style={styles.imageContainer}>
                    <View style={styles.circle}>
                        <View style={styles.innerCircle} />
                        <Image
                            style={styles.image}
                            source={{ uri: pokemon.image_url }}
                            resizeMode="contain"
                        />
                    </View>
                </View>
            </View>
            <View style={styles.body}>
                {/* <Text style={styles.subtitle}>Types:</Text>
               {pokemon.types.map((type) => (
                   <View style={styles.type} key={type}>
                       <Text>{type}</Text>
                   </View>
               ))}
               <Text style={styles.subtitle}>Details:</Text>
               <Text>{pokemon.description}</Text> */}
            </View>
        </LinearGradient>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    header: {
        alignItems: "center",
        paddingTop: 20,
        paddingBottom: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: "bold",
    },
    imageContainer: {
        position: "relative",
    },
    image: {
        width: 220,
        height: 220,
        alignSelf: "center",
    },
    circle: {
        width: 240,
        height: 240,
        borderRadius: 120,
        // borderWidth: 2,
        // borderColor: "#333",
        overflow: "hidden",
        position: "relative",
    },
    innerCircle: {
        width: 200,
        height: 200,
        borderRadius: 100,
        backgroundColor: "rgba(255,255,255,0.55)",
        position: "absolute",
        top: 20,
        left: 20,
        boxShadow: "0 0 8px #333",
    },
    body: {
        padding: 20,
    },
    subtitle: {
        fontSize: 18,
        fontWeight: "bold",
        marginTop: 10,
        marginBottom: 10,
    },
    type: {
        padding: 5,
        margin: 5,
        borderRadius: 10,
        backgroundColor: "#ccc",
    },
});

export default PokemonScreen;
