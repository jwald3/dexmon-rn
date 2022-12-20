import React from "react";
import {
    View,
    Text,
    TouchableOpacity,
    StatusBar,
    StyleSheet,
    Keyboard,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import {
    ChevronLeftIcon,
    MagnifyingGlassIcon,
} from "react-native-heroicons/outline";

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
                        style={{ width: 50, marginLeft: 20 }}
                        onPress={() =>
                            navigation.navigate("Home", { Home: "" })
                        }
                    >
                        <View
                            style={{
                                display: "flex",
                                flexDirection: "row",
                                alignItems: "center",
                                justifyContent: "flex-start",
                                flex: 3,
                            }}
                        >
                            <ChevronLeftIcon size={28} color="#fff" />
                            <Text style={{ color: "#fff", fontSize: 16 }}>
                                Back
                            </Text>
                        </View>
                    </TouchableOpacity>
                ) : (
                    <View style={{ width: 50 }}></View>
                )}
                <Text
                    style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        color: "#fff",
                        fontSize: 20,
                    }}
                >
                    {props.title}
                </Text>
                {props.showSearchButton ? (
                    <TouchableOpacity
                        style={{
                            width: 50,
                            display: "flex",
                            flexDirection: "row",
                            alignItems: "center",
                            justifyContent: "flex-end",
                            marginRight: 20,
                        }}
                        onPress={() =>
                            navigation.navigate("Search", { Search: "" })
                        }
                    >
                        <MagnifyingGlassIcon
                            size={24}
                            color="#fff"
                            style={{ paddingLeft: "auto" }}
                        />
                    </TouchableOpacity>
                ) : (
                    <View style={{ width: 50 }}></View>
                )}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#42AD4A",
        height: 100,
        paddingTop: 40,
        color: "#fff",
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
    },
    backButton: {
        position: "absolute",
        left: 20,
        top: 30,
    },
    backButtonText: {
        color: "white",
        fontSize: 16,
    },
    title: {
        color: "white",
        fontSize: 22,
        flex: 1,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
    },
});

export default Header;
