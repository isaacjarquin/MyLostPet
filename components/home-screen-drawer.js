import React from "react"
import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native"
import { Button } from "react-native-elements"

export default class HomeScreenDrawer extends React.Component {
	constructor (props) {
		super(props)
		this._whoWeAre = this._whoWeAre.bind(this)
		this._termsAndConditions = this._termsAndConditions.bind(this)
	}
	_whoWeAre() {
		const { navigate } = this.props.navigation
		navigate("WhoWeAre")
	}
	_termsAndConditions() {
		const { navigate } = this.props.navigation
		navigate("TermsAndConditions")
	}
	render () {
		return (
			<View style={styles.container}>
					<Image
						source={require("../assets/images/tirma.jpg")}
						style={styles.image}
					>
						<TouchableOpacity style={styles.modalOptionsButton} onPress={this._whoWeAre} >
							<Text style={styles.shareText} >Quienes somos</Text>
						</TouchableOpacity>
						<TouchableOpacity style={styles.modalOptionsButton} onPress={this._hideModal} >
							<Text style={styles.shareText} >Como usar la aplicación</Text>
						</TouchableOpacity>
						<TouchableOpacity style={styles.modalOptionsButton} onPress={this._hideModal} >
							<Text style={styles.shareText} >Contacto</Text>
						</TouchableOpacity>
						<TouchableOpacity style={styles.modalOptionsButton} onPress={this._termsAndConditions} >
							<Text style={styles.shareText} >Términos y condiciones</Text>
						</TouchableOpacity>
					</Image>
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
	button: {
		opacity: 0.8,
		borderWidth: 0.5,
    borderColor: '#d6d7da'
	},
	modalOptionsButton: {
    opacity: 0.6,
		borderWidth: 0.5,
		backgroundColor: 'grey',
    padding: 20,
    borderColor: '#d6d7da'
	},
	shareText: {
		alignSelf: "center",
		color: "white",
		fontSize: 18
	},
	image: {
		flex: 1,
		justifyContent: "flex-start",
		width: "90%",
		height: "100%"
	}
})
