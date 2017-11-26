import React from "react"
import { StyleSheet, Text, View, Share, TouchableOpacity, Image, ScrollView } from "react-native"
import { Card, Button } from "react-native-elements"
import ContactDetail from "./contact-details"

export default class PetCard extends React.Component {
	constructor (props) {
		super(props)
		this.navigateToPersonalDetails = this.navigateToPersonalDetails.bind(this)
		this._shareMyLostPetWeb = this._shareMyLostPetWeb.bind(this)
	}

	_shareMyLostPetWeb () {
		const petId = this.props.navigation.state.params.pet.id

		Share.share({
			message: `http://www.mylostpet.es/search/${petId}`,
			title: "My Lost Pet",
			url: "http://www.mylostpet.es/"
		})
			.then(this._showResult)
			.catch(err => console.log(err))
	}

	mobileImageUrl (url) {
		const imageProperties = "w_300,h_340,c_fill,g_south"
		const splitedUrl = url.split("upload")

		return (splitedUrl[0] + "upload/" + imageProperties + splitedUrl[1])
	}

	navigateToPersonalDetails () {
		const { navigate } = this.props.navigation

		navigate("ContactDetails", {pet_id: this.props.navigation.state.params.pet.id})
	}

	render () {
		const { kind, info, image, location, date, breed } = this.props.navigation.state.params.pet
		const cardTitleWithBreed = `${kind}, de raza ${breed}`
		const cardTitle = breed ? cardTitleWithBreed : kind

		return (
			<ScrollView>
				<View style={styles.container}>
					<Card imageStyle={styles.image} title={cardTitle} image={{uri: this.mobileImageUrl(image)}}>
						<Text style={styles.secondaryTitle}>Encontrado en {location}, el {date}</Text>
						<Text style={styles.description}>{info}</Text>
					</Card>
					<ContactDetail petId={ this.props.navigation.state.params.pet.id}/>
				</View>
			</ScrollView>
		)
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "transparent",
		alignItems: "stretch",
		justifyContent: "flex-start"
	},
	image: {
		height: 300
	},
	button: {
		borderRadius: 0,
		marginLeft: 0,
		marginRight: 0,
		marginBottom: 0
	},
	shareIcon: {
		alignSelf: "center",
		width: 60,
		marginTop: 15,
		marginBottom: 15,
		height: 60
	},
	secondaryTitle: {
		marginBottom: 10,
		fontWeight: "bold"
	},
	description: {
		marginBottom: 20,
		lineHeight: 25
	}
})
