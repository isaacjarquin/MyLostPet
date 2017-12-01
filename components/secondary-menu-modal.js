import React from "react"
import { StyleSheet, Text, View, TouchableOpacity } from "react-native"
import Modal from "react-native-modal"
import bodyParamsBuilder from "../utils/http-request.js"
import pets from "../data/pets"
import { get } from "../services/items-api"
import locations from "../data/locations"
import { Icon } from "react-native-elements"
import CustomizedPicker from "./customized-picker"

export default class SecondaryMenuModal extends React.Component {
	constructor (props, context) {
		super(props, context)

		this._showModal = this._showModal.bind(this)
		this._hideModal = this._hideModal.bind(this)
		this.getPets = this.getPets.bind(this)
		this.setType = this.setType.bind(this)
		this.setProvince = this.setProvince.bind(this)
		this.setAutonomousComunity = this.setAutonomousComunity.bind(this)

		this._showPetTypeModal = this._showPetTypeModal.bind(this)
		this._hidePetTypeModal = this._hidePetTypeModal.bind(this)

		this._showAutonomousComunityModal = this._showAutonomousComunityModal.bind(this)
		this._hideAutonomousComunityModal = this._hideAutonomousComunityModal.bind(this)

		this._showProvinceModal = this._showProvinceModal.bind(this)
		this._hideProvinceModal = this._hideProvinceModal.bind(this)

		this.state = {
			isModalVisible: false,
			isPetTypeModalVisible: false,
			isAutonomousComunityModalVisible: false,
			isProvinceModalVisible: false,
			type: "",
			autonomousComunity: "",
			province: "",
			provincias: []
		}
	}

	_showModal () {
		this.setState({ isModalVisible: true })
	}

	_hideModal () {
		this.setState({ isModalVisible: false })
	}

	_showPetTypeModal () {
		this.setState({ isPetTypeModalVisible: true })
	}

	_hidePetTypeModal () {
		this.setState({ isPetTypeModalVisible: false })
	}

	_showAutonomousComunityModal () {
		this.setState({ isAutonomousComunityModalVisible: true })
	}

	_hideAutonomousComunityModal () {
		this.setState({ isAutonomousComunityModalVisible: false })
	}

	_showProvinceModal () {
		this.setState({ isProvinceModalVisible: true })
	}

	_hideProvinceModal () {
		this.setState({ isProvinceModalVisible: false })
	}

	setType (text) {
		this.setState({type: text})
	}

	setProvince (text) {
		this.setState({province: text})
	}

	setAutonomousComunity (text) {
		if (text) {
			const location = locations.find((location) => location.value === text)

			this.setState({autonomousComunity: text})
			this.setState({provincias: location.provincias})
		}
	}

	getPets () {
		const url = `https://items-api.herokuapp.com/api/items${bodyParamsBuilder(this.state)}`

		return get(url)
			.then((response) => {
				this._hideModal()
				const { navigate } = this.props
				navigate("SearchResultPage", { pets: response.data })
			})
			.catch((reason) => console.error(reason))
	}

	render () {
		return (
			<View style={styles.container}>
				<TouchableOpacity style={styles.searchHomeButton} onPress={this._showModal} >
					<Icon style={styles.searchHomeIcon} color='white' type="evilIcons" name="search" size={30} />
					<Text style={styles.searchButton}>Buscar mascota</Text>
				</TouchableOpacity>

				<Modal isVisible={this.state.isModalVisible} style={styles.socialIconsModal} >
					<TouchableOpacity style={styles.share} onPress={this._hideModal} >
	          <Icon color='grey' type="MaterialIcons" name="keyboard-arrow-down" size={30} />
					</TouchableOpacity>
					<View style={styles.socialIcons}>

						<TouchableOpacity style={styles.select} onPress={this._showPetTypeModal} >
							<Text style={styles.selectText}>{this.state.type === "" ? "Tipo de mascota" : this.state.type}</Text>
							<Icon style={styles.selectIcon} color='white' type="MaterialIcons" name="keyboard-arrow-down" size={20} />
						</TouchableOpacity>
						<CustomizedPicker
							items={pets}
							isVisible={this.state.isPetTypeModalVisible}
							hidePetTypeModal={this._hidePetTypeModal}
							handler={this.setType}
						/>

						<TouchableOpacity style={styles.select} onPress={this._showAutonomousComunityModal} >
							<Text style={styles.selectText}>{this.state.autonomousComunity === "" ? "Comunidad autónoma" : this.state.autonomousComunity}</Text>
							<Icon style={styles.selectIcon} color='white' type="MaterialIcons" name="keyboard-arrow-down" size={20} />
						</TouchableOpacity>
						<CustomizedPicker
							items={locations}
							isVisible={this.state.isAutonomousComunityModalVisible}
							hidePetTypeModal={this._hideAutonomousComunityModal}
							handler={this.setAutonomousComunity}
						/>

						<TouchableOpacity style={styles.select} onPress={this._showProvinceModal} >
							<Text style={styles.selectText}>{this.state.province === "" ? "Provincia" : this.state.province }</Text>
							<Icon style={styles.selectIcon} color='white' type="MaterialIcons" name="keyboard-arrow-down" size={20} />
						</TouchableOpacity>
						<CustomizedPicker
							items={this.state.provincias}
							isVisible={this.state.isProvinceModalVisible}
							hidePetTypeModal={this._hideProvinceModal}
							handler={this.setProvince}
						/>

						<TouchableOpacity style={styles.submitButton} onPress={this.getPets} >
		          <Icon style={styles.searchIcon} color='white' type="evilIcons" name="search" size={30} />
							<Text style={styles.searchButtonText}>Buscar</Text>
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
	optionListStyle: {
		backgroundColor: "white",
		borderColor: "black",
		width: "95%",
		height: "40%",
		borderRadius: 5
	},
	backdropStyle: {
		backgroundColor: "black",
		opacity: 0.8
	},
	searchButtonText: {
		color: "white",
		alignSelf: "center",
		fontSize: 16
	},
	searchButton: {
		color: "white",
		alignSelf: "center",
		fontSize: 18
	},
	select: {
		flexDirection: "row",
		width: "100%",
		padding: 15,
		backgroundColor: "black",
		opacity: 0.5,
		borderColor: "#d6d7da",
		borderWidth: 0.5
	},
	selectText: {
		color: "white",
		width: "95%"
	},
	searchHomeButton: {
		flexDirection: "row",
		backgroundColor: "#333333",
		opacity: 0.8,
		margin: 5,
		borderRadius: 3,
		padding: 15
	},
	socialIconsModal: {
		flexDirection: "column",
		backgroundColor: "#333333",
		marginTop: 405,
		borderTopLeftRadius: 3,
		borderTopRightRadius: 3
	},
	searchIcon: {
		marginLeft: "35%"
	},
	searchHomeIcon: {
		marginLeft: "20%"
	},
	share: {
		flexDirection: "row",
		alignSelf: "center",
		backgroundColor: "transparent",
		opacity: 0.8,
		marginLeft: 15,
		marginRight: 15,
		marginTop: 5,
		borderTopLeftRadius: 3,
		borderTopRightRadius: 3
	},
	submitButton: {
		flexDirection: "row",
		backgroundColor: "grey",
		opacity: 0.8,
		padding: 10,
		borderColor: "#d6d7da",
		borderWidth: 0.5
	}
})
