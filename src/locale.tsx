import { useAtom, useAtomValue, useSetAtom } from 'jotai';
import { atomWithStorage } from 'jotai/utils';
import { atomStore } from './privider';

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

export function getLocale(module: string) {
    const locale = atomStore.get(localeAtom);
    const message = window.locales[locale];
    const mod = message[module];
    return (id: string) => {
        if (mod) return mod[id];
        return id;
    }
}