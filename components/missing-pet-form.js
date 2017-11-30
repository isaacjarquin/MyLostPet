import React from "react"
import { StyleSheet, View, TextInput, TouchableOpacity, Text, ScrollView } from "react-native"
import { post } from "../services/items-api"
import pets from "../data/pets"
import locations from "../data/locations"
import { Divider, Button, Icon } from "react-native-elements"
import {Select, Option} from "react-native-chooser"
import DateTimePicker from "react-native-modal-datetime-picker"
import imagePicker from "react-native-imagepicker"
import { missingPetInitialState } from "../state/initialState"
import DropdownAlert from "react-native-dropdownalert"
import CustomizedPicker from "./customized-picker"

import {
	presence,
	isValidEmail,
	setValidation,
	isInvalidForm
} from "../utils/validations"

export default class MissingPetForm extends React.Component {
	constructor (props, context) {
		super(props, context)

		this.sendPetData = this.sendPetData.bind(this)
		this.setAutonomousComunity = this.setAutonomousComunity.bind(this)
		this.setProvince = this.setProvince.bind(this)
		this.setPetType = this.setPetType.bind(this)

		this._handleDatePicked = this._handleDatePicked.bind(this)
		this._hideDateTimePicker = this._hideDateTimePicker.bind(this)
		this._showDateTimePicker = this._showDateTimePicker.bind(this)

		this._hidePetTypeModal = this._hidePetTypeModal.bind(this)
		this._showPetTypeModal = this._showPetTypeModal.bind(this)

		this._showAutonomousComunityModal = this._showAutonomousComunityModal.bind(this)
		this._hideAutonomousComunityModal = this._hideAutonomousComunityModal.bind(this)

		this._showProvinceModal = this._showProvinceModal.bind(this)
		this._hideProvinceModal = this._hideProvinceModal.bind(this)

		this._handleImagePicked = this._handleImagePicked.bind(this)

		this.state = missingPetInitialState
	}

	showSuccesfullMessage() {
		const successMessage = "Los datos de la mascota se han guardado correctamente"
		this.dropdown.alertWithType("success", "La operación se ha completado con éxito", successMessage)
	}

	showUnSuccesfullMessage() {
		const errorMessage = "No se han podido guardar los datos devido a un error en la comunicación"
		this.dropdown.alertWithType("error", "Error de comunicación", errorMessage)
	}

	setValidations() {
		const {
			name,
			email,
			province,
			autonomousComunity,
			type,
			breed,
			size,
			date,
			location,
			camaraPhotoImage,
			description
		} = this.state

		if (!presence(type)) {
			this.setState(
				{ type: {
					validationMessage: "\"El campo tipo de mascota es obligatorio\"",
					validationMessageColor: "white",
					validationBackgroundColor: "#FF6961"
				}
				})
		}

		if (date.value === "Seleccione cuando encontro a la mascota") {
			this.setState(
				{date: {
					value: "Debe seleccionar una fecha válida",
					validationMessageColor: "white",
					validationBackgroundColor: "#FF6961"
				}
				})
		}

		if (camaraPhotoImage.text === "Añade una foto de la mascota") {
			this.setState({camaraPhotoImage: {text: "Añada una foto de la mascota", backgroundColor: "#FF6961", icon: {name: "plus"}}})
		}

		if (!presence(province)) {
			this.setState({province: {validationMessage: "El campo provincia es obligatorio", validationMessageColor: "white", validationBackgroundColor: "#FF6961"}})
		}

		if (!presence(autonomousComunity)) {
			this.setState({autonomousComunity: {validationMessage: "El campo comunidad autonoma es obligatorio", validationMessageColor: "white", validationBackgroundColor: "#FF6961"}})
		}

		if (!presence(name)) {
			this.setState({name: setValidation("El campo nombre es obligatorio")})
		}

		if (!isValidEmail(email)) {
			this.setState({email: setValidation("Debes introducir un formato valido de email")})
		}

		if (!presence(breed)) {
			this.setState({breed: setValidation("El campo raza es obligatorio")})
		}

		if (!presence(size)) {
			this.setState({size: setValidation("El campo tamano es obligatorio")})
		}

		if (!presence(location)) {
			this.setState({location: setValidation("El campo ciudad o municipio es obligatorio")})
		}

		if (!presence(description)) {
			this.setState({description: setValidation("El campo descripcion es obligatorio")})
		}
	}

