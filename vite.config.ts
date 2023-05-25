import {defineConfig} from 'vite'
import react from '@vitejs/plugin-react-swc'
// import AutoImport from 'unplugin-auto-import/vite'

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        react(),
        // AutoImport({
        //     dts: true,// or a custom path
        //     eslintrc: {
        //         enabled: true, // <-- this
        //     },
        // }),
    ],
})
