import React from "react"
import { StyleSheet, View, TextInput, Text } from "react-native"
import { FormLabel, Divider } from "react-native-elements"
import { Button } from "react-native-elements"

export default class ContactDetails extends React.Component {
	constructor (props, context) {
		super(props, context)
    this.sendDetails = this.sendDetails.bind(this)

		this.state = {
			name: "",
			email: "",
			phoneNumber: "",
			personalInformation: "",
      nameBorderColor: "grey",
      placeholderNameTextColor: "grey",
      nameValidationMessage: ""
		}
	}

	sendDetails () {
    this.setState({
      nameValidationMessage: "El campo nombre es obligatorio",
      placeholderNameTextColor: "#ff9999",
      nameBorderColor: "red"
    })
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
	}

	render () {

		return (
			<View style={styles.container}>
				<View>
					<FormLabel>Nombre</FormLabel>
          <TextInput
            style={styles.textInput}
            placeholder={this.state.nameValidationMessage}
            placeholderTextColor={this.state.placeholderNameTextColor}
            borderColor={this.state.nameBorderColor}
            onChangeText={(text) => this.setState({name: text, nameBorderColor: "grey", placeholderNameTextColor: "grey", nameValidationMessage: ""})}
            value={this.state.name}
            />


					<FormLabel>Correo</FormLabel>
          <TextInput
            style={styles.textInput}
            keyboardType={'email-address'}
            onChangeText={(text) => this.setState({email: text})}
            value={this.state.email}
            />

					<FormLabel>Número de teléfono</FormLabel>
          <TextInput
            style={styles.textInput}
            keyboardType={'phone-pad'}
            onChangeText={(text) => this.setState({phoneNumber: text})}
            value={this.state.phoneNumber}
            />

          <FormLabel>Información personal</FormLabel>
          <TextInput
            style={styles.blockTextInput}
            multiline= {true}
            numberOfLines= {4}
            onChangeText={(text) => this.setState({personalInformation: text})}
            value={this.state.personalInformation}
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
    borderWidth: 1,
    margin: 20,
    borderColor: "grey",
    paddingLeft: 20,
    paddingRight: 20
  },
  blockTextInput: {
    height: 100,
    borderColor: 'gray',
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
