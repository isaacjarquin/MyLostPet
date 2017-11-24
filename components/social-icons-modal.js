import React from "react"
import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native"
import Modal from 'react-native-modal'

export default class SocialIconsModal extends React.Component {
	constructor (props) {
		super(props)

		this.state = {
	    isModalVisible: false
	  }
	}

  _showModal = () => this.setState({ isModalVisible: true })

  _hideModal = () => this.setState({ isModalVisible: false })
	render () {
		return (
			<View style={styles.container}>
					<TouchableOpacity style={styles.share} onPress={this._showModal} >
							<Text style={styles.shareText} >Share</Text>
					</TouchableOpacity>

					<Modal isVisible={this.state.isModalVisible} style={styles.socialIconsModal} >
						<View style={styles.socialIcons}>
							<Image source={require("../assets/icons/facebook.png")} style={styles.socialIcon} />
							<Image source={require("../assets/icons/twitter.png")} style={styles.socialIcon} />
							<Image source={require("../assets/icons/whatsapp.png")} style={styles.socialIcon} />
							<Image source={require("../assets/icons/telegram.png")} style={styles.socialIcon} />
							<Image source={require("../assets/icons/mail.png")} style={styles.socialIcon} />
						</View>
						<TouchableOpacity style={styles.modalButton} onPress={this._hideModal} >
								<Text style={styles.shareText} >Cerrar</Text>
						</TouchableOpacity>
					</Modal>
			</View>
		)
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: "flex-start"
	},
	socialIcons: {
		flexDirection: 'row',
		backgroundColor: '#333333',
		marginTop: 10,
		marginLeft: 8,
		borderTopLeftRadius: 3,
		borderTopRightRadius: 3
	},
	socialIcon: {
		width: 55,
		height: 55,
		marginLeft: 8
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
	}
})
