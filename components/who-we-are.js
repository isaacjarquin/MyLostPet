import React from "react"
import { StyleSheet, Text, View, Image, ScrollView } from "react-native"

export default class WhoWeAre extends React.Component {
    constructor (props) {
        super(props)
    }

    render () {
        return (

            <View style={styles.container}>
                <Image
                    source={require("../assets/images/tirma.jpg")}
                    style={styles.image}
                >
                    <ScrollView style={styles.contentContainer}>
	            <Text style={styles.title}>¿Quiénes somos?</Text>
	            <Text style={styles.description}>My lost pet es una organización sin fines de lucro compuesta por un grupo de voluntarios unidos por el amor hacia los animales y la convicción de que, juntos, podemos hacer mucho por ellos.</Text>
	            <Text style={styles.description}>Esta iniciativa fue creada con el objetivo de facilitar todo lo posible la búsqueda de nuestras mascotas cuando éstas se encuentran extraviadas.</Text>
                    </ScrollView>
                </Image>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "grey",
        alignItems: "stretch",
        justifyContent: "flex-start"
    },
    contentContainer: {
        opacity: 0.8,
        backgroundColor: "black"
    },
    title: {
        color: "white",
        margin: 10,
        fontSize: 20,
        marginBottom: 10,
        fontWeight: "bold",
        alignSelf: "center",
        backgroundColor: "transparent"
    },
    description: {
        margin: 10,
        marginBottom: 10,
        backgroundColor: "transparent",
        color: "white",
        opacity: 0.8,
    },
    image: {
        flex: 1,
        justifyContent: "flex-start",
        width: "100%",
        height: "100%"
    }
})
