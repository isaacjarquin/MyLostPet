import 'react-native'
import React from 'react'
import SearchForm from '../../../components/search-form'

import renderer from 'react-test-renderer'

it('renders correctly', () => {
  const tree = renderer.create(
    <SearchForm />
    ).toJSON()
  expect(tree).toMatchSnapshot()
})
