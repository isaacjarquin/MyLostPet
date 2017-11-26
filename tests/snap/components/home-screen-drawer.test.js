import "react-native"
import React from "react"
import HomeScreenDrawer from "../../../components/home-screen-drawer"

import renderer from "react-test-renderer"

it("renders correctly", () => {
	const tree = renderer.create(
		<HomeScreenDrawer />
	).toJSON()
	expect(tree).toMatchSnapshot()
})
