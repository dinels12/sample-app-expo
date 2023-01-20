import { useAsyncStorage } from '@react-native-async-storage/async-storage';
import { useRouter, useSegments } from 'expo-router';
import React from 'react';

type User = {} | undefined;

interface IAuthContext {
	signIn: () => void;
	signOut: () => void;
	user: User;
}

const AuthContext = React.createContext<IAuthContext>({
	signIn() {},
	signOut() {},
	user: {}
});

export function useAuth() {
	return React.useContext(AuthContext);
}

function useProtetedRoute(user: User) {
	const rootSegment = useSegments()[0];
	const router = useRouter();

	React.useEffect(() => {
		if (user === undefined) {
			return;
		}
		if (!rootSegment) {
			router.replace('/home');
			return;
		}

		if (!user && rootSegment !== '(auth)') {
			router.replace('/sign-in');
		} else if (user && rootSegment !== '(app)') {
			router.replace('/home');
		}
	}, [user, rootSegment]);
}

export function Provider(props: any) {
	const { getItem, setItem, removeItem } = useAsyncStorage('USER');
	const [user, setAuth] = React.useState<undefined | {}>(undefined);

	React.useEffect(() => {
		getItem().then((json) => {
			console.log('json', json);
			if (json != null) {
				setAuth(JSON.parse(json));
			} else {
				setAuth(undefined);
			}
		});
	}, []);

	useProtetedRoute(user);

	return (
		<AuthContext.Provider
			value={{
				signIn: () => {
					setAuth({});
					setItem(JSON.stringify({}));
				},
				signOut: () => {
					setAuth(undefined);
					removeItem();
				},
				user
			}}>
			{props.children}
		</AuthContext.Provider>
	);
}
