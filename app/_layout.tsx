import { Slot } from 'expo-router';
import { Provider } from '../context/auth';

export default function RootLayout() {
	return (
		<Provider>
			<Slot />
		</Provider>
	);
}
