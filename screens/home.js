import React from "react"
import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native"
import { Button, SocialIcon, Icon } from "react-native-elements"
import Modal from 'react-native-modal'

export default class Home extends React.Component {
	constructor (props) {
		super(props)
		this.navigateToSearchForm = this.navigateToSearchForm.bind(this)
		this.navigateToMissingPetForm = this.navigateToMissingPetForm.bind(this)

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

  _showModal = () => this.setState({ isModalVisible: true })

  _hideModal = () => this.setState({ isModalVisible: false })
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

					<TouchableOpacity style={styles.share} onPress={this._showModal} >
							<Text style={styles.shareText} >Share</Text>
					</TouchableOpacity>

					<Modal isVisible={this.state.isModalVisible} style={styles.socialIconsModal} >
						<View style={styles.socialIcons}>
							<SocialIcon style={styles.socialIcon} type='facebook' />
							<SocialIcon style={styles.socialIcon} type='twitter' />
							<Icon color='white' type="entypo" name="paper-plane" size={50} />
							<Image
								source={require("../assets/icons/whatsapplogo.png")}
								style={{width: 60, height: 60, marginLeft: 5, marginRight: 5}}
							/>
							<Icon color='#FF6961' type="entypo" name="mail-with-circle" size={55} />
						</View>
						<TouchableOpacity style={styles.modalButton} onPress={this._hideModal} >
								<Text style={styles.shareText} >Cerrar</Text>
						</TouchableOpacity>
					</Modal>
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
	socialIcons: {
		flexDirection: 'row',
		backgroundColor: '#333333',
		marginTop: 10,
		marginLeft: 10,
		borderTopLeftRadius: 3,
		borderTopRightRadius: 3
	},
	modalButton: {
		marginTop: 10
	},
	socialIconsModal: {
		flexDirection: 'column',
		backgroundColor: '#333333',
		marginTop: 500,
		borderTopLeftRadius: 3,
		borderTopRightRadius: 3
	},
	share: {
		backgroundColor: '#333333',
		opacity: 0.8,
		marginLeft: 15,
		marginRight: 15,
		marginTop: 5,
		borderTopLeftRadius: 3,
		borderTopRightRadius: 3,
		padding: 10
	},
	shareText: {
		alignSelf: "center",
		color: "white",
		fontSize: 18
	},
	socialIcon: {
		marginLeft: 10
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
	image: {
		flex: 1,
		justifyContent: "flex-end",
		width: "100%",
		height: "100%"
	}
})
