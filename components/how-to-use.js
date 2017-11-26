import React from "react"
import { StyleSheet, Text, View, Image, ScrollView } from "react-native"

export default class HowToUse extends React.Component {
	constructor (props) {
		super(props)
	}

	render () {
		return (

			<View style={styles.container}>
				<Image
					source={require("../assets/images/tirma.jpg")}
					style={styles.image}
				>
					<ScrollView style={styles.contentContainer}>
						<Text style={styles.title}>Como usar la aplicación</Text>
						<Text style={styles.description}>El objetivo principal de la aplicación es poner en contacto a la persona que haya perdido su mascota con la persona que la haya encontrado.</Text>
						<Text style={styles.description}>La idea principal radica en que cuando nos encontramos un animal abandonado, todo lo que tenemos que hacer es introducir los datos relativos al animal y algunos datos personales de contacto. Tus datos personales en ningún momento se mostrarán a terceros ni serán utilizados para enviarte publicidad. La única finalidad de los mismos es la de poder comunicarte con la persona que haya perdido a su mascota. Una vez que hayas introducido los datos de la mascota encontrada, junto con una foto, que deberá ser inferior a 1Mbyte, debes hacer click en el botón guardar datos, y los datos serán almacenados en nuestra base de datos.</Text>
						<Text style={styles.description}>Si por el contrario, lo que deseas es encontrar a tu mascota perdida, debes usar el filtro que se desplegara al pulsar el botón 'Buscar mascota' en la parte inferior de la página. Aquí podrás filtrar por tipo de mascota, comunidad autónoma y provincia en la que se a extraviado tu mascota. Esto te mostrará una lista con todas las mascotas perdidas en la provincia seleccionada que coinciden con el filtro aplicado. Debido a que esta lista podría ser muy grande en determinados casos, hemos añadido un segundo nivel de filtro que te permitiran hacer una busqueda aun mas selectiva, filtrando por ciudad o municipio, raza y tamaño. La combinación de estos 6 filtros nos permitirá una potente búsqueda que debería ser suficiente para encontrar a tu mascota. Una vez hayas encontrado a tu mascota, debes hacer click sobre ella lo cual te direccionara a una pantalla donde podrás ver información relativa al animal en question.</Text>
						<Text style={styles.description}>Por último si haces click en el botón 'Contactar' se desplegará un formulario en el que deberás introducir tu información personal de contacto, para que la persona que encontró tu mascota se pueda poner en contacto contigo.</Text>
					</ScrollView>
				</Image>
			</View>
		)
	}
}

const styles = StyleSheet.create({
	contentContainer: {
		opacity: 0.8,
		backgroundColor: "black"
	},
	container: {
		flex: 1,
		backgroundColor: "grey"
	},
	title: {
		color: "white",
		margin: 10,
		fontSize: 20,
		marginBottom: 10,
		fontWeight: "bold",
		alignSelf: "center",
		backgroundColor: "transparent"
	},
	description: {
		margin: 10,
		marginBottom: 10,
		backgroundColor: "transparent",
		color: "white"
	},
	image: {
		flex: 1,
		justifyContent: "flex-start",
		width: "100%",
		height: "100%"
	}
})
