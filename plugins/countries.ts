import { Plugin } from 'vite'
import fs from 'fs';
import path from 'path';

function countries(): Plugin {
    const countries = path.resolve(__dirname, './countries.json');
    const content = fs.readFileSync(countries, 'utf-8');
    const json = JSON.parse(content);
    const jsonMap: Record<string, string> = {};
    for (const item of json) {
        jsonMap[item.country_name_cn] = item.country_code;
    }

    return {
        name: 'vite-plugin-locale',
        transformIndexHtml(html) {
            return {
                html,
                tags: [
                    {
                        injectTo: 'head',
                        tag: 'script',
                        children: `window.countrys = ${content}; window.countryMap = ${JSON.stringify(jsonMap)};`
                    },
                ]
            }
        },
    }
}

export default countries;