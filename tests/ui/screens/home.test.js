import "react-native"
import React from "react"
import Home from "../../../screens/home"

import renderer from "react-test-renderer"

it("renders correctly", () => {
	const navigation = { navigate: "some navigation function" }

	const tree = renderer.create(
		<Home navigation={navigation} />
	).toJSON()
	expect(tree).toMatchSnapshot()
})
