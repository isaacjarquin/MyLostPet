import React from "react"
import { StyleSheet, View, ListView, ScrollView } from "react-native"
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

        const imageProperties = "w_100,h_100,c_fill,g_south"
        const splitedUrl = rowData.image.split("upload")
        const builtAvatar = splitedUrl[0] + "upload/" + imageProperties + splitedUrl[1]

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
                containerStyle={styles.listItem}
                titleContainerStyle={styles.listItemTitle}
                titleStyle={{color: "white", opacity: 0.9, fontWeight: "bold"}}
                subtitleContainerStyle={{marginLeft: 15}}
            />
        )
    }

    render () {
        return (
            <View style={styles.container}>
                <ScrollView>
                    <List>
                        <ListView
                            dataSource={this.state.dataSource}
                            renderRow={this.renderRow}
                        />
                    </List>
                </ScrollView>
                <View>
                    <SearchBar
                        onChangeText={this.setAndfilterbyCity}
                        inputStyle={{height: 50}}
                        noIcon={true}
                        placeholder='Ciudad/Municipio...' />
                    <SearchBar
                        onChangeText={this.setAndfilterbyBreed}
                        inputStyle={{height: 50}}
                        noIcon={true}
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
    listItem: {
        paddingLeft: 15,
        paddingRight: 15,
        height: 90,
        backgroundColor: "black",
        opacity: 0.8
    },
    listItemTitle: {
        marginLeft: 15,
        marginBottom: 5,
        marginTop: 4
    },
    avatarStyle: {
        width: 64,
        height: 64,
        borderRadius: 32,
        marginTop: 35,
        marginRight: 10,
        marginLeft: 10
    }
})
