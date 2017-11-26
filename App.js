import React from "react"

import {
	StackNavigator
} from "react-navigation"

import Home from "./screens/home"
import MissingPetForm from "./components/missing-pet-form"
import HomeScreenDrawer from "./components/home-screen-drawer"
import petsResult from "./screens/pets-result"
import petCard from "./components/pet-card"
import contactDetails from "./components/contact-details"
import whoWeAre from "./components/who-we-are"
import termsAndConditions from "./components/terms-and-conditions"
import howToUse from "./components/how-to-use"
import { Icon } from "react-native-elements"
import { Share } from "react-native"

const shareOptions = {
	message: "http://www.mylostpet.es/",
	title: "My Lost Pet",
	url: "http://www.mylostpet.es/"
}

const App = StackNavigator(
	{
		Home: {
			screen: Home,
			navigationOptions: ({navigation}) => ({
				title: "My lost pet",
				headerRight: <Icon
					color='grey'
					type="Feather"
					name="share"
					size={25}
					onPress={ () => Share.share(shareOptions).then(this._showResult).catch(err => console.log(err)) }/>,
				headerLeft: <Icon
					color='grey'
					type="Feather"
					name="menu"
					size={25}
					onPress={ () => navigation.navigate("HomeScreenDrawer") }/>,
				headerStyle: { padding: 10 }
    	})
		},
		HomeScreenDrawer: { screen: HomeScreenDrawer },
		MissingPetForm: { screen: MissingPetForm },
		SearchResultPage: { screen: petsResult },
		PetCard: { screen: petCard },
		ContactDetails: { screen: contactDetails },
		WhoWeAre: { screen: whoWeAre },
		TermsAndConditions: { screen: termsAndConditions },
		HowToUse: { screen: howToUse }
	}
)

module.exports = App
