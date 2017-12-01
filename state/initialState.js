const contactDetailsInitialState = {
	isModalVisible: false,
	name: {
		value: "",
		validationMessage: "Nombre",
		validationMessageColor: "black",
		validationFieldBorderColor: "grey"
	},
	email: {
		value: "",
		validationMessage: "Correo",
		validationMessageColor: "black",
		validationFieldBorderColor: "grey"
	},
	phoneNumber: {
		value: "",
		validationMessage: "Número de teléfono",
		validationMessageColor: "black",
		validationFieldBorderColor: "grey"
	},
	personalInformation: {
		value: "",
		validationMessage: "Información personal",
		validationMessageColor: "black",
		validationFieldBorderColor: "grey"
	}
}

const missingPetInitialState = {
	provincias: [],
	isDateTimePickerVisible: false,
	isPetTypeModalVisible: false,
	isProvinceModalVisible: false,
	isAutonomousComunityModalVisible: false,
	camaraPhotoImage: {
		icon: { name: "plus" },
		text: "Añade una foto de la mascota",
		backgroundColor: "#99d1ed",
	},
	province: {
		value: "",
		validationMessage: "Seleccione la provincia",
		validationMessageColor: "grey",
		validationFieldBorderColor: "grey",
		validationBackgroundColor: "transparent"
	},
	autonomousComunity: {
		value: "",
		validationMessage: "Seleccione la comunidad autónoma",
		validationMessageColor: "grey",
		validationFieldBorderColor: "grey",
		validationBackgroundColor: "transparent"
	},
	name: {
		value: "",
		validationMessage: "Introduzca aquí su nombre",
		validationMessageColor: "grey",
		validationFieldBorderColor: "grey"
	},
	email: {
		value: "",
		validationMessage: "Introduzca aquí su correo electronico",
		validationMessageColor: "grey",
		validationFieldBorderColor: "grey"
	},
	type: {
		value: "",
		validationMessage: "Seleccione el tipo de mascota",
		validationMessageColor: "grey",
		validationFieldBorderColor: "grey",
		validationBackgroundColor: "transparent"
	},
	breed: {
		value: "",
		validationMessage: "Introduzca aquí la raza del animal encontrado",
		validationMessageColor: "grey",
		validationFieldBorderColor: "grey"
	},
	size: {
		value: "",
		validationMessage: "Introduzca aquí el tamaño aproximado",
		validationMessageColor: "grey",
		validationFieldBorderColor: "grey"
	},
	date: {
		value: "Seleccione cuando encontro a la mascota",
		validationMessage: "",
		validationMessageColor: "grey",
		validationFieldBorderColor: "grey",
		validationBackgroundColor: "transparent"
	},
	location: {
		value: "",
		validationMessage: "Introduzca aquí la ciudad o municipio",
		validationMessageColor: "grey",
		validationFieldBorderColor: "grey"
	},
	description: {
		value: "",
		validationMessage: "Introduzca aquí una description del animal",
		validationMessageColor: "grey",
		validationFieldBorderColor: "grey"
	}
}

module.exports = {
	contactDetailsInitialState,
	missingPetInitialState
}
