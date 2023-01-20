import { Tabs } from 'expo-router';

export const unstable_settings = {
	// Ensure any route can link back to `/`
	initialRouteName: 'home'
};

export default function Layout() {
	return (
		<Tabs>
			<Tabs.Screen
				name="home/index"
				options={{
					tabBarLabel: 'Inicio'
				}}
			/>
			<Tabs.Screen
				name="search/index"
				options={{
					tabBarLabel: 'Buscar'
				}}
			/>
			<Tabs.Screen
				name="profile/index"
				options={{
					tabBarLabel: 'Perfil'
				}}
			/>
			<Tabs.Screen
				name="settings/index"
				options={{
					tabBarLabel: 'Configurar'
				}}
			/>
		</Tabs>
	);
}
