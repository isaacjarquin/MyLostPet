import React from "react"
import { StyleSheet, Text, View, Image, ScrollView } from "react-native"

export default class TermsAndConditions extends React.Component {
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
						<Text style={styles.title}>Términos y condiciones</Text>
						<Text style={styles.socondaryTitle}>Aviso legal</Text>
						<Text style={styles.description}>MyLostPet es una applicación para el intercambio de información sobre mascotas que han sido encontradas y necesitan volver con sus dueños . Al utilizar MyLostPet, aceptas y acuerdas estar obligado por los siguientes términos y condiciones. Nada en estas Condiciones debe ser interpretado como una concesión de derechos de terceros beneficiarios.</Text>
						<Text style={styles.description}>Nos reservamos el derecho de modificar o terminar el servicio MyLostPet por cualquier motivo y sin previo aviso, sin responsabilidad para ti, cualquier otro miembro o por terceros. También nos reservamos el derecho a modificar las presentes Condiciones de Servicio de vez en cuando sin previo aviso. El usuario es responsable de revisar regularmente estos Términos y condiciones, para estar informado de cualquier cambio.</Text>
						<Text style={styles.description}>Como parte del proceso de registro de un animal, se pide un email y un numero de telefono. En ningún caso este se utilizará para enviar publicidad ni se mostrará a terceros. La aplicación le enviará un correo con los datos personales del dueño de la mascota y será usted el que decidirá cómo, cuando y si quiere ponerse en contacto con la misma.</Text>
						<Text style={styles.description}>MyLostPet se pone a tu disposición para uso personal, no comercial. Las empresas, organizaciones u otras personas jurídicas no pueden utilizar el servicio para cualquier otro propósito. No puedes usar el sitio de MyLostPet para ningún propósito ilegal o no autorizado. Los usuarios internacionales se comprometen a cumplir con todas las reglas federales y/o locales sobre conducta y contenido aceptable. El usuario es el único responsable de su conducta y de cualquier dato, texto, información, fotos, links y demás contenidos ("Materiales") que envíe, publique y muestre en el sitio.</Text>

						<Text style={styles.socondaryTitle}>Derechos de autor</Text>
						<Text style={styles.description}>Nos reservamos el derecho de modificar, eliminar o borrar “Material” sin previo aviso, que según nuestro criterio, sea delictivo, fraudulento, amenazante, calumnioso, difamatorio, obsceno o de dudosa reputación, o que infrinja o viole la propiedad intelectual u otros derechos de propiedad de estos Términos y condiciones.</Text>
						<Text style={styles.description}>El Usuario no deberá subir, publicar o de cualquier otra forma cualquier material protegido por derechos de autor, marcas registradas o cualquier otro derecho de propiedad sin el expreso consentimiento del propietario de los derechos, marca registrada o derecho de propiedad intelectual.</Text>
						<Text style={styles.description}>Al enviar, publicar o mostrar cualquier material en y a través de la applicación, automáticamente el usuario nos otorga y autoriza una licencia mundial (permiso) para utilizar de manera gratuita, libre de regalías, con derecho de exhibir públicamente o distribuir estos materiales en cualquier formato que el equipo de MyLostPet considere pertinente y a perpetuidad.</Text>
						<Text style={styles.description}>Con excepción de lo expresamente autorizado por MyLostPet, no puedes copiar, modificar, publicar, transmitir, distribuir, ejecutar, exhibir o vender cualquier información y/o material (incluyendo en forma enunciativa pero no limitativa, imágenes, ilustraciones, textos y cualquier otro material visual en lo sucesivo y en conjunto o separadamente en MyLostPet. En este sitio podrás encontrar marcas registradas y derechos de autor de las que todos los derechos están reservados. Todos los materiales contenidos en este sitio, están protegidos por derechos de autor y/o como marca registrada, por lo que no podrán ser usados para propósitos distintos al de uso personal. La reproducción, copia, distribución, trabajos derivados, publicación y cualquier otra forma de copiado o de uso no autorizada del material aquí contenido está expresamente prohibida. Si deseas solicitar una licencia para usar algún material de este sitio, por favor escríbenos a myfoundpet@gmail.com </Text>

						<Text style={styles.socondaryTitle}>Política de privacidad</Text>
						<Text style={styles.description}>La recopilación y uso de información personal se rige por nuestro Aviso de Privacidad. Al usar la web the MyLostPet, entiendes y aceptas que MyLostPet puede acceder, conservar y revelar su información y el contenido que se suba a la web si así lo requiere la ley o si de buena fe considera que dicha reserva o revelación es razonablemente necesaria para cumplir con los requisitos legales, procesar o para proteger los derechos y la propiedad de MyLostPet, sus afiliados o el público.</Text>
						<Text style={styles.description}>En MyLostPet declinamos toda responsabilidad u obligación alguna por la exactitud, contenido, integridad, legalidad, fiabilidad, operabilidad o disponibilidad de la información o materiales exhibidos en la aplicación. El equipo de MyLostPet se exime de toda responsabilidad y la responsabilidad por la conducta de cualquier usuario.</Text>
						<Text style={styles.description}>BAJO NINGUNA CIRCUNSTANCIA MYLOSTPET SERA RESPONSABLE POR DAÑOS INDIRECTOS, INCIDENTAL, CONSECUENTE, ESPECIAL O EJEMPLAR QUE SURJA DE O EN CONEXION CON EL USO DEL SITIO WEB O CUALQUIERA DE SUS APLICACIONES MOBILES O PARA TABLET.</Text>
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
	socondaryTitle: {
		fontWeight: "bold",
		color: "white",
		marginLeft: 10,
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
