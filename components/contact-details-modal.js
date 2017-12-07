import React from "react"
import { StyleSheet, View, TextInput, Text, TouchableOpacity, Image } from "react-native"
import { Icon } from "react-native-elements"
import Modal from "react-native-modal"
import DropdownAlert from "react-native-dropdownalert"
import { contactDetailsInitialState } from "../state/initialState"
import { post } from "../services/items-api"

import {
    presence,
    isValidNumber,
    isValidEmail,
    setValidation,
    isInvalidForm
} from "../utils/validations"

export default class ContactDetailsModal extends React.Component {
    constructor (props, context) {
        super(props, context)
        this.sendDetails = this.sendDetails.bind(this)
        this._showModal = this._showModal.bind(this)
        this._hideModal = this._hideModal.bind(this)

        this.state = contactDetailsInitialState
    }

    _showModal () {
        this.setState({ isModalVisible: true })
    }

    _hideModal () {
        this.setState({ isModalVisible: false })
    }

    showSuccesfullMessage() {
        const successMessage = "Los datos de contacto se han guardado correctamente"
        this.dropdown.alertWithType("success", "La operación se ha completado con éxito", successMessage)
    }

    showUnSuccesfullMessage() {
        const errorMessage = "No se han podido guardar los datos devido a un error en la comunicación"
        this.dropdown.alertWithType("error", "Error de comunicación", errorMessage)
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
        const { petId }  = this.props

        const fields = [
            { field: name, validate: presence},
            { field: email, validate: isValidEmail},
            { field: phoneNumber, validate: isValidNumber},
            { field: personalInformation, validate: presence}
        ]

        if (isInvalidForm(fields)) {
            this.setValidations()
        } else {
            const contactDetailsDecoreted = {
                name: name.value,
                email: email.value,
                phone_number: phoneNumber.value,
                details: personalInformation.value,
                item_id: petId
            }

            const headers = { "Content-Type": "application/json" }
            const url = "https://items-api.herokuapp.com/api/contact_details"
            const body = JSON.stringify({ contact_detail: contactDetailsDecoreted })

            post(url, headers, body)
                .then(() => {
                    this._hideModal()
                    this.showSuccesfullMessage()
                })
                .catch(() => {
                    this._hideModal()
                    this.showUnSuccesfullMessage()
                })
        }
    }

    render () {

        return (
            <View style={styles.container}>
                <TouchableOpacity style={styles.contactButton} onPress={this._showModal} >
                    <Text style={styles.searchButton}>Contactar</Text>
                </TouchableOpacity>

                <Modal isVisible={this.state.isModalVisible} style={styles.contactDetailsModalContainer} >
                    <TouchableOpacity onPress={this._hideModal} >
	          <Icon color='grey' type="MaterialIcons" name="keyboard-arrow-down" size={30} />
                    </TouchableOpacity>

                    <View>
                        <TextInput
                            style={styles.textInput}
                            placeholder={this.state.name.validationMessage}
                            placeholderTextColor={this.state.name.validationMessageColor}
                            borderColor={this.state.name.validationFieldBorderColor}
                            onChangeText={(text) => this.setState({name: {value: text, validationFieldBorderColor: "grey", validationMessageColor: "grey", validationMessage: ""}})}
                            value={this.state.name.value}
                        />

                        <TextInput
                            style={styles.textInput}
                            placeholder={this.state.email.validationMessage}
                            placeholderTextColor={this.state.email.validationMessageColor}
                            borderColor={this.state.email.validationFieldBorderColor}
                            onChangeText={(text) => this.setState({email: {value: text, validationFieldBorderColor: "grey", validationMessageColor: "grey", validationMessage: ""}})}
                            value={this.state.email.value}
                        />

                        <TextInput
                            style={styles.textInput}
                            placeholder={this.state.phoneNumber.validationMessage}
                            placeholderTextColor={this.state.phoneNumber.validationMessageColor}
                            borderColor={this.state.phoneNumber.validationFieldBorderColor}
                            onChangeText={(text) => this.setState({phoneNumber: {value: text, validationFieldBorderColor: "grey", validationMessageColor: "grey", validationMessage: ""}})}
                            value={this.state.phoneNumber.value}
                        />

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

                        <TouchableOpacity style={styles.contactDetailSendButton} onPress={this.sendDetails} >
                            <Image source={require("../assets/icons/send.png")} style={styles.contactDetailSendButtonIcon} />
                            <Text style={styles.contactDetailSendButtonText}>Enviar mis datos</Text>
                        </TouchableOpacity>

                    </View>
                </Modal>

                <DropdownAlert
                    ref={ref => this.dropdown = ref}
                    closeInterval={6000}
                    successColor={"#77DD77"}
                    errorColor={"#ff3333"}
                />

            </View>
        )
    }
}

const styles = StyleSheet.create({
    contactDetailsModalContainer: {
        flexDirection: "column",
        backgroundColor: "#333333",
        marginTop: 270,
        borderTopLeftRadius: 3,
        borderTopRightRadius: 3
    },
    container: {
        flex: 1,
        backgroundColor: "white",
        justifyContent: "flex-start",
        backgroundColor: "#F7F7F7"
    },
    contactButton: {
        flexDirection: "row",
        backgroundColor: "#333333",
        opacity: 0.8,
        padding: 25
    },
    searchButton: {
        color: "white",
        alignSelf: "center",
        marginLeft: "35%",
        fontSize: 18
    },
    textInput: {
        height: 60,
        color: "black",
        fontSize: 16,
        borderWidth: 1,
        borderColor: "#333333",
        backgroundColor: "white",
        paddingLeft: 20,
        paddingRight: 20
    },
    blockTextInput: {
        height: 100,
        color: "black",
        backgroundColor: "white",
        borderColor: "#333333",
        fontSize: 16,
        borderWidth: 1,
        paddingLeft: 20,
        paddingRight: 20,
        paddingTop: 20
    },
    contactDetailSendButton: {
        flexDirection: "row",
        backgroundColor: "grey",
        padding: 20
    },
    contactDetailSendButtonText: {
        color: "white",
        fontSize: 20
    },
    contactDetailSendButtonIcon: {
        marginLeft: "15%",
        width: 25,
        height: 25,
        marginRight: 10
    }
})
