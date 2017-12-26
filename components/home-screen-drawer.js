import React from "react"
import { StyleSheet, Text, View, Image, TouchableOpacity, ImageBackground } from "react-native"

export default class HomeScreenDrawer extends React.Component {
    constructor (props) {
        super(props)
        this._whoWeAre = this._whoWeAre.bind(this)
        this._termsAndConditions = this._termsAndConditions.bind(this)
        this._howToUse = this._howToUse.bind(this)
    }
    _whoWeAre() {
        const { navigate } = this.props.navigation
        navigate("WhoWeAre")
    }
    _termsAndConditions() {
        const { navigate } = this.props.navigation
        navigate("TermsAndConditions")
    }
    _howToUse() {
        const { navigate } = this.props.navigation
        navigate("HowToUse")
    }
    render () {
        return (
            <View style={styles.container}>
                <ImageBackground
                    source={require("../assets/images/xira.jpg")}
                    style={styles.image}
                >
                    <TouchableOpacity style={styles.modalOptionsButton} onPress={this._whoWeAre} >
                        <Text style={styles.shareText} >Quienes somos</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.modalOptionsButton} onPress={this._howToUse} >
                        <Text style={styles.shareText} >Como usar la aplicación</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.modalOptionsButton} onPress={this._hideModal} >
                        <Text style={styles.shareText} >Contacto</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.modalOptionsButton} onPress={this._termsAndConditions} >
                        <Text style={styles.shareText} >Términos y condiciones</Text>
                    </TouchableOpacity>
                </ImageBackground>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        justifyContent: "flex-start"
    },
    modalOptionsButton: {
        opacity: 0.6,
        borderWidth: StyleSheet.hairlineWidth,
        backgroundColor: "grey",
        padding: 20,
        borderColor: "#d6d7da"
    },
    shareText: {
        alignSelf: "center",
        color: "white",
        fontSize: 18
    },
    image: {
        flex: 1,
        justifyContent: "flex-start",
        width: "100%",
        height: "100%"
    }
})
