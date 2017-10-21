import React from 'react';
import { StyleSheet, View } from 'react-native';
import bodyParamsBuilder from '../utils/http-request.js'
import { FormLabel, FormInput } from 'react-native-elements'
import { Button } from 'react-native-elements'


export default class SearchForm extends React.Component {
  constructor (props, context) {
    super(props, context)
    this.getPets = this.getPets.bind(this)

    this.state = {
      type: '',
      autonomousComunity: '',
      province: ''
    }
  }

  getPets(event) {
    const url = `https://items-api.herokuapp.com/api/items${bodyParamsBuilder(this.state)}`

    return fetch(url)
    .then((response) => response.json())
    .then((responseJson) => {
      const { navigate } = this.props.navigation;
      navigate('SearchResultPage', { pets: responseJson.data })
    })
    .catch((error) => {
      console.error(error);
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <View>
          <FormLabel>Tipo de mascota</FormLabel>
          <FormInput onChangeText={(text) => this.setState({type: text})}/>

          <FormLabel>Comunidad autónoma</FormLabel>
          <FormInput onChangeText={(text) => this.setState({autonomousComunity: text})}/>

          <FormLabel>Provincia</FormLabel>
          <FormInput onChangeText={(text) => this.setState({province: text})}/>
        </View>

        <View style={styles.innerContainer}>
          <Button
            style={styles.button}
            large
            onPress={this.getPets}
            title='Buscar' />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'flex-start',
    backgroundColor: '#F7F7F7',
    paddingTop: 20,
  },
  innerContainer: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'flex-end',
    backgroundColor: '#F7F7F7',
    paddingTop: 20,
  },
  button: {
    marginBottom: 20
  },
  buttonText: {
    color: '#FAFAFA',
    fontSize: 20,
    margin: 20,
    fontWeight: '600',
  }
});
