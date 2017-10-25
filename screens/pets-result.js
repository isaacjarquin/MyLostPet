import React from "react"
import { StyleSheet, View, ListView } from "react-native"
import { List, ListItem, SearchBar } from "react-native-elements"

export default class SearchResultPage extends React.Component {
	constructor (props) {
		super(props)
		this.renderRow = this.renderRow.bind(this)
		this.setAndfilterbyCity = this.setAndfilterbyCity.bind(this)
		this.setAndfilterbyBreed = this.setAndfilterbyBreed.bind(this)

		const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2})
		const { pets } = props.navigation.state.params

		this.state = {
			dataSource: ds.cloneWithRows(pets),
			pets: pets,
			location: "",
			breed: "",
			ds: ds
		}
	}

	setAndfilterbyCity (value) {
		this.setState({location: value})
		this.filterPets({location: this.state.location, breed: this.state.breed })
	}

	setAndfilterbyBreed (value) {
		this.setState({breed: value})
		this.filterPets({location: this.state.location, breed: this.state.breed })
	}

	filterPets({location, breed}) {
		const filteredPets = this.state.pets
			.filter((pet) => `${pet.location}`.toUpperCase().indexOf(location.toUpperCase()) >= 0)
			.filter((pet) => `${pet.breed}`.toUpperCase().indexOf(breed.toUpperCase()) >= 0)

		this.setState({dataSource: this.state.ds.cloneWithRows(filteredPets)})
	}

	renderRow (rowData, sectionID) {
		const cardTitleWithBreed = `${rowData.kind}, de raza ${rowData.breed}`
		const cardTitle = rowData.breed ? cardTitleWithBreed : rowData.kind
		const cardSubtitle = `Encontrado en ${rowData.location}, el ${rowData.date}. ${rowData.info}`

		const imageProperties = 'w_100,h_100,c_fill,g_south'
		const splitedUrl = rowData.image.split('upload')
		const builtAvatar = splitedUrl[0] + 'upload/' + imageProperties + splitedUrl[1]

		const { navigate } = this.props.navigation

		return (
			<ListItem
				roundAvatar
				key={sectionID}
				title={cardTitle}
				subtitle={cardSubtitle}
				subtitleNumberOfLines={2}
				avatar={{uri: builtAvatar}}
				avatarStyle={styles.avatarStyle}
				onPress={() => navigate("PetCard", {pet: rowData})}
				containerStyle={{paddingLeft: 10}}
				titleContainerStyle={{marginLeft: 10}}
				subtitleContainerStyle={{marginLeft: 10}}
			/>
		)
	}

	render () {
		return (
			<View style={styles.container}>
				<List>
					<ListView
						dataSource={this.state.dataSource}
						renderRow={this.renderRow}
					/>
				</List>
				<View style={styles.searchBarGroup}>
					<SearchBar
						round
						onChangeText={this.setAndfilterbyCity}
						placeholder='Ciudad/Municipio...' />
					<SearchBar
						round
						onChangeText={this.setAndfilterbyBreed}
						placeholder='Raza...' />
				</View>
			</View>
		)
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: "flex-end"
	},
	searchBarGroup: {
		marginTop: 10
	},
	avatarStyle: {
		width: 55,
		height: 55,
		borderRadius: 27,
		marginTop: 20,
		marginRight: 20,
		marginLeft: 20
	}
})
