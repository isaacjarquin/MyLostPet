import "react-native"
import React from "react"
import HowToUse from "../../../components/how-to-use"

import renderer from "react-test-renderer"

it("renders correctly", () => {
    const tree = renderer.create(
        <HowToUse />
    ).toJSON()
    expect(tree).toMatchSnapshot()
})
