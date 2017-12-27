import React from "react"
import { StyleSheet, View, TextInput, TouchableOpacity, Text, ScrollView, Dimensions, Platform, KeyboardAvoidingView, SafeAreaView } from "react-native"
import { Select, Option } from "react-native-chooser"
import { post } from "../services/items-api"
import pets from "../data/pets"
import locations from "../data/locations"
import { Icon } from "react-native-elements"
import DateTimePicker from "react-native-modal-datetime-picker"
import { missingPetInitialState } from "../state/initialState"
import CustomizedPicker from "./customized-picker"
import ProgressAnimation from "./progress-animation"
import OperationMessage from "./operation-message"
import request from "superagent"
import { ImagePicker } from "expo"

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
                    validationMessageColor: "red",
                    validationBackgroundColor: "white",
                    backgroundColor: "#FF6961",
                    iconType: "entypo",
                    icon: "cross"
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
				          })
				          .end((err, response) => {
				            resolve(response.body)
				            reject(err)
				          })
				      }).then((cloudinaryResponse) => cloudinaryResponse)
        )
    }

    setProvince (text) {
        this.setState({ province: { value: text, validationMessageColor: "green", validationFieldBorderColor: "green", backgroundColor: "#77DD77", icon: "check", iconType: "entypo"}})
    }

    setAutonomousComunity(text) {
        const location = locations.find((location) => location.value === text)

        this.setState({
            autonomousComunity: {
                value: text,
                validationFieldBorderColor: "green",
                validationMessageColor: "green",
                validationMessage: "",
                backgroundColor: "#77DD77",
                icon: "check",
                iconType: "entypo"
            }
        })
        this.setState({
            provincias: location.provincias
        })
    }

    setPetType(text) {
        this.setState({ type: { value: text, validationFieldBorderColor: "#99d1ed", validationMessageColor: "green", validationMessage: "", backgroundColor: "#77DD77", icon: "check", iconType: "entypo"}})
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
        this.setState({ date: { value: date.toISOString().split("T")[0], validationMessageColor: "green", validationFieldBorderColor: "#77DD77", backgroundColor: "#77DD77", icon: "check", iconType: "entypo"} })
        this._hideDateTimePicker()
    }

    _handleImagePicked () {
        ImagePicker.launchImageLibraryAsync({
            allowsEditing: true,
            quality: 0.5,
            aspect: [4, 3],
        }).then(({uri}) => {
            this.setState({
                camaraPhotoImage: {
                    icon: { name: "check" },
                    text: "La foto se ha añadido con exito",
                    backgroundColor: "#77DD77",
                    url: uri,
                    secure_url: ""
                }
            })
        }).catch(() => {
            this.setState({
                camaraPhotoImage: {
                    icon: { name: "plus" },
                    text: "La foto no se ha podido añadir",
                    backgroundColor: "red",
                    url: "",
                    secure_url: ""
                }
            })
        })
    }

    render () {
        const { showProgressAnimation, showSuccesfullMessage, showOperationMessage, showUnSuccesfullMessage, progress } = this.state

        return (
            <KeyboardAvoidingView behavior="padding" keyboardVerticalOffset={100} style={{ flex: 1 }}>
                <ScrollView>
                    <View style={styles.mainContainer}>
                        <View style={styles.textInputBlockElement}>
                            <Icon style={styles.fieldsIcons} color='white' backgroundColor={this.state.name.backgroundColor} type={this.state.name.iconType} name={this.state.name.icon} size={30} />
                            <TextInput
                                style={[styles.textInput, { color: this.state.name.validationFieldBorderColor }]}
                                placeholder={this.state.name.validationMessage}
                                underlineColorAndroid={"white"}
                                placeholderTextColor={this.state.name.validationMessageColor}
                                borderColor={this.state.name.validationFieldBorderColor}
                                onChangeText={(text) => this.setState({ name: { value: text, validationFieldBorderColor: "green", validationMessageColor: "grey", validationMessage: "", backgroundColor: "#77DD77", icon: "check", iconType: "entypo" } })}
                                value={this.state.name.value}
                            />
                        </View>
                        <View style={styles.textInputBlockElement}>
                            <Icon style={styles.fieldsIcons} color='white' backgroundColor={this.state.email.backgroundColor} type={this.state.email.iconType} name={this.state.email.icon} size={30} />
                            <TextInput
                                style={[styles.textInput, { color: this.state.email.validationFieldBorderColor }]}
                                keyboardType={"email-address"}
                                placeholder={this.state.email.validationMessage}
                                underlineColorAndroid={"white"}
                                placeholderTextColor={this.state.email.validationMessageColor}
                                borderColor={this.state.email.validationFieldBorderColor}
                                onChangeText={(text) => this.setState({ email: { value: text, validationFieldBorderColor: "green", validationMessageColor: "grey", validationMessage: "", backgroundColor: "#77DD77", icon: "check", iconType: "entypo" } })}
                                value={this.state.email.value}
                            />
                        </View>

                        {
                            Platform.OS === "ios" &&
                            <View style={styles.textInputBlockElement}>
                                <Icon style={styles.fieldsIcons} color='white' backgroundColor={this.state.type.backgroundColor} type={this.state.type.iconType} name={this.state.type.icon} size={30} />
                                <TouchableOpacity style={[styles.select, { borderColor: this.state.type.validationMessageColor }]} onPress={this._showPetTypeModal} >
                                    <Text style={[styles.selectText, { color: this.state.type.validationMessageColor }]} >{this.state.type.value === "" || this.state.type.value === undefined ? this.state.type.validationMessage : this.state.type.value}</Text>
                                    <Icon style={styles.selectIcon} color={this.state.type.validationMessageColor} type="MaterialIcons" name="keyboard-arrow-down" size={20} />
                                </TouchableOpacity>
                                <CustomizedPicker
                                    items={pets}
                                    isVisible={this.state.isPetTypeModalVisible}
                                    hidePetTypeModal={this._hidePetTypeModal}
                                    handler={this.setPetType}
                                />
                            </View>
                        }

                        {
                            Platform.OS === "android" &&
                            <View style={styles.textInputBlockElement}>
                                <Icon style={styles.fieldsIcons} color='white' backgroundColor={this.state.type.backgroundColor} type={this.state.type.iconType} name={this.state.type.icon} size={30} />
                                <Select 
                                    defaultText={this.state.type.validationMessage}
                                    style={[styles.androidSelect, { borderColor: this.state.type.validationFieldBorderColor, backgroundColor: this.state.type.validationBackgroundColor }]}
                                    textStyle={{ color: this.state.type.validationMessageColor }}
                                    indicator="down"
                                    indicatorColor={this.state.type.validationFieldBorderColor}
                                    backdropStyle={styles.backdropStyle}
                                    optionListStyle={styles.optionListStyle}
                                    onSelect={(text) => this.setState({ type: { value: text, validationFieldBorderColor: "green", validationMessageColor: "green", validationMessage: "", backgroundColor: "#77DD77", icon: "check", iconType: "entypo" } })}
                                    selected={() => setSelectedText(this.state.type.value)}>
                                    {pets.map((pet) => <Option style={{alignSelf: "center"}} key={pet.id} value={pet.value}>{pet.value}</Option>)}
                                </Select>
                            </View>
                        }

                        <View style={styles.textInputBlockElement}>
                            <Icon style={styles.fieldsIcons} color='white' backgroundColor={this.state.breed.backgroundColor} type={this.state.breed.iconType} name={this.state.breed.icon} size={30} />
                            <TextInput
                                style={[styles.textInput, { color: this.state.breed.validationFieldBorderColor }]}
                                placeholder={this.state.breed.validationMessage}
                                underlineColorAndroid={"white"}
                                placeholderTextColor={this.state.breed.validationMessageColor}
                                borderColor={this.state.breed.validationFieldBorderColor}
                                onChangeText={(text) => this.setState({ breed: { value: text, validationFieldBorderColor: "green", validationMessageColor: "grey", validationMessage: "", backgroundColor: "#77DD77", icon: "check", iconType: "entypo" } })}
                                value={this.state.breed.value}
                            />
                        </View>

                        <View style={styles.textInputBlockElement}>
                            <Icon style={styles.fieldsIcons} color='white' backgroundColor={this.state.size.backgroundColor} type={this.state.size.iconType} name={this.state.size.icon} size={30} />
                            <TextInput
                                style={[styles.textInput, { color: this.state.size.validationFieldBorderColor }]}
                                placeholder={this.state.size.validationMessage}
                                underlineColorAndroid={"white"}
                                placeholderTextColor={this.state.size.validationMessageColor}
                                borderColor={this.state.size.validationFieldBorderColor}
                                onChangeText={(text) => this.setState({ size: { value: text, validationFieldBorderColor: "green", validationMessageColor: "grey", validationMessage: "", backgroundColor: "#77DD77", icon: "check", iconType: "entypo" } })}
                                value={this.state.size.value}
                            />
                        </View>

                        <View style={styles.textInputBlockElement}>
                            <Icon style={styles.fieldsIcons} color='white' backgroundColor={this.state.date.backgroundColor} type={this.state.date.iconType} name={this.state.date.icon} size={30} />
                            <TouchableOpacity onPress={this._showDateTimePicker}>
                                <View style={[styles.calendarSelect, { backgroundColor: this.state.date.validationBackgroundColor, borderColor: this.state.date.validationMessageColor }]} >
                                    <Text style={[styles.calendarText, { color: this.state.date.validationMessageColor }]} >
                                        {this.state.date.value}
                                    </Text>
                                    <Icon color={this.state.date.validationMessageColor} type="entypo" name="select-arrows" size={20} />
                                </View>
                            </TouchableOpacity>

                            <DateTimePicker
                                isVisible={this.state.isDateTimePickerVisible}
                                onConfirm={this._handleDatePicked}
                                onCancel={this._hideDateTimePicker}
                                date={this.props.date || new Date()}
                            />
                        </View>

                        {
                            Platform.OS === "android" &&
                            <View style={styles.textInputBlockElement}>
                                <Icon style={styles.fieldsIcons} color='white' backgroundColor={this.state.autonomousComunity.backgroundColor} type={this.state.autonomousComunity.iconType} name={this.state.autonomousComunity.icon} size={30} />
                                <Select 
                                    defaultText={this.state.autonomousComunity.validationMessage}
                                    style={[styles.androidSelect, { borderColor: this.state.autonomousComunity.validationFieldBorderColor, backgroundColor: this.state.autonomousComunity.validationBackgroundColor }]}
                                    textStyle={{ color: this.state.autonomousComunity.validationMessageColor }}
                                    indicator="down"
                                    indicatorColor={this.state.autonomousComunity.validationFieldBorderColor}
                                    backdropStyle={styles.backdropStyle}
                                    optionListStyle={styles.optionListStyle}
                                    onSelect={this.setAutonomousComunity}
                                    selected={() => setSelectedText(this.state.autonomousComunity.value)} >

                                    {locations.map((location) => <Option style={{alignSelf: "center"}} key={location.id} value={location.value}>{location.value}</Option>)}
                                </Select>
                            </View>
                        }

                        {
                            Platform.OS === "android" &&
                            <View style={styles.textInputBlockElement}>
                                <Icon style={styles.fieldsIcons} color='white' backgroundColor={this.state.province.backgroundColor} type={this.state.province.iconType} name={this.state.province.icon} size={30} />
                                <Select
                                    defaultText={this.state.province.validationMessage}
                                    style={[styles.androidSelect, { borderColor: this.state.province.validationFieldBorderColor, backgroundColor: this.state.province.validationBackgroundColor }]}
                                    textStyle={{ color: this.state.province.validationMessageColor }}
                                    indicator="down"
                                    indicatorColor={this.state.province.validationFieldBorderColor}
                                    backdropStyle={styles.backdropStyle}
                                    optionListStyle={styles.optionListStyle}
                                    onSelect={this.setProvince}
                                    selected={() => setSelectedText(this.state.province.value)} >

                                    {this.state.provincias.map((provincia) => <Option style={{ alignSelf: "center" }} key={provincia.id} value={provincia.value}>{provincia.value}</Option>)}
                                </Select>
                            </View>
                        }

                        {
                            Platform.OS === "ios" &&
                            <View style={styles.textInputBlockElement}>
                                <Icon style={styles.fieldsIcons} color='white' backgroundColor={this.state.autonomousComunity.backgroundColor} type={this.state.autonomousComunity.iconType} name={this.state.autonomousComunity.icon} size={30} />
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
                            </View>}

                        {
                            Platform.OS === "ios" &&
                            <View style={styles.textInputBlockElement}>
                                <Icon style={styles.fieldsIcons} color='white' backgroundColor={this.state.province.backgroundColor} type={this.state.province.iconType} name={this.state.province.icon} size={30} />
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
                            </View>
                        }
                        
                        <View style={styles.textInputBlockElement}>
                            <Icon style={styles.fieldsIcons} color='white' backgroundColor={this.state.location.backgroundColor} type={this.state.location.iconType} name={this.state.location.icon} size={30} />
                            <TextInput
                                style={[styles.textInput, { color: this.state.location.validationFieldBorderColor }]}
                                placeholder={this.state.location.validationMessage}
                                underlineColorAndroid={"white"}
                                placeholderTextColor={this.state.location.validationMessageColor}
                                borderColor={this.state.location.validationFieldBorderColor}
                                onChangeText={(text) => this.setState({ location: { value: text, validationFieldBorderColor: "green", validationMessageColor: "grey", validationMessage: "", backgroundColor: "#77DD77", icon: "check", iconType: "entypo" } })}
                                value={this.state.location.value}
                            />
                        </View>
                        <View style={styles.textInputBlockElement}>
                            <Icon style={styles.fieldsIcons} color='white' backgroundColor={this.state.description.backgroundColor} type={this.state.description.iconType} name={this.state.description.icon} size={30} />
                            <TextInput
                                style={[styles.textInput, {color: this.state.description.validationFieldBorderColor}]}
                                placeholder={this.state.description.validationMessage}
                                underlineColorAndroid={"white"}
                                placeholderTextColor={this.state.description.validationMessageColor}
                                borderColor={this.state.description.validationFieldBorderColor}
                                onChangeText={(text) => this.setState({ description: { value: text, validationFieldBorderColor: "green", validationMessageColor: "grey", validationMessage: "", backgroundColor: "#77DD77", icon: "check", iconType: "entypo"}})}
                                value={this.state.description.value}
                            />
                        </View>

                        <TouchableOpacity onPress={this._handleImagePicked}>
                            <View style={[styles.addImage, {backgroundColor: this.state.camaraPhotoImage.backgroundColor}]} >
                                <Text style={styles.addImageText} >{this.state.camaraPhotoImage.text}</Text>
                                <Icon color='white' type="evilicon" name={this.state.camaraPhotoImage.icon.name} size={50} />
                            </View>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.button} onPress={this.sendPetData} >
                            <Text style={styles.searchButton}>Guardar datos</Text>
                        </TouchableOpacity>

                        {showProgressAnimation && <ProgressAnimation progress={progress}/>}
                        {showOperationMessage && <OperationMessage showSuccesfullMessage={showSuccesfullMessage} showUnSuccesfullMessage={showUnSuccesfullMessage} hideAnimation={this.hideAnimation} />}
                    </View>
                </ScrollView>
                <SafeAreaView />
            </KeyboardAvoidingView>
        )
    }
}

