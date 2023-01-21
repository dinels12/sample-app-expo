import { Stack } from 'expo-router';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { useTranslation } from '../../../utils/i18n';
import { useAuth } from '../../../context/auth';

export default function App() {
	const { updateLocale, t } = useTranslation();
	const { signOut } = useAuth();

	return (
		<View style={styles.container}>
			<Text>
				{t('hello', {
					name: 'Daniel'
				})}
			</Text>

			<Pressable onPress={() => updateLocale('en')}>
				<Text>English</Text>
			</Pressable>
			<Pressable onPress={() => updateLocale('es')}>
				<Text>Español</Text>
			</Pressable>

			<Pressable onPress={() => signOut()}>
				<Text>{t('signOut')}</Text>
			</Pressable>
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