	sendPetData() {
		const {
			name,
			email,
			province,
			autonomousComunity,
			type,
			breed,
			size,
			date,
			location,
			description
		} = this.state

		const fields = [
			{ field: name, validate: presence},
			{ field: email, validate: isValidEmail},
			{ field: province, validate: presence},
			{ field: autonomousComunity, validate: presence},
			{ field: type, validate: presence},
			{ field: breed, validate: presence},
			{ field: date, validate: presence},
			{ field: size, validate: presence},
			{ field: location, validate: presence},
			{ field: description, validate: presence}
		]

		if (isInvalidForm(fields)) {
			this.setValidations()
		} else {
			this.uploadImageToCloudinary()
				.then(({secure_url}) => this.sendPetDataToItemsAPI(secure_url))
				.catch(() => this.showUnSuccesfullMessage())
		}
	}

	sendPetDataToItemsAPI(secure_url) {
		const adaptedItem = {
			name: this.state.name.value,
			email: this.state.email.value,
			kind: this.state.type.value,
			breed: this.state.breed.value,
			size: this.state.size.value,
			date: this.state.date.value,
			autonomous_comunity: this.state.autonomousComunity.value,
			province: this.state.province.value,
			location: this.state.location.value,
			info: this.state.description.value,
			image: secure_url
		}

		const headers = { "Content-Type": "application/json" }
		const url = "https://items-api.herokuapp.com/api/items"
		const body = JSON.stringify({ item: adaptedItem })

		post(url, headers, body)
			.then(() => this.showSuccesfullMessage())
			.catch(() => this.showUnSuccesfullMessage())
	}

	uploadImageToCloudinary() {
		 const headers = {
			"Accept": "application/json",
			"Content-Type": "application/json"
		 }

		const url = "https://api.cloudinary.com/v1_1/my-lost-pet/image/upload"
		const data = new FormData()
		var file = {
		    uri: this.state.camaraPhotoImage.url,
		    type: "image/jpeg",
		    name: "missing-pet.jpg",
		}

		data.append("upload_preset", "ak0f1cnm")
		data.append("file", file)
		data.append("name", "testName")

		return post(url, headers, data).then((response) => response)
	}

	setProvince (text) {
		this.setState({province: {value: text, validationMessageColor: "white", validationFieldBorderColor: "white"}})
	}

	setAutonomousComunity (text) {
		const location = locations.find((location) => location.value === text)

		this.setState({autonomousComunity: { value: text, validationMessageColor: "white", validationFieldBorderColor: "white" }})
		this.setState({provincias: location.provincias})
	}

	setPetType(text) {
		this.setState({type: {value: text, validationFieldBorderColor: "white", validationMessageColor: "white", validationMessage: ""}})
	}

	_showDateTimePicker () {
		this.setState({ isDateTimePickerVisible: true })
	}

