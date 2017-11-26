import "react-native"
import React from "react"
import PetsResult from "../../../screens/pets-result"

import renderer from "react-test-renderer"

it("renders correctly", () => {
	const pet = {
		kind: "kind",
		info: "info",
		image: "image",
		location: "location",
		date: "date",
		breed: "breed"
	}

	const navigation = {
		state: {
			params: {
				pets: [pet]
			}
		}
	}

	const tree = renderer.create(
		<PetsResult navigation={navigation} />
	).toJSON()
	expect(tree).toMatchSnapshot()
})
