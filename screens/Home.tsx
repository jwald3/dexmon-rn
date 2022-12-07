// import {
//     View,
//     Text,
//     FlatList,
//     Image,
//     StyleSheet,
//     ActivityIndicator,
// } from "react-native";
// import React, { useState, useEffect } from "react";
// import axios from "axios";

// // https://randomuser.me/api/?page=3&results=10&seed=abc

// type User = {
//     name: {
//         title: string;
//         first: string;
//         last: string;
//     };
//     email: string;
//     picture: {
//         large: string;
//     };
//     id: {
//         name: string;
//         value: string;
//     };
// };

// type RenderUser = {
//     item: User;
// };

// const Home = () => {
//     const [users, setUsers] = useState<Array<User>>([]);
//     const [currentPage, setCurrentPage] = useState(1);
//     const [isLoading, setIsLoading] = useState(false);

//     const getUsers = () => {
//         setIsLoading(true);

//         axios
//             .get(
//                 `https://randomuser.me/api/?page=${currentPage}&results=10&seed=abc
// `
//             )
//             .then((res) => {
//                 setUsers([...users, ...res.data.results]);
//                 setIsLoading(false);
//             });
//     };

//     useEffect(() => {
//         getUsers();
//     }, [currentPage]);

//     const loadMoreItems = () => {
//         setCurrentPage(currentPage + 1);
//     };

//     const renderItem = ({ item }: RenderUser) => {
//         return (
//             <View style={styles.itemWrapper}>
//                 <Image
//                     style={styles.itemImage}
//                     source={{ uri: item.picture.large }}
//                 />
//                 <View style={styles.contentWrapper}>
//                     <Text
//                         style={styles.textName}
//                     >{`${item.name.title} ${item.name.first} ${item.name.last}`}</Text>
//                     <Text style={styles.textEmail}>{item.email}</Text>
//                 </View>
//             </View>
//         );
//     };

//     const renderLoader = () => {
//         return isLoading ? (
//             <View style={styles.loader}>
//                 <ActivityIndicator size="large" color="#aaa" />
//             </View>
//         ) : null;
//     };

//     return (
//         <FlatList
//             data={users}
//             renderItem={renderItem}
//             keyExtractor={(item) => item.email}
//             ListFooterComponent={renderLoader}
//             onEndReached={loadMoreItems}
//             onEndReachedThreshold={0.2}
//         />
//     );
// };

// export default Home;

// const styles = StyleSheet.create({
//     itemWrapper: {
//         flexDirection: "row",
//         paddingHorizontal: 16,
//         paddingVertical: 16,
//         borderBottomWidth: 1,
//         borderColor: "#ddd",
//     },
//     itemImage: {
//         width: 50,
//         height: 50,
//         marginRight: 16,
//     },
//     contentWrapper: {
//         justifyContent: "space-around",
//     },
//     textName: {
//         fontSize: 16,
//     },
//     textEmail: {
//         color: "#777",
//     },
//     loader: {
//         marginVertical: 16,
//         alignItems: "center",
//     },
// });

import {
    View,
    Text,
    FlatList,
    Image,
    StyleSheet,
    ActivityIndicator,
} from "react-native";
import React, { useState, useEffect } from "react";
import axios from "axios";

type BasePokemonResponse = {
    name: string;
    url: string;
};

type UpdatedPokemonResponse = {
    name: string;
    url: string;
    image_url: string;
    id: number;
};

type RenderPokemon = {
    item: UpdatedPokemonResponse | BasePokemonResponse;
};

const Home = () => {
    const [users, setUsers] = useState<Array<BasePokemonResponse>>([]);
    const [currentPage, setCurrentPage] = useState(0);
    const [isLoading, setIsLoading] = useState(false);
    const [updatedPokemonList, setUpdatedPokemonList] = useState<
        Array<UpdatedPokemonResponse>
    >([]);

    const getUsers = () => {
        setIsLoading(true);

        axios
            .get(
                `https://pokeapi.co/api/v2/pokemon?offset=${
                    currentPage * 20
                }&limit=20
`
            )
            .then((res) => {
                setUsers([...users, ...res.data.results]);
                setIsLoading(false);
            });
    };

    useEffect(() => {
        getUsers();
    }, [currentPage]);

    useEffect(() => {
        users.forEach((pokemon) =>
            axios.get(pokemon.url).then((data) => {
                const newPokemon = {
                    name: pokemon.name,
                    url: pokemon.url,
                    image_url: data.data.sprites.front_default,
                    id: data.data.id,
                };

                if (
                    updatedPokemonList.filter(
                        (poke) => poke.id === newPokemon.id
                    ).length === 0
                ) {
                    setUpdatedPokemonList((prev) => [...prev, newPokemon]);
                }
            })
        );

        // const sortedList = updatedPokemonList.sort((a, b) => a.id - b.id);
        // setUpdatedPokemonList(sortedList);
    }, [users]);

    const loadMoreItems = () => {
        setCurrentPage(currentPage + 1);
    };

    const renderItem = ({ item }: RenderPokemon) => {
        return (
            <View style={styles.itemWrapper}>
                {/* <Image
                    style={styles.itemImage}
                    source={{ uri: item.image_url }}
                /> */}
                <View style={styles.contentWrapper}>
                    <Text style={styles.textName}>{`${item.name}`}</Text>
                </View>
            </View>
        );
    };

    const renderLoader = () => {
        return isLoading ? (
            <View style={styles.loader}>
                <ActivityIndicator size="large" color="#aaa" />
            </View>
        ) : null;
    };

    return (
        <FlatList
            data={users}
            renderItem={renderItem}
            keyExtractor={(item) => String(item.name)}
            ListFooterComponent={renderLoader}
            onEndReached={loadMoreItems}
            onEndReachedThreshold={0.2}
        />
    );
};

export default Home;

const styles = StyleSheet.create({
    itemWrapper: {
        flexDirection: "row",
        paddingHorizontal: 16,
        paddingVertical: 16,
        borderBottomWidth: 1,
        borderColor: "#ddd",
    },
    itemImage: {
        width: 50,
        height: 50,
        marginRight: 16,
    },
    contentWrapper: {
        justifyContent: "space-around",
    },
    textName: {
        fontSize: 16,
    },
    textEmail: {
        color: "#777",
    },
    loader: {
        marginVertical: 16,
        alignItems: "center",
    },
});
