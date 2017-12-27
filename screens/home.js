import React from "react"
import { StyleSheet, Text, View, Image, TouchableOpacity, Dimensions, ImageBackground, SafeAreaView, PixelRatio } from "react-native"
import { Icon } from "react-native-elements"
import SecondaryMenuModal from "../components/secondary-menu-modal"

export default class Home extends React.Component {
    constructor (props) {
        super(props)
        this.navigateToSearchForm = this.navigateToSearchForm.bind(this)
        this.navigateToMissingPetForm = this.navigateToMissingPetForm.bind(this)
        this._showModal = this._showModal.bind(this)

        this.state = {
	    isModalVisible: false
	  }
    }

    _showModal () {
        this.setState({ isModalVisible: true })
    }

    navigateToMissingPetForm () {
        const { navigate } = this.props.navigation

        navigate("MissingPetForm")
    }
    navigateToSearchForm () {
        const { navigate } = this.props.navigation

        navigate("SearchForm")
    }

    render () {
        return (
            <View style={styles.container}>
                <ImageBackground
                    source={require("../assets/images/home.jpg")}
                    style={styles.image}
                >
                    <View style={styles.topSection}>
                        <Text style={styles.subTitle}>Te ayudamos a encontrarlo</Text>
                        <Image
                            source={require("../assets/images/pet-care-icon.png")}
                            style={styles.icon}
                        />
                    </View>

                    <View style={styles.bottomSection}>
                        <TouchableOpacity style={styles.share} onPress={this.navigateToMissingPetForm} >
                            <Icon style={styles.searchIcon} color='white' type="entypo" name="plus" size={30} />
                            <Text style={styles.searchButton}>Añadir nueva mascota</Text>
                        </TouchableOpacity>

                        <SecondaryMenuModal navigate={this.props.navigation.navigate} />
                    </View>
                    <SafeAreaView style={{marginTop: 10}}/>
                </ImageBackground>
            </View>
        )
    }
}

const window = Dimensions.get("window")

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "column",
        justifyContent: "space-between",
        backgroundColor: "#fff",
        width: window.width,
        height: window.height
    },
    topSection: {
        marginTop: 30,
        flex: 1,
        minHeight: window.height - 390
    },
    bottomSection: {
        flex: 1
    },
    searchIcon: {
        alignSelf: "center",
        marginLeft: "15%"
    },
    searchButton: {
        margin: 10,
        fontSize: 18,
        alignSelf: "center",
        color: "white",
        backgroundColor: "transparent"
    },
    subTitle: {
        fontSize: 18,
        alignSelf: "center",
        backgroundColor: "transparent",
        marginBottom: 20,
        color: "grey"
    },
    icon: {
        width: 100,
        height: 100,
        alignSelf: "center"
    },
    share: {
        flexDirection: "row",
        backgroundColor: "#333333",
        opacity: 0.8,
        marginLeft: 5,
        marginRight: 5,
        marginTop: 5,
        borderRadius: 3,
        padding: 10
    },
    image: {
        flex: 1,
        justifyContent: "flex-end",
        width: window.width,
        height: window.height
    }
})
