import React from "react"

import {
    StackNavigator
} from "react-navigation"

import Home from "./screens/home"
import MissingPetForm from "./components/missing-pet-form"
import HomeScreenDrawer from "./components/home-screen-drawer"
import petsResult from "./screens/pets-result"
import petCard from "./components/pet-card"
import whoWeAre from "./components/who-we-are"
import termsAndConditions from "./components/terms-and-conditions"
import howToUse from "./components/how-to-use"
import { Icon } from "react-native-elements"
import { Share, Dimensions, Platform } from "react-native"

const shareOptions = {
    message: "http://www.mylostpet.es/",
    title: "My Lost Pet",
    url: "http://www.mylostpet.es/"
}

const window = Dimensions.get("window")
const marginTop = (window.height / 100) * 4
const paddingHeaderBottom = Platform.OS === "ios" ? 25 : 10

const App = StackNavigator(
    {
        Home: {
            screen: Home,
            navigationOptions: ({navigation}) => ({
                title: "My lost pet",
                headerTitleStyle: { color: "white", fontSize: 24, alignSelf: "center" },
                headerRight: <Icon
                    color='white'
                    type="Feather"
                    name="share"
                    size={25}
                    onPress={ () => Share.share(shareOptions).then(this._showResult).catch(err => console.log(err)) }/>,
                headerLeft: <Icon
                    color='white'
                    type="Feather"
                    name="menu"
                    size={25}
                    onPress={ () => navigation.navigate("HomeScreenDrawer") }/>,
                headerStyle: { paddingLeft: 10, paddingRight: 10, paddingBottom: paddingHeaderBottom, marginTop: marginTop, backgroundColor: "#333333" }
    	    })
        },
        HomeScreenDrawer: {
            screen: HomeScreenDrawer,
            navigationOptions: ({ navigation }) => ({
                headerStyle: { paddingTop: 10, paddingBottom: paddingHeaderBottom, marginTop: marginTop, backgroundColor: "white" }
            })
        },
        MissingPetForm: { 
            screen: MissingPetForm,
            navigationOptions: ({ navigation }) => ({
                headerStyle: { paddingTop: 10, paddingBottom: paddingHeaderBottom, marginTop: marginTop, backgroundColor: "white" }
            })
        },
        SearchResultPage: {
            screen: petsResult,
            navigationOptions: ({ navigation }) => ({
                headerTintColor: 'white',
                headerStyle: {
                    paddingTop: 10, paddingBottom: paddingHeaderBottom, marginTop: marginTop, backgroundColor: "#333333" }
            })
        },
        PetCard: {
            screen: petCard,
            navigationOptions: ({ navigation }) => ({
                headerStyle: { paddingTop: 10, paddingBottom: paddingHeaderBottom, marginTop: marginTop, backgroundColor: "white" }
            })
        },
        WhoWeAre: {
            screen: whoWeAre,
            navigationOptions: ({ navigation }) => ({
                headerTintColor: 'white',
                headerStyle: { paddingTop: 10, paddingBottom: paddingHeaderBottom, marginTop: marginTop, backgroundColor: "#333333" }
            })
        },
        TermsAndConditions: {
            screen: termsAndConditions,
            navigationOptions: ({ navigation }) => ({
                headerTintColor: 'white',
                headerStyle: { paddingTop: 10, paddingBottom: paddingHeaderBottom, marginTop: marginTop, backgroundColor: "#333333" }
            })
        },
        HowToUse: {
            screen: howToUse,
            navigationOptions: ({ navigation }) => ({
                headerTintColor: 'white',
                headerStyle: { paddingTop: 10, paddingBottom: paddingHeaderBottom, marginTop: marginTop, backgroundColor: "#333333" }
            })
        }
    }
)

module.exports = App
