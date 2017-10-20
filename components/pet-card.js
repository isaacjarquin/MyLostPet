import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import { Card, Button } from 'react-native-elements'

export default class PetCard extends React.Component {
  render() {
    const { kind, info, image } = this.props
    return (
      <View style={styles.container}>
        <Card
          title={kind}
          image={{uri: image}}>
          <Text style={{marginBottom: 10}}>
            {info}
          </Text>
          <Button
            icon={{name: 'code'}}
            backgroundColor='#03A9F4'
            buttonStyle={styles.button}
            title='Contactar' />
        </Card>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'stretch',
    justifyContent: 'flex-start',
  },
  button: {
    borderRadius: 0,
    marginLeft: 0,
    marginRight: 0,
    marginBottom: 0
  }
});
