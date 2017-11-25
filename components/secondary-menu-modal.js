import React from "react"
import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native"
import Modal from "react-native-modal"
import { Button, Icon } from "react-native-elements"

export default class SecondaryMenuModal extends React.Component {
	constructor (props, context) {
		super(props, context)

		this._showModal = this._showModal.bind(this)
		this._hideModal = this._hideModal.bind(this)
		this._whoWeAre = this._whoWeAre.bind(this)

		this.state = {
	    isModalVisible: false
	  }
	}

	_showModal () {
		this.setState({ isModalVisible: true })
	}

	_hideModal () {
		this.setState({ isModalVisible: false })
	}

	_whoWeAre() {
		const { navigate } = this.props.navigation
		navigate("WhoWeAre")
	}

	render () {
		return (
			<View style={styles.container}>
				<TouchableOpacity style={styles.share} onPress={this._showModal} >
          <Icon color='grey' type="MaterialIcons" name="keyboard-arrow-up" size={40} />
				</TouchableOpacity>

				<Modal isVisible={this.state.isModalVisible} style={styles.socialIconsModal} >
					<View style={styles.socialIcons}>
            <TouchableOpacity style={styles.modalCloseButton} onPress={this._hideModal} >
              <Icon color='grey' type="MaterialIcons" name="keyboard-arrow-down" size={40} />
  					</TouchableOpacity>

            <TouchableOpacity style={styles.modalOptionsButton} onPress={this._whoWeAre} >
  						<Text style={styles.shareText} >Quienes somos</Text>
  					</TouchableOpacity>
            <TouchableOpacity style={styles.modalOptionsButton} onPress={this._hideModal} >
  						<Text style={styles.shareText} >Como usar la aplicación</Text>
  					</TouchableOpacity>
            <TouchableOpacity style={styles.modalOptionsButton} onPress={this._hideModal} >
  						<Text style={styles.shareText} >Contacto</Text>
  					</TouchableOpacity>
            <TouchableOpacity style={styles.modalOptionsButton} onPress={this._hideModal} >
  						<Text style={styles.shareText} >Términos y condiciones</Text>
  					</TouchableOpacity>

					</View>
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
	modalCloseButton: {
		marginTop: 10
	},
  modalOptionsButton: {
    opacity: 0.6,
		borderWidth: 0.5,
    padding: 20,
    borderColor: '#d6d7da'
	},
	socialIconsModal: {
		flexDirection: "column",
		backgroundColor: "#333333",
		marginTop: 350,
		borderTopLeftRadius: 3,
		borderTopRightRadius: 3
	},
	share: {
		backgroundColor: "#333333",
		opacity: 0.8,
		marginLeft: 15,
		marginRight: 15,
		marginTop: 5,
		borderTopLeftRadius: 3,
		borderTopRightRadius: 3
	},
	shareText: {
		alignSelf: "center",
		color: "white",
		fontSize: 18
	}
})
