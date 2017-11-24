import React from "react"
import { StyleSheet, Text, View, Image, TouchableOpacity, Share } from "react-native"
import { Button } from "react-native-elements"
import SocialIconsModal from "../components/social-icons-modal"

export default class Home extends React.Component {
	constructor (props) {
		super(props)
		this.navigateToSearchForm = this.navigateToSearchForm.bind(this)
		this.navigateToMissingPetForm = this.navigateToMissingPetForm.bind(this)
		this._shareMyLostPetWeb = this._shareMyLostPetWeb.bind(this)

		this.state = {
	    isModalVisible: false
	  }
	}

	navigateToMissingPetForm () {
		const { navigate } = this.props.navigation

		navigate("MissingPetForm")
	}
	navigateToSearchForm () {
		const { navigate } = this.props.navigation

		navigate("SearchForm")
	}

	_shareMyLostPetWeb () {
    Share.share({
      message: 'http://www.mylostpet.es/',
      title: 'My Lost Pet',
      url: 'http://www.mylostpet.es/'
    })
    .then(this._showResult)
    .catch(err => console.log(err))
  }

	render () {
		return (
			<View style={styles.container}>
				<Image
					source={require("../assets/images/tirma.jpg")}
					style={styles.image}
				>
					<Text style={styles.title}>My Lost Pet</Text>
					<Text style={styles.subTitle}>Te ayudamos a encontrarlo</Text>

					<Image
						source={require("../assets/images/pet-care-icon.png")}
						style={styles.icon}
					/>
					<Button
						style={styles.button}
						borderRadius={3}
						backgroundColor={"#333333"}
						large
						onPress={this.navigateToMissingPetForm}
						title='Encontraste una mascota perdida ?' />

					<Button
						style={styles.button}
						borderRadius={3}
						backgroundColor={"#333333"}
						large
						onPress={this.navigateToSearchForm}
						title='Buscar Mascota perdida' />

					<TouchableOpacity style={styles.share} onPress={this._shareMyLostPetWeb} >
						<Text style={styles.shareText} >Share</Text>
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
	title: {
		margin: 20,
		fontSize: 28,
		fontWeight: "bold",
		alignSelf: "center",
		color: "white",
		backgroundColor: "transparent"
	},
	subTitle: {
		fontSize: 18,
		alignSelf: "center",
		backgroundColor: "transparent",
		marginBottom: 20,
		color: "white"
	},
	button: {
		marginTop: 10,
		marginBottom: 10,
		opacity: 0.8
	},
	icon: {
		width: 100,
		height: 100,
		marginBottom: 190,
		alignSelf: "center"
	},
	share: {
		backgroundColor: "#333333",
		opacity: 0.8,
		marginLeft: 15,
		marginRight: 15,
		marginTop: 5,
		borderTopLeftRadius: 3,
		borderTopRightRadius: 3,
		padding: 8
	},
	shareText: {
		alignSelf: "center",
		color: "white",
		fontSize: 18
	},
	image: {
		flex: 1,
		justifyContent: "flex-end",
		width: "100%",
		height: "100%"
	}
})
