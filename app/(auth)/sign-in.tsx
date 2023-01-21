import { Pressable, Text, View } from 'react-native';
import { useAuth } from '../../context/auth';
import { useTranslation } from '../../utils/i18n';

export default function SignIn() {
	const { signIn } = useAuth();
	const { t } = useTranslation();

	return (
		<View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
			<Text style={{ marginBottom: 24, fontSize: 36, fontWeight: 'bold' }}>
				{t('welcome')}
			</Text>
			<Pressable onPress={signIn}>
				<Text>{t('signIn')}</Text>
			</Pressable>
		</View>
	);
}
