import { Tabs } from 'expo-router';
import { useTranslation } from '../../utils/i18n';

export const unstable_settings = {
	// Ensure any route can link back to `/`
	initialRouteName: 'home'
};

export default function Layout() {
	const { t } = useTranslation();

	return (
		<Tabs>
			<Tabs.Screen
				name="home/index"
				options={{
					tabBarLabel: t('tabHome'),
					headerTitle: t('tabHome')
				}}
			/>
			<Tabs.Screen
				name="search/index"
				options={{
					tabBarLabel: t('tabSearch'),
					headerTitle: t('tabSearch')
				}}
			/>
			<Tabs.Screen
				name="profile/index"
				options={{
					tabBarLabel: t('tabProfile'),
					headerTitle: t('tabProfile')
				}}
			/>
			<Tabs.Screen
				name="settings/index"
				options={{
					tabBarLabel: t('tabSettings'),
					headerTitle: t('tabSettings')
				}}
			/>
		</Tabs>
	);
}
