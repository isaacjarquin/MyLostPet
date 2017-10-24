import React from "react"
import { StyleSheet, Text, View, Image } from "react-native"
import { Button } from "react-native-elements"

export default class Home extends React.Component {
	constructor (props) {
		super(props)
		this.navigateToSearchForm = this.navigateToSearchForm.bind(this)
	}

	navigateToSearchForm () {
		const { navigate } = this.props.navigation

		navigate("SearchForm")
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
						onPress={this.navigateToSearchForm}
						title='Buscar Mascota perdida' />
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
		marginBottom: 300,
		alignSelf: "center"
	},
	image: {
		flex: 1,
		justifyContent: "flex-end",
		width: "100%",
		height: "100%"
	}
})
