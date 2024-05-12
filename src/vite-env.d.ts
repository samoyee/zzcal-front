/// <reference types="vite/client" />

declare interface Window {
    locales: Record<"zhCN" | "enUS", Record<string, any>>
    countrys: Array<{
        country_id: number;
        country_code: number;
        country_name_en: string;
        country_name_cn: string;
        ab: string;
    }>
    countryMap: Record<string, string>;
}