import React from 'react';
import { StyleSheet, Text, View, Image, TouchableHighlight, Navigator } from 'react-native';

export default class Home extends React.Component {
  constructor (props) {
    super(props)
    this.navigateToSearchForm = this.navigateToSearchForm.bind(this)
  }

  navigateToSearchForm() {
      const { navigate } = this.props.navigation;

      navigate('SearchForm', { name: 'Jane' })
  }
  render() {
    return (
      <View style={styles.container}>
          <Image
                source={require('../assets/images/mascotas_y_personas.jpg')}
                style={{width: 600, height: 300}}
                resizeMode= { Image.resizeMode.contain }
          />
          <TouchableHighlight
              style={styles.button}
              onPress={this.navigateToSearchForm}>
                <Text style={styles.buttonText} >
                  Buscar Mascota perdida
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
    alignItems: 'center',
    justifyContent: 'flex-start',
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
