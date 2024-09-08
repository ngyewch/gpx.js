import {defineConfig} from 'vite';
import dts from 'vite-plugin-dts';

export default defineConfig(() => {
    return {
        build: {
            minify: true,
            sourcemap: true,
            lib: {
                entry: './src/index.ts',
                name: 'gpx',
                fileName: getFilename,
                formats: ['es', 'umd', 'cjs'],
            },
        },
        plugins: [
            dts({
                rollupTypes: true,
            }),
        ],
    };
});

function getFilename(format: string, entryName: string): string | undefined {
    switch (format) {
        case 'es':
            return 'gpx.js';
        case 'umd':
            return 'gpx.umd.cjs';
        case 'cjs':
            return 'gpx.cjs';
        default:
            return undefined;
    }
}