import React from "react"
import { StyleSheet, Text, View } from "react-native"
import { Button } from "react-native-elements"

export default class HomeScreenDrawer extends React.Component {
	render () {
		return (
			<View style={styles.container}>
					<Text style={styles.title}>My Lol Pet</Text>
			</View>
		)
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#fff",
		justifyContent: "flex-start"
	}
})
