import { useAsyncStorage } from '@react-native-async-storage/async-storage';
import { useRouter, useSegments } from 'expo-router';
import React from 'react';

type User = {} | undefined;

interface IAuthContext {
	signIn: () => void;
	signOut: () => void;
	user: User;
	isAuth: boolean;
}

const AuthContext = React.createContext<IAuthContext>({
	signIn() {},
	signOut() {},
	user: {},
	isAuth: false
});

export function useAuth() {
	const context = React.useContext(AuthContext);

	if (context === undefined) {
		throw new Error('useAuth must be used within a AuthProvider');
	}
	return context;
}

function useProtetedRoute(user: User) {
	const rootSegment = useSegments()[0];
	const router = useRouter();

	React.useEffect(() => {
		if (user === undefined) {
			router.replace('/sign-in');
			return;
		}
		if (!rootSegment) {
			router.replace('/sign-in');
			return;
		}

		if (!user && rootSegment !== '(auth)') {
			router.replace('/sign-in');
		} else if (user && rootSegment !== '(app)') {
			router.replace('/home');
		}
	}, [user, rootSegment]);
}

export function AuthProvider(props: any) {
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
				user,
				isAuth: !user
			}}
		>
			{props.children}
		</AuthContext.Provider>
	);
}
