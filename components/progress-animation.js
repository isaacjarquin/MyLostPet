import React from "react"
import { StyleSheet, View, Text, Image } from "react-native"
import PercentageCircle from 'react-native-percentage-circle'

export default class ProgressAnimation extends React.Component {
	constructor (props) {
		super(props)
	}

	render () {
    const { progress } = this.props
		return (
			<View style={styles.container}>
				<View style={styles.loader}>
					<PercentageCircle radius={50} percent={progress} color={"#3498db"} borderWidth={1} >
						<Image
							source={require("../assets/images/loading.png")}
							style={{width: 65, height: 65}}
						/>
					</PercentageCircle>
				</View>
				<Text style={styles.progressText}>{progress}%</Text>
			</View>
		)
	}
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    backgroundColor: "white",
    opacity: 0.9,
    width: "100%",
    top: "80%",
    paddingTop: 30,
    paddingBottom: 30
  },
	loader: {
		alignSelf: "center"
	},
	progressText: {
		marginTop: 2,
		alignSelf: "center",
		fontSize: 14
	},
})
