import React, { useContext, useEffect, useState } from 'react';
import { I18n } from 'i18n-js';
import { useAsyncStorage } from '@react-native-async-storage/async-storage';
import translationES from './languages/spanish.json';
import translationEN from './languages/english.json';
import { LangKeys } from './languages/keys';
type LangKeysTypeof = keyof typeof LangKeys;

export const i18n = new I18n({
	en: translationEN,
	es: translationES
});

type Lang = 'es' | 'en';

const missingTranslationRegex = /^\[missing ".*" translation\]$/;
// This function is a wrapper to avoid exception wich leads in a crash
const translateOrFallback = (initialMsg: LangKeysTypeof, options?: object) => {
	// We tried to translate something else than a string
	// The native I18n function will simply crash instead of rejecting the attempt with an error message
	if (typeof initialMsg !== 'string') {
		return ''; // We don't return any message as we don't know what to send
	}

	let localMsg = i18n.t(initialMsg, options);

	// The translation does not exist, the default message is not very sexy
	// Instead we return the message we tried to translate
	if (missingTranslationRegex.test(localMsg)) {
		return initialMsg;
	}
	return localMsg;
};

interface ITranslationContext {
	lang: string;
	t: (text: LangKeysTypeof, options?: object) => string;
	updateLocale: (lng: Lang) => void;
}

const TranslationContext = React.createContext<ITranslationContext>({
	lang: 'es',
	t(text, options) {
		return '';
	},
	updateLocale(lng) {}
});
const lngString = 'es';

export const TranslationProvider = (props: any) => {
	const { getItem, setItem } = useAsyncStorage('@lng');
	const [lng, setLng] = useState<Lang>(lngString);

	i18n.defaultLocale = lngString;
	i18n.locale = lng;

	const updateLocale = async (language: Lang) => {
		i18n.locale = language;
		setItem(language);
		setLng(language);
	};

	useEffect(() => {
		getItem().then((json: any) => {
			if (!json) {
				setItem(lngString);
			} else {
				setLng(json);
			}
		});
	}, []);

	return (
		<TranslationContext.Provider
			value={{
				lang: i18n.locale,
				t: translateOrFallback,
				updateLocale
			}}
		>
			{props.children}
		</TranslationContext.Provider>
	);
};

export const useTranslation = () => {
	const context = useContext(TranslationContext);
	if (context === undefined) {
		throw new Error('useTranslation must be used within a TranslationProvider');
	}
	return context;
};
