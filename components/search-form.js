import React from "react"
import { StyleSheet, View } from "react-native"
import bodyParamsBuilder from "../utils/http-request.js"
import locations from "../data/locations"
import pets from "../data/pets"
import { get } from "../services/items-api"
import { FormLabel, Divider } from "react-native-elements"
import { Button } from "react-native-elements"
import {Select, Option} from "react-native-chooser"

export default class SearchForm extends React.Component {
	constructor (props, context) {
		super(props, context)
		this.getPets = this.getPets.bind(this)
		this.setType = this.setType.bind(this)
		this.setProvince = this.setProvince.bind(this)
		this.setAutonomousComunity = this.setAutonomousComunity.bind(this)

		this.state = {
			type: "",
			autonomousComunity: "",
			province: "",
			provincias: []
		}
	}

	setType (text) {
		this.setState({type: text})
	}

	setProvince (text) {
		this.setState({province: text})
	}

	setAutonomousComunity (text) {
		const location = locations.find((location) => location.value === text)

		this.setState({autonomousComunity: text})
		this.setState({provincias: location.provincias})
	}

	getPets () {
		const url = `https://items-api.herokuapp.com/api/items${bodyParamsBuilder(this.state)}`

		return get(url)
			.then((response) => {
				const { navigate } = this.props.navigation
				navigate("SearchResultPage", { pets: response.data })
			})
			.catch((reason) => console.error(reason))
	}

	render () {
		return (
			<View style={styles.container}>
				<View>
					<FormLabel>Tipo de mascota</FormLabel>
					<Select
						defaultText={"perro"}
						style={styles.select}
						textStyle={{color: "grey"}}
						backdropStyle={{backgroundColor: "#d3d5d6"}}
						optionListStyle={{backgroundColor: "#F5FCFF"}}
						onSelect={this.setType}
						selected={() => setSelectedText(this.state.type)}
					>
						{pets.map((pet) => <Option key={pet.id} value={pet.value}>{pet.value}</Option>)}
					</Select>

					<FormLabel>Comunidad autonoma</FormLabel>
					<Select
						defaultText={"Seleccione la comunidad autonoma"}
						style={styles.select}
						textStyle={{color: "grey"}}
						backdropStyle={{backgroundColor: "#d3d5d6"}}
						optionListStyle={{backgroundColor: "#F5FCFF"}}
						onSelect={this.setAutonomousComunity}
						selected={() => setSelectedText(this.state.autonomousComunity)}
					>
						{locations.map((location) => <Option key={location.id} value={location.value}>{location.value}</Option>)}
					</Select>

					<FormLabel>Provincia</FormLabel>
					<Select
						defaultText={"Seleccione la provincia"}
						style={styles.select}
						textStyle={{color: "grey"}}
						backdropStyle={{backgroundColor: "#d3d5d6"}}
						optionListStyle={{backgroundColor: "#F5FCFF"}}
						onSelect={this.setProvince}
						selected={() => setSelectedText(this.state.province)}
					>
						{this.state.provincias.map((provincia) => <Option key={provincia.id} value={provincia.value}>{provincia.value}</Option>)}
					</Select>

					<Divider style={styles.divider} />

					<Button
						style={styles.button}
						borderRadius={3}
						large
						onPress={this.getPets}
						title='Buscar' />
				</View>
			</View>
		)
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#fff",
		justifyContent: "flex-start",
		backgroundColor: "#F7F7F7",
		paddingTop: 20
	},
})
