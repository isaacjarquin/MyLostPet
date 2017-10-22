import React from 'react';
import { View, Text } from 'react-native';
import {
  StackNavigator,
} from 'react-navigation';

import Home from './screens/home'
import SearchResultPage from './screens/search-result-page'
import searchForm from './components/search-form'
import petsResult from './screens/pets-result'
import petCard from './components/pet-card'

const App = StackNavigator({
  Home: { screen: Home },
  SearchForm: { screen: searchForm },
  SearchResultPage: { screen: petsResult },
  PetCard: { screen: petCard },
});

module.exports = App
