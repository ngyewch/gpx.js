import {defineConfig} from 'vite';
import dts from 'vite-plugin-dts';

export default defineConfig({
    build: {
        minify: true,
        sourcemap: true,
        lib: {
            entry: './src/index.ts',
            name: 'gpx',
            fileName: (format, _): string => {
                switch (format) {
                    case 'es':
                        return 'gpx.js';
                    case 'umd':
                        return 'gpx.umd.cjs';
                    case 'cjs':
                        return 'gpx.cjs';
                    default:
                        throw `unknown format: ${format}`;
                }
            },
            formats: ['es', 'umd', 'cjs'],
        },
    },
    plugins: [
        dts({
            rollupTypes: true,
        }),
    ],
});
