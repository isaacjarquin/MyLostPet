const contactDetailsInitialState = {
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

const missingPetInitialState = {
	provincias: [],
	isDateTimePickerVisible: false,
	camaraPhotoImage: {
			icon: { name: "plus" },
			text: "Añade una foto de la mascota",
			backgroundColor: "skyblue",
	},
	province: {
		value: "",
		validationMessage: "Seleccione la provincia",
		validationMessageColor: "grey",
		validationFieldBorderColor: "grey"
	},
	autonomousComunity: {
		value: "",
		validationMessage: "Seleccione la comunidad autónoma",
		validationMessageColor: "grey",
		validationFieldBorderColor: "grey"
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
		validationMessage: "Introduzca aquí el tipo de mascota encontrado",
		validationMessageColor: "grey",
		validationFieldBorderColor: "grey"
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
		value: "",
		validationMessage: "Seleccione el dia que encontro a la mascota",
		validationMessageColor: "grey",
		validationFieldBorderColor: "grey"
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
