import { defineApplicationConfig } from '@vben/vite-config';

export default defineApplicationConfig({
    overrides: {
        optimizeDeps: {
            include: [
                'echarts/core',
                'echarts/charts',
                'echarts/components',
                'echarts/renderers',
                'qrcode',
                '@iconify/iconify',
                'ant-design-vue/es/locale/zh_CN',
                'ant-design-vue/es/locale/en_US',
            ],
        },
        server: {
            proxy: {
                '/evan/oauth/token': {
                    target: 'http://127.0.0.1:9201',
                    changeOrigin: true,
                    ws: true,
                    rewrite: (path) => path.replace(new RegExp(`^/evan`), ''),
                    // only https
                    // secure: false
                },
                '/evan/business-resource/user/currentUser': {
                    target: 'http://127.0.0.1:9201',
                    changeOrigin: true,
                    ws: true,
                    rewrite: (path) => path.replace(new RegExp(`^/evan`), ''),
                    // only https
                    // secure: false
                },
                '/evan/business-resource/user/feignGetMenuList': {
                    target: 'http://127.0.0.1:9201',
                    changeOrigin: true,
                    ws: true,
                    rewrite: (path) => path.replace(new RegExp(`^/evan`), ''),
                    // only https
                    // secure: false
                },
                '/evan/business-menu/system/getUrlList': {
                    target: 'http://127.0.0.1:9201',
                    changeOrigin: true,
                    ws: true,
                    rewrite: (path) => path.replace(new RegExp(`^/evan`), ''),
                    // only https
                    // secure: false
                },
                '/evan/business-resource/user/getPermCode': {
                    target: 'http://127.0.0.1:9201',
                    changeOrigin: true,
                    ws: true,
                    rewrite: (path) => path.replace(new RegExp(`^/evan`), ''),
                    // only https
                    // secure: false
                },
                '/evan/auth/oauth/logout': {
                    target: 'http://127.0.0.1:9201',
                    changeOrigin: true,
                    ws: true,
                    rewrite: (path) => path.replace(new RegExp(`^/evan`), ''),
                    // only https
                    // secure: false
                },
                '/evan/business-menu/system/getDeptList': {
                    target: 'http://127.0.0.1:9201',
                    changeOrigin: true,
                    ws: true,
                    rewrite: (path) => path.replace(new RegExp(`^/evan`), ''),
                    // only https
                    // secure: false
                },
                '/evan/business-menu/system/getAccountList': {
                    target: 'http://127.0.0.1:9201',
                    changeOrigin: true,
                    ws: true,
                    rewrite: (path) => path.replace(new RegExp(`^/evan`), ''),
                    // only https
                    // secure: false
                },
                '/evan/business-menu/system/getAllRoleList': {
                    target: 'http://127.0.0.1:9201',
                    changeOrigin: true,
                    ws: true,
                    rewrite: (path) => path.replace(new RegExp(`^/evan`), ''),
                    // only https
                    // secure: false
                },
                '/evan/business-menu/system/accountExist': {
                    target: 'http://127.0.0.1:9201',
                    changeOrigin: true,
                    ws: true,
                    rewrite: (path) => path.replace(new RegExp(`^/evan`), ''),
                    // only https
                    // secure: false
                },
                '/evan/business-menu/system/getRoleListByPage': {
                    target: 'http://127.0.0.1:9201',
                    changeOrigin: true,
                    ws: true,
                    rewrite: (path) => path.replace(new RegExp(`^/evan`), ''),
                    // only https
                    // secure: false
                },
                '/evan': {
                    target: 'http://localhost:3000',
                    changeOrigin: true,
                    ws: true,
                    rewrite: (path) => path.replace(new RegExp(`^/evan`), ''),
                    // only https
                    // secure: false
                },
                '/basic-api': {
                    target: 'http://localhost:3000',
                    changeOrigin: true,
                    ws: true,
                    rewrite: (path) => path.replace(new RegExp(`^/basic-api`), ''),
                    // only https
                    // secure: false
                },
                '/upload': {
                    target: 'http://localhost:3300/upload',
                    changeOrigin: true,
                    ws: true,
                    rewrite: (path) => path.replace(new RegExp(`^/upload`), ''),
                },
            },
        },
    },
});
