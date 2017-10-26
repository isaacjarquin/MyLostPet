import React from "react"
import { StyleSheet, View, TextInput, Text } from "react-native"
import { FormLabel, Divider } from "react-native-elements"
import { Button } from "react-native-elements"
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
		if (this.formIsInvalid()) {
			this.setValidations()
		} else {
			// Send details to backend system
			// const url = `https://items-api.herokuapp.com/api/items${bodyParamsBuilder(this.state)}`
	    //
			// return fetch(url)
			// 	.then((response) => response.json())
			// 	.then((responseJson) => {
			// 		const { navigate } = this.props.navigation
			// 		navigate("SearchResultPage", { pets: responseJson.data })
			// 	})
			// 	.catch((error) => {
			// 		console.error(error)
			// 	})
			console.log('form is valid')
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
    margin: 20,
    borderColor: "grey",
    paddingLeft: 20,
    paddingRight: 20
  },
  blockTextInput: {
    height: 100,
    borderColor: 'gray',
		fontSize: 14,
    borderWidth: 1,
    margin: 20,
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
