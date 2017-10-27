import React from "react"
import { StyleSheet, View, TextInput, Text } from "react-native"
import { FormLabel, Divider } from "react-native-elements"
import { Button } from "react-native-elements"
import DropdownAlert from 'react-native-dropdownalert'
import {
	presence,
	isValidNumber,
	isValidEmail,
	setValidation
} from "../utils/validations"

export default class ContactDetails extends React.Component {
	constructor (props, context) {
		super(props, context)
    this.sendDetails = this.sendDetails.bind(this)

		this.state = {
      name: {
        value: "",
        validationMessage: "",
        validationMessageColor: "transparent",
        validationFieldBorderColor: "grey"
      },
			email: {
        value: "",
        validationMessage: "",
        validationMessageColor: "transparent",
        validationFieldBorderColor: "grey"
      },
			phoneNumber: {
        value: "",
        validationMessage: "",
        validationMessageColor: "transparent",
        validationFieldBorderColor: "grey"
      },
			personalInformation: {
        value: "",
        validationMessage: "",
        validationMessageColor: "transparent",
        validationFieldBorderColor: "grey"
      }
		}
	}
  // ...
  onClose(data) {}

	isSuccessfulResponse({status}) {
  	return [200, 201, 202, 203, 204].includes(status)
	}

	showSuccesfullMessage(response) {
		const successMessage = "Los datos de contacto se han guardado correctamente"
		this.dropdown.alertWithType('success', 'La operación se ha completado con éxito', successMessage)
	}

	showUnSuccesfullMessage(response) {
		const errorMessage = "No se han podido guardar los datos devido a un error en la comunicación"
		this.dropdown.alertWithType('error', 'Error de comunicación', errorMessage)
	}

	formIsInvalid() {
		const { name, email, phoneNumber, personalInformation } = this.state

		return [
			presence(name),
			isValidEmail(email),
			isValidNumber(phoneNumber),
			presence(personalInformation)
		].includes(false)
	}

	setValidations() {
		const { name, email, phoneNumber, personalInformation } = this.state

		if (!presence(name)) {
			this.setState({name: setValidation("El campo nombre es obligatorio")})
		}

		if (!isValidEmail(email)) {
			this.setState({email: setValidation("Debes introducir un formato valido de email")})
		}

		if (!isValidNumber(phoneNumber)) {
			this.setState({phoneNumber: setValidation("Debes introducir un numero valido de telefono")})
		}

		if (!presence(personalInformation)) {
			this.setState({personalInformation: setValidation("El campo informacion personal es obligatorio")})
		}
	}

	sendDetails() {
		const { name, email, phoneNumber, personalInformation } = this.state
		const { pet_id }  = this.props.navigation.state.params
		const self = this

		if (this.formIsInvalid()) {
			this.setValidations()
		} else {
			const contactDetailsDecoreted = {
        name: name.value,
        email: email.value,
        phone_number: phoneNumber.value,
        details: personalInformation.value,
        item_id: pet_id
      }

			const headers = { 'Content-Type': 'application/json' }
			const url = `https://items-api.herokuapp.com/api/contact_details`

			fetch(url, {
        method: 'POST',
        headers: headers,
        body: JSON.stringify({ contact_detail: contactDetailsDecoreted })
      }).then(function (response) {
        if (self.isSuccessfulResponse(response)) {
          self.showSuccesfullMessage(response)
        } else {
          self.showUnSuccesfullMessage(response)
        }
      }).catch(function (err) {
        self.showUnSuccesfullMessage(err)
      })
		}
	}

	render () {

		return (
			<View style={styles.container}>
				<View>
					<FormLabel>Nombre</FormLabel>
          <TextInput
            style={styles.textInput}
            placeholder={this.state.name.validationMessage}
            placeholderTextColor={this.state.name.validationMessageColor}
            borderColor={this.state.name.validationFieldBorderColor}
            onChangeText={(text) => this.setState({name: {value: text, validationFieldBorderColor: "grey", validationMessageColor: "grey", validationMessage: ""}})}
            value={this.state.name.value}
            />

					<FormLabel>Correo</FormLabel>
          <TextInput
            style={styles.textInput}
            placeholder={this.state.email.validationMessage}
            placeholderTextColor={this.state.email.validationMessageColor}
            borderColor={this.state.email.validationFieldBorderColor}
            onChangeText={(text) => this.setState({email: {value: text, validationFieldBorderColor: "grey", validationMessageColor: "grey", validationMessage: ""}})}
            value={this.state.email.value}
            />

					<FormLabel>Número de teléfono</FormLabel>
          <TextInput
            style={styles.textInput}
            placeholder={this.state.phoneNumber.validationMessage}
            placeholderTextColor={this.state.phoneNumber.validationMessageColor}
            borderColor={this.state.phoneNumber.validationFieldBorderColor}
            onChangeText={(text) => this.setState({phoneNumber: {value: text, validationFieldBorderColor: "grey", validationMessageColor: "grey", validationMessage: ""}})}
            value={this.state.phoneNumber.value}
            />

          <FormLabel>Información personal</FormLabel>
          <TextInput
            style={styles.blockTextInput}
            multiline= {true}
            numberOfLines= {4}
            placeholder={this.state.personalInformation.validationMessage}
            placeholderTextColor={this.state.personalInformation.validationMessageColor}
            borderColor={this.state.personalInformation.validationFieldBorderColor}
            onChangeText={(text) => this.setState({personalInformation: {value: text, validationFieldBorderColor: "grey", validationMessageColor: "grey", validationMessage: ""}})}
            value={this.state.personalInformation.value}
            />

					<Divider style={styles.divider} />

					<Button
						style={styles.button}
						borderRadius={3}
						large
						onPress={this.sendDetails}
						title='Enviar mis datos' />

				</View>

				<DropdownAlert
					ref={ref => this.dropdown = ref}
					onClose={data => this.onClose(data)}
					closeInterval={6000}
					successColor={"#77DD77"}
					errorColor={"#ff3333"}
					/>

			</View>
		)
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "white",
		justifyContent: "flex-start",
		backgroundColor: "#F7F7F7",
		paddingTop: 20
	},
  textInput: {
    height: 40,
		fontSize: 14,
    borderWidth: 1,
		marginTop: 10,
		marginRight:20,
		marginLeft: 20,
		marginBottom: 20,
		opacity: 0.6,
    borderColor: "grey",
    paddingLeft: 20,
    paddingRight: 20
  },
  blockTextInput: {
    height: 100,
    borderColor: "grey",
		fontSize: 14,
    borderWidth: 1,
		marginTop: 10,
		marginRight:20,
		marginLeft: 20,
		marginBottom: 20,
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 20
  },
	divider: {
		marginRight: 20,
		marginLeft: 20,
		marginBottom: 20,
		backgroundColor: "#d3d5d6"
	},
	button: {
		marginBottom: 20
	},
	buttonText: {
		color: "#FAFAFA",
		fontSize: 20,
		margin: 20,
		fontWeight: "600"
	}
})
