import React from "react"
import { StyleSheet, Text, View, TouchableOpacity } from "react-native"
import Modal from "react-native-modal"
import bodyParamsBuilder from "../utils/http-request.js"
import pets from "../data/pets"
import { get } from "../services/items-api"
import locations from "../data/locations"
import { Icon } from "react-native-elements"
import {Select, Option} from "react-native-chooser"

export default class SecondaryMenuModal extends React.Component {
	constructor (props, context) {
		super(props, context)

		this._showModal = this._showModal.bind(this)
		this._hideModal = this._hideModal.bind(this)
		this.getPets = this.getPets.bind(this)
		this.setType = this.setType.bind(this)
		this.setProvince = this.setProvince.bind(this)
		this.setAutonomousComunity = this.setAutonomousComunity.bind(this)

		this.state = {
			isModalVisible: false,
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

	setType (text) {
		this.setState({type: text})
	}

	setProvince (text) {
		this.setState({province: text})
	}

	setAutonomousComunity (text) {
		const location = locations.find((location) => location.value === text)

		this.setState({autonomousComunity: text})
		this.setState({provincias: location.provincias})
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
						<Select
							defaultText={"Tipo de mascota"}
							style={styles.select}
							textStyle={{color: "white"}}
							indicator="down"
							indicatorColor="white"
							backdropStyle={{backgroundColor: "#d3d5d6"}}
							optionListStyle={{backgroundColor: "#F5FCFF"}}
							onSelect={this.setType}
							selected={() => setSelectedText(this.state.type)}
						>
							{pets.map((pet) => <Option key={pet.id} value={pet.value}>{pet.value}</Option>)}
						</Select>

						<Select
							defaultText={"Comunidad autonoma"}
							style={styles.select}
							textStyle={{color: "white"}}
							indicator="down"
							indicatorColor="white"
							backdropStyle={{backgroundColor: "#d3d5d6"}}
							optionListStyle={{backgroundColor: "#F5FCFF"}}
							onSelect={this.setAutonomousComunity}
							selected={() => setSelectedText(this.state.autonomousComunity)}
						>
							{locations.map((location) => <Option key={location.id} value={location.value}>{location.value}</Option>)}
						</Select>

						<Select
							defaultText={"Provincia"}
							style={styles.select}
							textStyle={{color: "white"}}
							indicator="down"
							indicatorColor="white"
							backdropStyle={{backgroundColor: "#d3d5d6"}}
							optionListStyle={{backgroundColor: "#F5FCFF"}}
							onSelect={this.setProvince}
							selected={() => setSelectedText(this.state.province)}
						>
							{this.state.provincias.map((provincia) => <Option key={provincia.id} value={provincia.value}>{provincia.value}</Option>)}
						</Select>

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
		width: "100%",
		alignSelf: "center",
		padding: 20,
		backgroundColor: "black",
		opacity: 0.5,
		borderColor: "#d6d7da",
		borderWidth: 0.5
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
		marginTop: 385,
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
