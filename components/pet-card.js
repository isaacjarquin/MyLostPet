import React from "react"
import { StyleSheet, Text, View } from "react-native"
import { Card, Button } from "react-native-elements"

export default class PetCard extends React.Component {
	mobileImageUrl (url) {
    const imageProperties = 'w_300,h_340,c_fill,g_south'
    const splitedUrl = url.split('upload')

    return (splitedUrl[0] + 'upload/' + imageProperties + splitedUrl[1])
  }

	render () {
		const { kind, info, image, location, date, breed } = this.props.navigation.state.params.pet
		const cardTitleWithBreed = `${kind}, de raza ${breed}`
		const cardTitle = breed ? cardTitleWithBreed : kind

		return (
			<View style={styles.container}>
				<Card imageStyle={styles.image} title={cardTitle} image={{uri: this.mobileImageUrl(image)}}>
					<Text style={styles.secondaryTitle}>Encontrado en {location}, el {date}</Text>
					<Text style={styles.description}>{info}</Text>
					<Button buttonStyle={styles.button} title='Contactar' />
				</Card>
			</View>
		)
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "white",
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
	secondaryTitle: {
		marginBottom: 10,
		fontWeight: "bold"
	},
	description: {
		marginBottom: 20,
		lineHeight: 25
	}
})