	_hideDateTimePicker () {
		this.setState({ isDateTimePickerVisible: false })
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

	_handleDatePicked (date) {
		this.setState({ date: {value: date.toISOString().split("T")[0], validationMessageColor: "white", validationFieldBorderColor: "white"} })
		this._hideDateTimePicker()
	}

	_handleImagePicked () {
		imagePicker.open({
			takePhoto: true,
			useLastPhoto: true,
			chooseFromLibrary: true
		}).then(({ uri }) => {
			this.setState({
				camaraPhotoImage: {
					icon: { name: "check" },
					text: "La foto se ha añadido con exito",
					backgroundColor: "#03C03C",
					url: uri,
					secure_url: ""
				}
			})
		}, (error) => {
			console.log("error", error)
		})
	}

	render () {
		return (
			<ScrollView>
				<View style={styles.mainContainer}>
					<TextInput
						style={styles.textInput}
						placeholder={this.state.name.validationMessage}
						placeholderTextColor={this.state.name.validationMessageColor}
						borderColor={this.state.name.validationFieldBorderColor}
						onChangeText={(text) => this.setState({name: {value: text, validationFieldBorderColor: "white", validationMessageColor: "grey", validationMessage: ""}})}
						value={this.state.name.value}
					/>

					<TextInput
						style={styles.textInput}
						keyboardType={"email-address"}
						placeholder={this.state.email.validationMessage}
						placeholderTextColor={this.state.email.validationMessageColor}
						borderColor={this.state.email.validationFieldBorderColor}
						onChangeText={(text) => this.setState({email: {value: text, validationFieldBorderColor: "white", validationMessageColor: "grey", validationMessage: ""}})}
						value={this.state.email.value}
					/>

					<TouchableOpacity style={styles.select} onPress={this._showPetTypeModal} >
						<Text style={styles.selectText}>{this.state.type.value === "" ? "Tipo de mascota" : this.state.type.value}</Text>
						<Icon style={styles.selectIcon} color='white' type="MaterialIcons" name="keyboard-arrow-down" size={20} />
					</TouchableOpacity>
					<CustomizedPicker
						items={pets}
						isVisible={this.state.isPetTypeModalVisible}
						hidePetTypeModal={this._hidePetTypeModal}
						handler={this.setPetType}
					/>

					<TextInput
						style={styles.textInput}
						placeholder={this.state.breed.validationMessage}
						placeholderTextColor={this.state.breed.validationMessageColor}
						borderColor={this.state.breed.validationFieldBorderColor}
						onChangeText={(text) => this.setState({breed: {value: text, validationFieldBorderColor: "white", validationMessageColor: "grey", validationMessage: ""}})}
						value={this.state.breed.value}
					/>

					<TextInput
						style={styles.textInput}
						placeholder={this.state.size.validationMessage}
						placeholderTextColor={this.state.size.validationMessageColor}
						borderColor={this.state.size.validationFieldBorderColor}
						onChangeText={(text) => this.setState({size: {value: text, validationFieldBorderColor: "white", validationMessageColor: "grey", validationMessage: ""}})}
						value={this.state.size.value}
					/>

					<TouchableOpacity onPress={this._showDateTimePicker}>
						<View style={[styles.calendarSelect, {backgroundColor: this.state.date.validationBackgroundColor, borderColor: this.state.date.validationFieldBorderColor}]} >
							<Text style={[styles.calendarText, {color: this.state.date.validationMessageColor}]} >
								{this.state.date.value}
							</Text>
							<Icon color={this.state.date.validationFieldBorderColor} type="evilicon" name="calendar" size={30} />
						</View>
					</TouchableOpacity>

					<DateTimePicker
						isVisible={this.state.isDateTimePickerVisible}
						onConfirm={this._handleDatePicked}
						onCancel={this._hideDateTimePicker}
						date={this.props.date || new Date()}
					/>

					<TouchableOpacity style={styles.select} onPress={this._showAutonomousComunityModal} >
						<Text style={styles.selectText}>{this.state.autonomousComunity.value === "" ? "Comunidad autónoma" : this.state.autonomousComunity.value}</Text>
						<Icon style={styles.selectIcon} color='white' type="MaterialIcons" name="keyboard-arrow-down" size={20} />
					</TouchableOpacity>
					<CustomizedPicker
						items={locations}
						isVisible={this.state.isAutonomousComunityModalVisible}
						hidePetTypeModal={this._hideAutonomousComunityModal}
						handler={this.setAutonomousComunity}
					/>

					<TouchableOpacity style={styles.select} onPress={this._showProvinceModal} >
						<Text style={styles.selectText}>{this.state.province.value === "" ? "Provincia" : this.state.province.value }</Text>
						<Icon style={styles.selectIcon} color='white' type="MaterialIcons" name="keyboard-arrow-down" size={20} />
					</TouchableOpacity>
					<CustomizedPicker
						items={this.state.provincias}
						isVisible={this.state.isProvinceModalVisible}
						hidePetTypeModal={this._hideProvinceModal}
						handler={this.setProvince}
					/>

					<TextInput
						style={styles.textInput}
						placeholder={this.state.location.validationMessage}
						placeholderTextColor={this.state.location.validationMessageColor}
						borderColor={this.state.location.validationFieldBorderColor}
						onChangeText={(text) => this.setState({location: {value: text, validationFieldBorderColor: "white", validationMessageColor: "grey", validationMessage: ""}})}
						value={this.state.location.value}
					/>

					<TextInput
						style={styles.textInput}
						placeholder={this.state.description.validationMessage}
						placeholderTextColor={this.state.description.validationMessageColor}
						borderColor={this.state.description.validationFieldBorderColor}
						onChangeText={(text) => this.setState({description: {value: text, validationFieldBorderColor: "white", validationMessageColor: "grey", validationMessage: ""}})}
						value={this.state.description.value}
					/>

					<TouchableOpacity onPress={this._handleImagePicked}>
						<View style={[styles.addImage, {backgroundColor: this.state.camaraPhotoImage.backgroundColor}]} >
							<Text style={styles.addImageText} >{this.state.camaraPhotoImage.text}</Text>
							<Icon color='white' type="evilicon" name={this.state.camaraPhotoImage.icon.name} size={50} />
						</View>
					</TouchableOpacity>

					<Divider style={styles.divider} />

					<Button
						style={styles.button}
						borderRadius={3}
						backgroundColor={"#282828"}
						large
						onPress={this.sendPetData}
						title='Guardar datos' />
				</View>
				<DropdownAlert
					ref={ref => this.dropdown = ref}
					closeInterval={6000}
					successColor={"#77DD77"}
					errorColor={"#ff3333"}
				/>
			</ScrollView>
		)
	}
}

const styles = StyleSheet.create({
	mainContainer: {
		backgroundColor: "black",
		opacity: 0.8
	},
	optionListStyle: {
		backgroundColor: "white",
		borderColor: "black",
		width: "95%",
		borderRadius: 5
	},
	backdropStyle: {
		backgroundColor: "black",
		opacity: 0.8
	},
	select: {
		flexDirection: "row",
		margin: 10,
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
	addImage: {
		flex: 1,
		padding: 5,
		flexDirection: "row",
		margin: 10,
		borderWidth: 1,
		borderColor: "grey"
	},
	addImageText: {
		fontSize: 18,
		paddingTop: 10,
		color: "white",
		marginLeft: 20,
		marginRight: 10
	},
	textInput: {
		height: 40,
		fontSize: 14,
		color: "white",
		borderWidth: 0.5,
		margin: 10,
		borderColor: "grey",
		paddingTop: 25,
		paddingBottom: 25,
		paddingLeft: 15,
	},
	calendarSelect: {
		flex: 1,
		justifyContent: "space-between",
		margin: 10,
		paddingRight: 5,
		flexDirection: "row",
		borderWidth: 0.5
	},
	calendarText: {
		marginLeft: 15,
		marginBottom: 10,
		marginTop: 10,
		paddingTop: 5,
		paddingBottom: 5
	},
	divider: {
		margin: 10,
		marginBottom: 20,
		backgroundColor: "#d3d5d6"
	},
	button: {
		marginBottom: 15
	}
})
