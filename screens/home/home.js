import React from 'react';
import { StyleSheet, Text, View, Image, TouchableHighlight, Navigator } from 'react-native';

export default class Home extends React.Component {
  constructor (props) {
    super(props)
    this.onAddStarted = this.onAddStarted.bind(this)
  }

  onAddStarted() {
      const { navigate } = this.props.navigation;

      navigate('SearchForm', { name: 'Jane' })
  }
  render() {
    return (
      <View style={styles.container}>
          <Image
                source={require('../../assets/images/mascotas_y_personas.jpg')}
                style={{width: 600, height: 300}}
                resizeMode= { Image.resizeMode.contain }
          />
          <TouchableHighlight
              style={styles.button}
              onPress={this.onAddStarted}>
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
    justifyContent: 'center',
  },
  button: {
    height: 60,
    borderColor: '#05A5D1',
    borderWidth: 2,
    backgroundColor: '#333',
    margin: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: '#FAFAFA',
    fontSize: 20,
    fontWeight: '600',
  }
});
