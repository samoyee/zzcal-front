import { Provider, createStore, useAtom, useAtomValue, useSetAtom } from 'jotai';
import { atomWithStorage } from 'jotai/utils';
import { PropsWithChildren } from 'react';

type Locale = 'zhCN' | 'enUS'

const localeAtom = atomWithStorage<Locale>("locale", 'zhCN', undefined, { getOnInit: true });

export const useSetLocale = () => {
    const setLocale = useSetAtom(localeAtom);
    return setLocale;
}

export const useGetLocale = (module: string) => {
    const locale = useAtomValue(localeAtom);
    const message = window.locales[locale];
    const mod = message[module];
    return (id: string) => {
        if (mod) return mod[id];
        return id;
    }
}

export const useLocale = () => {
    return useAtom(localeAtom);
}

const localeStore = createStore();

export const LocaleProvider: React.FC<PropsWithChildren> = (props) => {
    return <Provider store={localeStore}>{props.children}</Provider>
}

export function getLocale(module: string) {
    const locale = localeStore.get(localeAtom);
    const message = window.locales[locale];
    const mod = message[module];
    return (id: string) => {
        if (mod) return mod[id];
        return id;
    }
}