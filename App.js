import {
	StackNavigator
} from "react-navigation"

import Home from "./screens/home"
import searchForm from "./components/search-form"
import MissingPetForm from "./components/missing-pet-form"
import petsResult from "./screens/pets-result"
import petCard from "./components/pet-card"
import contactDetails from "./components/contact-details"

const App = StackNavigator({
	Home: { screen: Home },
	SearchForm: { screen: searchForm },
	MissingPetForm: { screen: MissingPetForm },
	SearchResultPage: { screen: petsResult },
	PetCard: { screen: petCard },
	ContactDetails: { screen: contactDetails }
})

module.exports = App
