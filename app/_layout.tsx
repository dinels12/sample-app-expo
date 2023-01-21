import { Slot, SplashScreen } from 'expo-router';
import { AuthProvider } from '../context/auth';
import { ApolloProvider } from '@apollo/client';
import { client } from '../graphql/client';
import { requestTrackingPermissionsAsync } from 'expo-tracking-transparency';
import { useEffect } from 'react';
import { TranslationProvider } from '../utils/i18n';

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
	useEffect(() => {
		(async () => {
			await requestTrackingPermissionsAsync();
		})();
	}, []);

	return (
		<ApolloProvider client={client}>
			<AuthProvider>
				<TranslationProvider>
					<Slot />
				</TranslationProvider>
			</AuthProvider>
		</ApolloProvider>
	);
}
