import React from "react"
import { StyleSheet, View } from "react-native"
import DropdownAlert from "react-native-dropdownalert"

export default class OperationMessage extends React.Component {
    constructor (props) {
        super(props)
    }

    showSuccesfullMessage() {
        const successMessage = "Los datos de la mascota se han guardado correctamente"
        this.dropdown.alertWithType("success", "La operación se ha completado con éxito", successMessage)
    }

    showUnSuccesfullMessage() {
        const errorMessage = "No se han podido guardar los datos devido a un error en la comunicación"
        this.dropdown.alertWithType("error", "Error de comunicación", errorMessage)
    }

    render () {
        const { showSuccesfullMessage, showUnSuccesfullMessage, hideAnimation } = this.props
        return (
            <View style={styles.container}>
                {showSuccesfullMessage && this.showSuccesfullMessage()}
                {showUnSuccesfullMessage && this.showUnSuccesfullMessage()}

                <DropdownAlert
                    ref={ref => this.dropdown = ref}
                    closeInterval={6000}
                    endDelta={20}
                    onClose={() => hideAnimation()}
                    startDelta={200}
                    successColor={"#77DD77"}
                    errorColor={"#ff3333"}
                />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        position: "absolute",
        backgroundColor: "white",
        width: "100%",
        height: "100%",
        top: "87%",
        paddingTop: 30,
        paddingBottom: 30
    }
})
