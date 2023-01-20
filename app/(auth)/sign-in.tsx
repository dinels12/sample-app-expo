import { Pressable, Text, View } from 'react-native';
import { useAuth } from '../../context/auth';

export default function SignIn() {
	const { signIn } = useAuth();
	return (
		<View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
			<Text style={{ marginBottom: 24, fontSize: 36, fontWeight: 'bold' }}>
				Iniciar Sesion
			</Text>
			<Pressable onPress={signIn}>
				<Text>Sign In</Text>
			</Pressable>
		</View>
	);
}
