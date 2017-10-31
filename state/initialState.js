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
		validationFieldBorderColor: "grey",
		validationBackgroundColor: "#D3D3D3"
	},
	autonomousComunity: {
		value: "",
		validationMessage: "Seleccione la comunidad autónoma",
		validationMessageColor: "grey",
		validationFieldBorderColor: "grey",
		validationBackgroundColor: "#D3D3D3"
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
		validationMessage: "Introduzca aquí el tipo de mascota",
		validationMessageColor: "grey",
		validationFieldBorderColor: "grey",
		validationBackgroundColor: "#D3D3D3"
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
		validationBackgroundColor: "#D3D3D3"
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
