import "react-native"
import React from "react"
import WhoWeAre from "../../../components/who-we-are"

import renderer from "react-test-renderer"

it("renders correctly", () => {
    const tree = renderer.create(
        <WhoWeAre />
    ).toJSON()
    expect(tree).toMatchSnapshot()
})
