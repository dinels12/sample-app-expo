import { Stack } from 'expo-router';
import { StyleSheet, View } from 'react-native';

export default function App() {
	return (
		<View style={styles.container}>
			<Stack.Screen options={{ title: 'Perfil' }} />
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
		alignItems: 'center',
		justifyContent: 'center'
	}
});
