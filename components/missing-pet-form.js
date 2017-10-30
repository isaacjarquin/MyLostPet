import React from "react"
import { StyleSheet, View, TextInput, TouchableOpacity, Text, ScrollView, Image } from "react-native"
import { post } from "../services/items-api"
import pets from "../data/pets"
import locations from "../data/locations"
import { Divider, Button, Icon } from "react-native-elements"
import {Select, Option} from "react-native-chooser"
import DateTimePicker from 'react-native-modal-datetime-picker';
import imagePicker from 'react-native-imagepicker'
import { missingPetInitialState } from "../state/initialState"
import {
	presence,
	isValidNumber,
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
    this._handleDatePicked = this._handleDatePicked.bind(this)
    this._hideDateTimePicker = this._hideDateTimePicker.bind(this)
    this._showDateTimePicker = this._showDateTimePicker.bind(this)
    this._handleImagePicked = this._handleImagePicked.bind(this)

		this.state = missingPetInitialState
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
			location,
			description
		} = this.state

		if (!presence(name)) {
			this.setState({name: setValidation("El campo nombre es obligatorio")})
		}

		if (!isValidEmail(email)) {
			this.setState({email: setValidation("Debes introducir un formato valido de email")})
		}

		if (!presence(province)) {
			this.setState({province: setValidation("El campo provincia es obligatorio")})
		}

		if (!presence(autonomousComunity)) {
			this.setState({autonomousComunity: setValidation("El campo comunidad autonoma es obligatorio")})
		}

		if (!presence(type)) {
			this.setState({type: setValidation("El campo tipo de mascota es obligatorio")})
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
			{ field: size, validate: presence},
			{ field: location, validate: presence},
			{ field: description, validate: presence}
		]

		if (isInvalidForm(fields)) {
			this.setValidations()
			// console.log("this.state", this.state)
		} else {
			// console.log("everything is alright you should send the data")
		}
    // const adaptedItem = {
    //   name: this.props.name.value,
    //   email: this.props.email.value,
    //   kind: this.props.type.value,
    //   breed: this.props.breed.value,
    //   size: this.props.size.value,
    //   date: this.props.date.value,
    //   autonomous_comunity: this.props.autonomousComunity.value,
    //   province: this.props.province.value,
    //   location: this.props.location.value,
    //   info: this.props.description.value,
    //   image: secure_url (upload image to cloudinary and get secure_url from it)
    // }
    //
    // const headers = { "Content-Type": "application/json" }
    // const url = "https://items-api.herokuapp.com/api/items"
    // const body = { item: adaptedItem }
    //
    // post(url, headers, body)
    //   .then((response) => console.log('response', response))
    //   .catch((reason) => console.log('error reason', reason))
  }

  setProvince (text) {
		this.setState({province: {value: text}})
	}

	setAutonomousComunity (text) {
		const location = locations.find((location) => location.value === text)

		this.setState({autonomousComunity: { value: text }})
		this.setState({provincias: location.provincias})
	}

  _showDateTimePicker () {
    this.setState({ isDateTimePickerVisible: true })
  }

  _hideDateTimePicker () {
    this.setState({ isDateTimePickerVisible: false })
  }

  _handleDatePicked (date) {
    this.setState({ date: {value: date.toISOString().split('T')[0]} })
    this._hideDateTimePicker();
  }

  _handleImagePicked () {
    imagePicker.open({
        takePhoto: true,
        useLastPhoto: true,
        chooseFromLibrary: true
    }).then(({ uri, width, height }) => {
        this.setState({
          camaraPhotoImage: {
            icon: { name: "check" },
            text: "La foto se ha añadido con exito",
            backgroundColor: "#03C03C"
          }
        })
    }, (error) => {
        console.log('error', error);
    });
  }

	render () {
		return (
      <ScrollView>
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
          keyboardType={"email-address"}
					placeholder={this.state.email.validationMessage}
					placeholderTextColor={this.state.email.validationMessageColor}
					borderColor={this.state.email.validationFieldBorderColor}
					onChangeText={(text) => this.setState({email: {value: text, validationFieldBorderColor: "grey", validationMessageColor: "grey", validationMessage: ""}})}
					value={this.state.email.value}
				/>

        <Select
					defaultText={this.state.type.validationMessage}
					style={[styles.select, {borderColor: this.state.type.validationFieldBorderColor}]}
					textStyle={{color: this.state.type.validationMessageColor}}
					backdropStyle={{backgroundColor: "#d3d5d6"}}
					optionListStyle={{backgroundColor: "#F5FCFF"}}
					onSelect={(text) => this.setState({type: {value: text, validationFieldBorderColor: "grey", validationMessageColor: "grey", validationMessage: ""}})}
					selected={() => setSelectedText(this.state.type.value)}
				>
					{pets.map((pet) => <Option key={pet.id} value={pet.value}>{pet.value}</Option>)}
				</Select>

        <TextInput
					style={styles.textInput}
					placeholder={this.state.breed.validationMessage}
					placeholderTextColor={this.state.breed.validationMessageColor}
					borderColor={this.state.breed.validationFieldBorderColor}
					onChangeText={(text) => this.setState({breed: {value: text, validationFieldBorderColor: "grey", validationMessageColor: "grey", validationMessage: ""}})}
					value={this.state.breed.value}
				/>

				<TextInput
					style={styles.textInput}
					placeholder={this.state.size.validationMessage}
					placeholderTextColor={this.state.size.validationMessageColor}
					borderColor={this.state.size.validationFieldBorderColor}
					onChangeText={(text) => this.setState({size: {value: text, validationFieldBorderColor: "grey", validationMessageColor: "grey", validationMessage: ""}})}
					value={this.state.size.value}
				/>

        <TouchableOpacity onPress={this._showDateTimePicker}>
          <Text style={styles.text} >
            {this.state.date.value}
          </Text>
        </TouchableOpacity>

        <DateTimePicker
            isVisible={this.state.isDateTimePickerVisible}
            onConfirm={this._handleDatePicked}
            onCancel={this._hideDateTimePicker}
          />

        <Select
          defaultText={this.state.autonomousComunity.validationMessage}
          style={[styles.select, {borderColor: this.state.autonomousComunity.validationFieldBorderColor}]}
          textStyle={{color: this.state.autonomousComunity.validationMessageColor}}
          backdropStyle={{backgroundColor: "#d3d5d6"}}
          optionListStyle={{backgroundColor: "#F5FCFF"}}
          onSelect={this.setAutonomousComunity}
          selected={() => setSelectedText(this.state.autonomousComunity.value)}
        >
          {locations.map((location) => <Option key={location.id} value={location.value}>{location.value}</Option>)}
        </Select>

        <Select
          defaultText={this.state.province.validationMessage}
          style={[styles.select, {borderColor: this.state.province.validationFieldBorderColor}]}
          textStyle={{color: this.state.province.validationMessageColor}}
          backdropStyle={{backgroundColor: "#d3d5d6"}}
          optionListStyle={{backgroundColor: "#F5FCFF"}}
          onSelect={this.setProvince}
          selected={() => setSelectedText(this.state.province.value)}
        >
          {this.state.provincias.map((provincia) => <Option key={provincia.id} value={provincia.value}>{provincia.value}</Option>)}
        </Select>

        <TextInput
					style={styles.textInput}
					placeholder={this.state.location.validationMessage}
					placeholderTextColor={this.state.location.validationMessageColor}
					borderColor={this.state.location.validationFieldBorderColor}
					onChangeText={(text) => this.setState({location: {value: text, validationFieldBorderColor: "grey", validationMessageColor: "grey", validationMessage: ""}})}
					value={this.state.location.value}
				/>

        <TextInput
          style={styles.textInput}
          placeholder={this.state.description.validationMessage}
          placeholderTextColor={this.state.description.validationMessageColor}
          borderColor={this.state.description.validationFieldBorderColor}
          onChangeText={(text) => this.setState({description: {value: text, validationFieldBorderColor: "grey", validationMessageColor: "grey", validationMessage: ""}})}
          value={this.state.description.value}
        />

        <TouchableOpacity onPress={this._handleImagePicked}>
          <View style={[styles.addImage, {backgroundColor: this.state.camaraPhotoImage.backgroundColor}]} >
             <Text style={styles.addImageText} >{this.state.camaraPhotoImage.text}</Text>
             <Icon style={styles.addImageIcon} color='white' type="evilicon" name={this.state.camaraPhotoImage.icon.name} size={50} />
         </View>
        </TouchableOpacity>

				<Divider style={styles.divider} />

				<Button
					style={styles.button}
					borderRadius={3}
					large
					onPress={this.sendPetData}
					title='Buscar' />
      </ScrollView>
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
  text: {
    padding: 10,
    paddingLeft: 20,
    marginLeft: 20,
    marginRight: 20,
    marginBottom: 10,
    marginTop: 10,
    borderColor: "grey",
    color: "grey",
    borderWidth: 1,
    backgroundColor: "#D8D8D8",
  },
  addImage: {
    flex: 1,
    padding: 5,
    flexDirection: 'row',
    marginTop: 10,
    marginLeft: 20,
    marginRight: 20,
    borderWidth: 1,
    borderColor: "grey"
  },
  addImageIcon: {
    color:'#517fa4'
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
		borderWidth: 1,
		marginTop: 10,
		marginRight:20,
		marginLeft: 20,
		marginBottom: 10,
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
		marginBottom: 10,
		paddingLeft: 20,
		paddingRight: 20,
		paddingTop: 10
	},
  select: {
		alignSelf: "stretch",
		marginTop: 10,
    marginBottom: 10,
    marginLeft: 20,
    marginRight: 20,
    paddingLeft: 20,
		paddingRight: 20,
		width: "90%",
		borderWidth: 1,
    backgroundColor: "#D8D8D8"
	},
	divider: {
    margin: 20,
		backgroundColor: "#d3d5d6"
	},
  icon: {
		width: 40,
		height: 40,
		borderRadius: 27,
		marginTop: 20,
		marginRight: 20,
		marginLeft: 20
	},
	button: {
		marginBottom: 20
	},
	buttonText: {
		color: "#FAFAFA",
		fontSize: 20,
    marginTop: 10,
    marginBottom: 10,
    paddingLeft: 20,
		paddingRight: 20,
		fontWeight: "600"
	}
})
