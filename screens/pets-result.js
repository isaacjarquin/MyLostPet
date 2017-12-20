import React from "react"
import { StyleSheet, View, ListView, Text, ScrollView, TextInput, Dimensions, KeyboardAvoidingView, Image, TouchableHighlight } from "react-native"
import { Icon } from "react-native-elements"

const window = Dimensions.get("window")

export default class SearchResultPage extends React.Component {
    constructor (props) {
        super(props)
        this.renderRow = this.renderRow.bind(this)
        this.setAndfilterbyCity = this.setAndfilterbyCity.bind(this)
        this.setAndfilterbyBreed = this.setAndfilterbyBreed.bind(this)
        this.onLocationFocus = this.onLocationFocus.bind(this)
        this.onBreedFocus = this.onBreedFocus.bind(this)

        const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2})
        const { pets } = props.navigation.state.params

        this.state = {
            dataSource: ds.cloneWithRows(pets),
            locationFocusColor: "grey",
            breedFocusColor: "grey",
            onFocusMargin: 0,
            pets: pets,
            location: "",
            breed: "",
            ds: ds
        }
    }

    onLocationFocus() {
        this.setState({
            locationFocusColor: "white",
            breedFocusColor: "grey"
        })
    }

    onBreedFocus() {
        this.setState({
            breedFocusColor: "white",
            locationFocusColor: "grey"
        })
    }

    componentWillUpdate(_nextProps, nextState) {
        if (this.state.location !== nextState.location || this.state.breed !== nextState.breed) {
            this.filterPets(nextState)
        }
    }

    setAndfilterbyCity (value) {
        this.setState({
            location: value,
            breed: this.state.breed
        })
    }

    setAndfilterbyBreed (value) {
        this.setState({
            breed: value,
            location: this.state.location
        })
    }

    filterPets({location, breed}) {
        const filteredPets = this.state.pets
            .filter((pet) => `${pet.location}`.toUpperCase().indexOf(location.toUpperCase()) >= 0)
            .filter((pet) => `${pet.breed}`.toUpperCase().indexOf(breed.toUpperCase()) >= 0)

        this.setState({dataSource: this.state.ds.cloneWithRows(filteredPets)})
    }

    renderRow(rowData) {
        const cardTitleWithBreed = `${rowData.kind}, de raza ${rowData.breed}`
        const cardTitle = rowData.breed ? cardTitleWithBreed : rowData.kind
        const cardSubtitle = `Encontrado en ${rowData.location}, el ${rowData.date}. ${rowData.info}`

        const imageProperties = "w_100,h_100,c_fill,g_south"
        const splitedUrl = rowData.image.split("upload")
        const builtAvatar = splitedUrl[0] + "upload/" + imageProperties + splitedUrl[1]

        const { navigate } = this.props.navigation

        return (
            <TouchableHighlight style={{width: window.width}} onPress={() => navigate("PetCard", { pet: rowData })}>
                <View style={styles.listItem}>
                    <Image style={[styles.avatarStyle, {paddingBottom: 40}]} source={{ uri: builtAvatar }} />
                    <View style={{width: window.width - 120}}>
                        <Text style={{ color: "white", fontSize: 16, marginTop: 10, marginBottom: 5 }} numberOfLines={1} fontWeight="bold">{cardTitle}</Text>
                        <Text style={{ color: "grey", lineHeight: 20, marginBottom: 10 }} numberOfLines={2}>{cardSubtitle}</Text>
                    </View>
                    <Icon color='white' type="MaterialIcons" name="keyboard-arrow-right" size={30} />
                </View>
            </TouchableHighlight>
        )
    }

    render () {
        return (
            <KeyboardAvoidingView behavior="padding" keyboardVerticalOffset={90} style={{ flex: 1 }}>
                <View style={styles.container}>
                    <ScrollView>
                        <ListView
                            dataSource={this.state.dataSource}
                            renderRow={this.renderRow}
                            enableEmptySections={true}
                        />
                    </ScrollView>
                    <View style={styles.textInputBlockElement}>
                        <Icon style={styles.rightIcon} color={this.state.locationFocusColor} type="EvilIcons" name="search" size={25} />
                        <TextInput
                            style={[styles.textInput, { color: this.state.locationFocusColor }]}
                            onFocus={this.onLocationFocus}
                            placeholder='Ciudad/Municipio...'
                            underlineColorAndroid="transparent"
                            placeholderTextColor="grey"
                            onChangeText={this.setAndfilterbyCity}
                            value={this.state.location}
                        />
                        <Icon style={styles.fieldsIcons} color={this.state.locationFocusColor} type="MaterialIcons" name="pets" size={25} />
                    </View>
                    <View style={styles.textInputBlockElement}>
                        <Icon style={styles.rightIcon} color={this.state.breedFocusColor} type="EvilIcons" name="search" size={25} />
                        <TextInput
                            style={[styles.textInput, { color: this.state.breedFocusColor }]}
                            onFocus={this.onBreedFocus}
                            placeholder='Raza...'
                            underlineColorAndroid="transparent"
                            placeholderTextColor="grey"
                            onChangeText={this.setAndfilterbyBreed}
                            value={this.state.breed}
                        />
                        <Icon style={styles.fieldsIcons} color={this.state.breedFocusColor} type="MaterialIcons" name="place" size={25} />
                    </View>
                </View>
            </KeyboardAvoidingView>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "flex-end",
        backgroundColor: "#333333"
    },
    textInputBlockElement: {
        flexDirection: "row"
    },
    fieldsIcons: {
        height: 70,
        width: 50,
        opacity: 0.8,
        backgroundColor: "#333333",
        borderTopWidth: 1,
        borderBottomWidth: 1,
        borderColor: "grey",
        paddingTop: 20,
    },
    textInput: {
        height: 70,
        backgroundColor: "#333333",
        opacity: 0.8,
        width: window.width - 100,
        fontSize: 18,
        borderTopWidth: 1,
        borderBottomWidth: 1,
        padding: 10,
        borderColor: "grey",
        paddingLeft: 0,
    },
    rightIcon: {
        height: 70,
        width: 50,
        opacity: 0.8,
        backgroundColor: "#333333",
        borderTopWidth: 1,
        borderBottomWidth: 1,
        borderColor: "grey",
        paddingTop: 22,
        paddingLeft: 12
    },
    listItem: {
        flexDirection: "row",
        borderColor: "grey",
        borderTopWidth: 1,
        borderBottomWidth: 1,
        backgroundColor: "#333333"
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
        margin: 10
    }
})
