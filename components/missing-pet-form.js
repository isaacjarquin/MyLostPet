import React from "react"
import { StyleSheet, View, TextInput, TouchableOpacity, Text, ScrollView } from "react-native"
import { post } from "../services/items-api"
import pets from "../data/pets"
import locations from "../data/locations"
import { Divider, Button, Icon } from "react-native-elements"
import DateTimePicker from "react-native-modal-datetime-picker"
import imagePicker from "react-native-imagepicker"
import { missingPetInitialState } from "../state/initialState"
import CustomizedPicker from "./customized-picker"
import ProgressAnimation from "./progress-animation"
import OperationMessage from "./operation-message"
import request from "superagent"

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
        this.hideAnimation = this.hideAnimation.bind(this)

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

    hideAnimation() {
        this.setState({showOperationMessage: false})
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
            this.setState({ type: setValidation("El campo tipo de mascota es obligatorio")})
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
            this.setState({province: setValidation("El campo provincia es obligatorio")})
        }

        if (!presence(autonomousComunity)) {
            this.setState({autonomousComunity: setValidation("El campo comunidad autónoma es obligatorio")})
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
            this.setState({showProgressAnimation: true})
            this.uploadImageToCloudinary()
                .then(({secure_url}) => this.sendPetDataToItemsAPI(secure_url))
                .catch(() => {
                    this.setState({showProgressAnimation: false})
                    this.showUnSuccesfullMessage()
                })
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
            .then(() => {
                this.setState({showProgressAnimation: false})
                this.setState({showOperationMessage: true})
                this.setState({showSuccesfullMessage: true})
            })
            .catch(() => {
                this.setState({showProgressAnimation: false})
                this.setState({showOperationMessage: true})
                this.setState({showUnSuccesfullMessage: true})
            })
    }

    uploadImageToCloudinary() {
        var file = {
			    uri: this.state.camaraPhotoImage.url,
			    type: "image/jpeg",
			    name: "missing-pet.jpg",
        }
        return (
            new Promise((resolve, reject) => {
                const self = this
				        request.post("https://api.cloudinary.com/v1_1/my-lost-pet/image/upload")
				          .field("upload_preset", "ak0f1cnm")
				          .field("file", file)
				          .on("progress", function (e) {
                        self.setState({progress: Math.trunc(e.percent)})
                        console.log("progress", Math.trunc(e.percent))
				          })
				          .end((err, response) => {
                        console.log("response.body", response.body)
                        console.log("err", err)
				            resolve(response.body)
				            reject(err)
				          })
				      }).then((cloudinaryResponse) => cloudinaryResponse)
        )
    }

    setProvince (text) {
        this.setState({province: {value: text, validationMessageColor: "#99d1ed", validationFieldBorderColor: "#99d1ed"}})
    }

    setAutonomousComunity (text) {
        const location = locations.find((location) => location.value === text)

        this.setState({autonomousComunity: { value: text, validationMessageColor: "#99d1ed", validationFieldBorderColor: "#99d1ed" }})
        this.setState({provincias: location.provincias})
    }

    setPetType(text) {
        this.setState({type: {value: text, validationFieldBorderColor: "#99d1ed", validationMessageColor: "#99d1ed", validationMessage: ""}})
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
        this.setState({ date: {value: date.toISOString().split("T")[0], validationMessageColor: "#99d1ed", validationFieldBorderColor: "#99d1ed"} })
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
        const { showProgressAnimation, showSuccesfullMessage, showOperationMessage, showUnSuccesfullMessage, progress } = this.state

        return (
            <ScrollView>
                <View style={styles.mainContainer}>
                    <TextInput
                        style={[styles.textInput, {color: this.state.name.validationFieldBorderColor}]}
                        placeholder={this.state.name.validationMessage}
                        placeholderTextColor={this.state.name.validationMessageColor}
                        borderColor={this.state.name.validationFieldBorderColor}
                        onChangeText={(text) => this.setState({name: {value: text, validationFieldBorderColor: "#99d1ed", validationMessageColor: "grey", validationMessage: ""}})}
                        value={this.state.name.value}
                    />

                    <TextInput
                        style={[styles.textInput, {color: this.state.email.validationFieldBorderColor}]}
                        keyboardType={"email-address"}
                        placeholder={this.state.email.validationMessage}
                        placeholderTextColor={this.state.email.validationMessageColor}
                        borderColor={this.state.email.validationFieldBorderColor}
                        onChangeText={(text) => this.setState({email: {value: text, validationFieldBorderColor: "#99d1ed", validationMessageColor: "grey", validationMessage: ""}})}
                        value={this.state.email.value}
                    />

                    <TouchableOpacity style={[styles.select, {borderColor: this.state.type.validationMessageColor}]} onPress={this._showPetTypeModal} >
                        <Text style={[styles.selectText, {color: this.state.type.validationMessageColor}]} >{this.state.type.value === "" || this.state.type.value === undefined ? this.state.type.validationMessage : this.state.type.value}</Text>
                        <Icon style={styles.selectIcon} color={this.state.type.validationMessageColor} type="MaterialIcons" name="keyboard-arrow-down" size={20} />
                    </TouchableOpacity>
                    <CustomizedPicker
                        items={pets}
                        isVisible={this.state.isPetTypeModalVisible}
                        hidePetTypeModal={this._hidePetTypeModal}
                        handler={this.setPetType}
                    />

                    <TextInput
                        style={[styles.textInput, {color: this.state.breed.validationFieldBorderColor}]}
                        placeholder={this.state.breed.validationMessage}
                        placeholderTextColor={this.state.breed.validationMessageColor}
                        borderColor={this.state.breed.validationFieldBorderColor}
                        onChangeText={(text) => this.setState({breed: {value: text, validationFieldBorderColor: "#99d1ed", validationMessageColor: "grey", validationMessage: ""}})}
                        value={this.state.breed.value}
                    />

                    <TextInput
                        style={[styles.textInput, {color: this.state.size.validationFieldBorderColor}]}
                        placeholder={this.state.size.validationMessage}
                        placeholderTextColor={this.state.size.validationMessageColor}
                        borderColor={this.state.size.validationFieldBorderColor}
                        onChangeText={(text) => this.setState({size: {value: text, validationFieldBorderColor: "#99d1ed", validationMessageColor: "grey", validationMessage: ""}})}
                        value={this.state.size.value}
                    />

                    <TouchableOpacity onPress={this._showDateTimePicker}>
                        <View style={[styles.calendarSelect, {backgroundColor: this.state.date.validationBackgroundColor, borderColor: this.state.date.validationFieldBorderColor}]} >
                            <Text style={[styles.calendarText, {color: this.state.date.validationMessageColor}]} >
                                {this.state.date.value}
                            </Text>
                            <Icon color={this.state.date.validationMessageColor} type="evilicon" name="calendar" size={30} />
                        </View>
                    </TouchableOpacity>

                    <DateTimePicker
                        isVisible={this.state.isDateTimePickerVisible}
                        onConfirm={this._handleDatePicked}
                        onCancel={this._hideDateTimePicker}
                        date={this.props.date || new Date()}
                    />

                    <TouchableOpacity style={[styles.select, {borderColor: this.state.autonomousComunity.validationMessageColor}]} onPress={this._showAutonomousComunityModal} >
                        <Text style={[styles.selectText, {color: this.state.autonomousComunity.validationMessageColor}]}>{this.state.autonomousComunity.value === "" || this.state.autonomousComunity.value === undefined ? "Comunidad autónoma" : this.state.autonomousComunity.value}</Text>
                        <Icon style={styles.selectIcon} color={this.state.autonomousComunity.validationMessageColor} type="MaterialIcons" name="keyboard-arrow-down" size={20} />
                    </TouchableOpacity>
                    <CustomizedPicker
                        items={locations}
                        isVisible={this.state.isAutonomousComunityModalVisible}
                        hidePetTypeModal={this._hideAutonomousComunityModal}
                        handler={this.setAutonomousComunity}
                    />

                    <TouchableOpacity style={[styles.select, {borderColor: this.state.province.validationMessageColor}]} onPress={this._showProvinceModal} >
                        <Text style={[styles.selectText, {color: this.state.province.validationMessageColor}]}>{this.state.province.value === ""  || this.state.province.value === undefined ? "Provincia" : this.state.province.value }</Text>
                        <Icon style={styles.selectIcon} color={this.state.province.validationMessageColor} type="MaterialIcons" name="keyboard-arrow-down" size={20} />
                    </TouchableOpacity>
                    <CustomizedPicker
                        items={this.state.provincias}
                        isVisible={this.state.isProvinceModalVisible}
                        hidePetTypeModal={this._hideProvinceModal}
                        handler={this.setProvince}
                    />

                    <TextInput
                        style={[styles.textInput, {color: this.state.location.validationFieldBorderColor}]}
                        placeholder={this.state.location.validationMessage}
                        placeholderTextColor={this.state.location.validationMessageColor}
                        borderColor={this.state.location.validationFieldBorderColor}
                        onChangeText={(text) => this.setState({location: {value: text, validationFieldBorderColor: "#99d1ed", validationMessageColor: "grey", validationMessage: ""}})}
                        value={this.state.location.value}
                    />

                    <TextInput
                        style={[styles.textInput, {color: this.state.description.validationFieldBorderColor}]}
                        placeholder={this.state.description.validationMessage}
                        placeholderTextColor={this.state.description.validationMessageColor}
                        borderColor={this.state.description.validationFieldBorderColor}
                        onChangeText={(text) => this.setState({description: {value: text, validationFieldBorderColor: "#99d1ed", validationMessageColor: "grey", validationMessage: ""}})}
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
                        backgroundColor={"grey"}
                        large
                        onPress={this.sendPetData}
                        title='Guardar datos' />

                    {showProgressAnimation && <ProgressAnimation progress={progress}/>}
                    {showOperationMessage && <OperationMessage showSuccesfullMessage={showSuccesfullMessage} showUnSuccesfullMessage={showUnSuccesfullMessage} hideAnimation={this.hideAnimation} />}
                </View>
            </ScrollView>
        )
    }
}

const styles = StyleSheet.create({
    mainContainer: {
        backgroundColor: "white"
    },
    select: {
        flexDirection: "row",
        margin: 10,
        padding: 15,
        backgroundColor: "white",
        borderColor: "#d6d7da",
        borderWidth: 0.5
    },
    loader: {
        alignSelf: "center"
    },
    progressText: {
        marginTop: 2,
        alignSelf: "center",
        fontSize: 14
    },
    selectText: {
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
        height: 50,
        fontSize: 14,
        color: "grey",
        borderWidth: 0.5,
        margin: 10,
        borderColor: "grey",
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
