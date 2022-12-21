import React from "react";
import { View, Text, TouchableOpacity, StatusBar } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import {
    ChevronLeftIcon,
    MagnifyingGlassIcon,
} from "react-native-heroicons/outline";
import EStyleSheet from "react-native-extended-stylesheet";

interface HeaderProps {
    title: string;
    showBackButton: boolean;
    showSearchButton: boolean;
}

export type RootStackParamList = {
    Home: {
        Home: string;
    };
    Search: {
        Search: string;
    };
};

const Header: React.FC<HeaderProps> = (props) => {
    const navigation =
        useNavigation<NativeStackNavigationProp<RootStackParamList, "Home">>();

    return (
        <View>
            <StatusBar barStyle="light-content" />
            <View style={styles.container}>
                {props.showBackButton ? (
                    <TouchableOpacity
                        style={styles.backButtonContainer}
                        onPress={() =>
                            navigation.navigate("Home", { Home: "" })
                        }
                    >
                        <View style={styles.backButtonText}>
                            <ChevronLeftIcon size={28} color="#fff" />
                            <Text style={styles.backText}>Back</Text>
                        </View>
                    </TouchableOpacity>
                ) : (
                    <View style={styles.backButtonContainer}></View>
                )}
                <Text style={styles.title}>{props.title}</Text>
                {props.showSearchButton ? (
                    <TouchableOpacity
                        style={styles.searchButtonContainer}
                        onPress={() =>
                            navigation.navigate("Search", { Search: "" })
                        }
                    >
                        <MagnifyingGlassIcon
                            size={24}
                            color="#fff"
                            style={styles.searchIcon}
                        />
                    </TouchableOpacity>
                ) : (
                    <View style={styles.searchButtonContainer}></View>
                )}
            </View>
        </View>
    );
};

const styles = EStyleSheet.create({
    container: {
        backgroundColor: "#42AD4A",
        height: 100,
        paddingTop: 40,
        color: "$mainText",
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
    },
    backButtonContainer: {
        width: 50,
        marginLeft: 20,
    },
    backButtonText: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "flex-start",
        flex: 3,
    },
    backText: {
        color: "$mainText",
        fontSize: 16,
    },
    title: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        color: "$mainText",
        fontSize: 20,
    },
    searchButtonContainer: {
        width: 50,
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "flex-end",
        marginRight: 20,
    },
    searchIcon: {
        paddingLeft: "auto",
    },
});

export default Header;
