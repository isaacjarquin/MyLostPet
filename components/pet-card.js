import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Card, Button } from 'react-native-elements'

export default class PetCard extends React.Component {
  render () {
    const { kind, info, image, location, date, breed } = this.props
    const cardTitleWithBreed = `${kind}, de raza ${breed}`
    const cardTitle = breed ? cardTitleWithBreed : kind

    return (
      <View style={styles.container}>
        <Card title={cardTitle} image={{uri: image}}>
          <Text style={styles.secondaryTitle}>Encontrado en {location}, el {date}</Text>
          <Text style={styles.description}>{info}</Text>
          <Button buttonStyle={styles.button} title='Contactar' />
        </Card>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    alignItems: 'stretch',
    justifyContent: 'flex-start'
  },
  button: {
    borderRadius: 0,
    marginLeft: 0,
    marginRight: 0,
    marginBottom: 0
  },
  secondaryTitle: {
    marginBottom: 10,
    fontWeight: 'bold'
  },
  description: {
    marginBottom: 20
  }
})
