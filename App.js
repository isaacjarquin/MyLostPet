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
import { isIphoneX } from "react-native-iphone-x-helper"

const shareOptions = {
    message: "http://www.mylostpet.es/",
    title: "My Lost Pet",
    url: "http://www.mylostpet.es/"
}

const window = Dimensions.get("window")
const marginTop = (window.height / 100) * 4
const paddingHeaderBottom = Platform.OS === "ios" ? 25 : 10
const paddingHeaderTop = isIphoneX() ? 15 : 0
const marginHeaderTop = isIphoneX() ? 0 : marginTop

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
                headerStyle: { paddingLeft: 10, paddingRight: 10, paddingTop: paddingHeaderTop, paddingBottom: paddingHeaderBottom, marginTop: marginHeaderTop, backgroundColor: "#333333" }
    	    })
        },
        HomeScreenDrawer: {
            screen: HomeScreenDrawer,
            navigationOptions: () => ({
                headerStyle: { paddingTop: 10, paddingBottom: paddingHeaderBottom, paddingTop: paddingHeaderTop, marginTop: marginHeaderTop, backgroundColor: "white" }
            })
        },
        MissingPetForm: { 
            screen: MissingPetForm,
            navigationOptions: () => ({
                headerStyle: { paddingTop: 10, paddingBottom: paddingHeaderBottom, paddingTop: paddingHeaderTop, marginTop: marginHeaderTop, backgroundColor: "white" }
            })
        },
        SearchResultPage: {
            screen: petsResult,
            navigationOptions: () => ({
                headerTintColor: "white",
                headerStyle: {
                    paddingTop: 10, paddingBottom: paddingHeaderBottom, marginTop: marginHeaderTop, paddingTop: paddingHeaderTop, backgroundColor: "#333333" }
            })
        },
        PetCard: {
            screen: petCard,
            navigationOptions: () => ({
                headerStyle: { paddingTop: 10, paddingBottom: paddingHeaderBottom, marginTop: marginHeaderTop, paddingTop: paddingHeaderTop, backgroundColor: "white" }
            })
        },
        WhoWeAre: {
            screen: whoWeAre,
            navigationOptions: () => ({
                headerTintColor: "white",
                headerStyle: { paddingTop: 10, paddingBottom: paddingHeaderBottom, marginTop: marginHeaderTop, paddingTop: paddingHeaderTop, backgroundColor: "#333333" }
            })
        },
        TermsAndConditions: {
            screen: termsAndConditions,
            navigationOptions: () => ({
                headerTintColor: "white",
                headerStyle: { paddingTop: 10, paddingBottom: paddingHeaderBottom, marginTop: marginHeaderTop, paddingTop: paddingHeaderTop, backgroundColor: "#333333" }
            })
        },
        HowToUse: {
            screen: howToUse,
            navigationOptions: () => ({
                headerTintColor: "white",
                headerStyle: { paddingTop: 10, paddingBottom: paddingHeaderBottom, marginTop: marginHeaderTop, paddingTop: paddingHeaderTop, backgroundColor: "#333333" }
            })
        }
    }
)

module.exports = App
