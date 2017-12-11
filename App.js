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
import { Share, Dimensions } from "react-native"

const shareOptions = {
    message: "http://www.mylostpet.es/",
    title: "My Lost Pet",
    url: "http://www.mylostpet.es/"
}

const window = Dimensions.get("window")
const marginTop = (window.height / 100) * 4

const App = StackNavigator(
    {
        Home: {
            screen: Home,
            navigationOptions: ({navigation}) => ({
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
                headerStyle: { padding: 10, marginTop: marginTop, backgroundColor: "#333333" }
    	})
        },
        HomeScreenDrawer: { screen: HomeScreenDrawer },
        MissingPetForm: { screen: MissingPetForm },
        SearchResultPage: { screen: petsResult },
        PetCard: { screen: petCard },
        WhoWeAre: { screen: whoWeAre },
        TermsAndConditions: { screen: termsAndConditions },
        HowToUse: { screen: howToUse }
    }
)

module.exports = App
