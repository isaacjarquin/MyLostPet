import React from 'react';
import { StyleSheet, Text, TextInput, View, TouchableHighlight } from 'react-native';


export default class SearchForm extends React.Component {
  constructor (props, context) {
    super(props, context)
    this.getPets = this.getPets.bind(this)
  }

  getPets() {
    // return fetch('https://items-api.herokuapp.com/api/items')
    // .then((response) => response.json())
    // .then((responseJson) => {
    //   return responseJson.pets;
    // })
    // .catch((error) => {
    //   console.error(error);
    // });
    const { navigate } = this.props.navigation;
    navigate('SearchResultPage', { pets: [] })
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.inputLabel}>Tipo de mascota</Text>
        <TextInput style={styles.input}/>

        <Text style={styles.inputLabel}>Comunidad autónoma</Text>
        <TextInput style={styles.input}/>

        <Text style={styles.inputLabel}>Provincia</Text>
        <TextInput style={styles.input}/>

        <TouchableHighlight
            style={styles.button}
            onPress={this.getPets}>
              <Text style={styles.buttonText} >
                Buscar
              </Text>
        </TouchableHighlight>
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
  inputLabel: {
    fontSize: 20,
    marginLeft: 10,
    color: '#696969',
  },
  input: {
    borderWidth: 1,
    borderColor: '#D7D7D7',
    height: 50,
    width: 350,
    margin: 10,
    padding: 15,
    borderRadius: 3
  },
  picker: {
    borderWidth: 1,
    borderColor: '#D7D7D7',
    height: 60,
    alignSelf: 'stretch',
  },
  button: {
    height: 60,
    alignSelf: 'stretch',
    borderColor: '#05A5D1',
    borderWidth: 2,
    margin: 10,
    backgroundColor: '#333',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: '#FAFAFA',
    fontSize: 20,
    margin: 20,
    fontWeight: '600',
  }
});
