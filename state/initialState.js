const contactDetailsInitialState = {
    isModalVisible: false,
    name: {
        value: "",
        validationMessage: "Nombre",
        validationMessageColor: "grey",
        validationFieldBorderColor: "grey"
    },
    email: {
        value: "",
        validationMessage: "Correo",
        validationMessageColor: "grey",
        validationFieldBorderColor: "grey"
    },
    phoneNumber: {
        value: "",
        validationMessage: "Número de teléfono",
        validationMessageColor: "grey",
        validationFieldBorderColor: "grey"
    },
    personalInformation: {
        value: "",
        validationMessage: "Información personal",
        validationMessageColor: "grey",
        validationFieldBorderColor: "grey"
    }
}

const missingPetInitialState = {
    provincias: [],
    isDateTimePickerVisible: false,
    isPetTypeModalVisible: false,
    isProvinceModalVisible: false,
    isAutonomousComunityModalVisible: false,
    showProgressAnimation: false,
    showOperationMessage: false,
    showSuccesfullMessage: false,
    showUnSuccesfullMessage: false,
    progress: 0,
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
        validationBackgroundColor: "transparent",
        iconType: "MaterialIcons",
        icon: "place",
        backgroundColor: "grey"
    },
    autonomousComunity: {
        value: "",
        validationMessage: "Seleccione la comunidad autónoma",
        validationMessageColor: "grey",
        validationFieldBorderColor: "grey",
        validationBackgroundColor: "transparent",
        iconType: "MaterialIcons",
        icon: "place",
        backgroundColor: "grey"
    },
    name: {
        value: "",
        validationMessage: "Introduzca aquí su nombre",
        validationMessageColor: "grey",
        validationFieldBorderColor: "grey",
        iconType: "MaterialIcons",
        icon: "person",
        backgroundColor: "grey"
    },
    email: {
        value: "",
        validationMessage: "Introduzca aquí su correo electronico",
        validationMessageColor: "grey",
        validationFieldBorderColor: "grey",
        iconType: "Entypo",
        icon: "email",
        backgroundColor: "grey"
    },
    type: {
        value: "",
        validationMessage: "Seleccione el tipo de mascota",
        validationMessageColor: "grey",
        validationFieldBorderColor: "grey",
        validationBackgroundColor: "transparent",
        iconType: "MaterialIcons",
        icon: "pets",
        backgroundColor: "grey"
    },
    breed: {
        value: "",
        validationMessage: "Introduzca aquí la raza del animal encontrado",
        validationMessageColor: "grey",
        validationFieldBorderColor: "grey",
        iconType: "MaterialIcons",
        icon: "pets",
        backgroundColor: "grey"
    },
    size: {
        value: "",
        validationMessage: "Introduzca aquí el tamaño aproximado",
        validationMessageColor: "grey",
        validationFieldBorderColor: "grey",
        iconType: "entypo",
        icon: "ruler",
        backgroundColor: "grey"
    },
    date: {
        value: "Seleccione cuando encontro a la mascota",
        validationMessage: "",
        validationMessageColor: "grey",
        validationFieldBorderColor: "grey",
        validationBackgroundColor: "transparent",
        iconType: "evilicon",
        icon: "calendar",
        backgroundColor: "grey"
    },
    location: {
        value: "",
        validationMessage: "Introduzca aquí la ciudad o municipio",
        validationMessageColor: "grey",
        validationFieldBorderColor: "grey",
        iconType: "MaterialIcons",
        icon: "place",
        backgroundColor: "grey"
    },
    description: {
        value: "",
        validationMessage: "Introduzca aquí una description del animal",
        validationMessageColor: "grey",
        validationFieldBorderColor: "grey",
        iconType: "entypo",
        icon: "text",
        backgroundColor: "grey"
    }
}

module.exports = {
    contactDetailsInitialState,
    missingPetInitialState
}
