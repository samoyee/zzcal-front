import { Plugin } from 'vite'
import fs from 'fs';
import path from 'path';

function readFilesInDirectorySync(directory: string): string[] {
    const files = fs.readdirSync(directory);
    let result: string[] = [];
    files.forEach(file => {
        let fullPath = path.join(directory, file);
        const stats = fs.statSync(fullPath);
        if (stats.isDirectory()) {
            result = result.concat(readFilesInDirectorySync(fullPath));
        } else if (stats.isFile()) {
            result.push(fullPath);
        }
    });
    return result;
}

function locale(): Plugin {
    const files = readFilesInDirectorySync('./locale')
    let zhCN = {};
    let enUS = {};
    files.forEach(path => {
        const content = fs.readFileSync(path, 'utf-8');
        const json = JSON.parse(content);
        const paths = path.split('/');
        const module = paths[paths.length - 2];
        if (path.includes('zhCN')) {
            zhCN = { ...zhCN, [module]: json };
        } else if (path.includes('enUS')) {
            enUS = { ...enUS, [module]: json };
        }
    })
    const locales = JSON.stringify({ zhCN, enUS });
    return {
        name: 'vite-plugin-locale',
        transformIndexHtml(html) {
            return {
                html,
                tags: [
                    {
                        injectTo: 'head',
                        tag: 'script',
                        children: `window.locales = ${locales}`
                    }
                ]
            }
        },
    }
}

export default locale;