const window = Dimensions.get("window")

const styles = StyleSheet.create({
    mainContainer: {
        backgroundColor: "white"
    },
    textInputBlockElement: {
        flexDirection: "row"
    },
    fieldsIcons: {
        borderWidth: StyleSheet.hairlineWidth,
        borderColor: "grey",
        paddingTop: 8,
        paddingLeft: 4,
        width: 40,
        marginLeft: 4,
        marginTop: 4,
        marginBottom: 4
    },
    androidSelect: {
        marginBottom: 4,
        marginRight: 4,
        marginTop: 4,
        padding: 15,
        width: window.width - 48,
        backgroundColor: "white",
        borderColor: "#d6d7da",
        borderWidth: StyleSheet.hairlineWidth
    },
    optionListStyle: {
        backgroundColor: "white",
        borderColor: "black",
        width: "98%",
        height: "30%",
        borderRadius: 2
    },
    backdropStyle: {
        backgroundColor: "black",
        opacity: 0.8
    },
    select: {
        width: "87%",
        flexDirection: "row",
        marginRight: 4,
        marginTop: 4,
        marginBottom: 4,
        padding: 15,
        backgroundColor: "white",
        borderColor: "#d6d7da",
        borderWidth: StyleSheet.hairlineWidth
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
        padding: 10,
        flexDirection: "row",
        margin: 4,
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
        width: "87%",
        fontSize: 14,
        color: "grey",
        borderWidth: StyleSheet.hairlineWidth,
        marginRight: 4,
        marginTop: 4,
        marginBottom: 4,
        padding: 10,
        borderColor: "grey",
        paddingLeft: 15,
    },
    calendarSelect: {
        flex: 1,
        justifyContent: "space-between",
        width: window.width - 48,
        marginRight: 4,
        marginTop: 4,
        marginBottom: 4,
        paddingRight: 5,
        flexDirection: "row",
        borderWidth: StyleSheet.hairlineWidth
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
    searchButton: {
        fontSize: 16,
        color: "white",
        alignSelf: "center"
    },
    button: {
        backgroundColor: "#333333",
        opacity: 0.8,
        padding: 25
    }
})
