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
	autonomousComunity: "",
	province: "",
	provincias: [],
	isDateTimePickerVisible: false,
	camaraPhotoImage: {
			icon: { name: "plus" },
			text: "Añade una foto de la mascota",
			backgroundColor: "skyblue",
	},
	name: {
		value: "Introduzca aquí su nombre",
		validationMessage: "",
		validationMessageColor: "transparent",
		validationFieldBorderColor: "grey"
	},
	email: {
		value: "Introduzca aquí su número de teléfono",
		validationMessage: "",
		validationMessageColor: "transparent",
		validationFieldBorderColor: "grey"
	},
	type: {
		value: "Introduzca aquí el tipo de mascota encontrado",
		validationMessage: "",
		validationMessageColor: "transparent",
		validationFieldBorderColor: "grey"
	},
	breed: {
		value: "Introduzca aquí la raza del animal encontrado",
		validationMessage: "",
		validationMessageColor: "transparent",
		validationFieldBorderColor: "grey"
	},
	size: {
		value: "Introduzca aquí el tamaño aprox",
		validationMessage: "",
		validationMessageColor: "transparent",
		validationFieldBorderColor: "grey"
	},
	date: {
		value: "Seleccione el dia que encontro a la mascota"
	},
	location: {
		value: "Introduzca aquí el lugar donde encontro la mascota",
		validationMessage: "",
		validationMessageColor: "transparent",
		validationFieldBorderColor: "grey"
	},
	description: {
		value: "Introduzca aquí una description del animal",
		validationMessage: "",
		validationMessageColor: "transparent",
		validationFieldBorderColor: "grey"
	}
}

module.exports = {
	contactDetailsInitialState,
	missingPetInitialState
}
