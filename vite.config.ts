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
                '/evan/user/user/currentUser': {
                    target: 'http://127.0.0.1:9201',
                    changeOrigin: true,
                    ws: true,
                    rewrite: (path) => path.replace(new RegExp(`^/evan`), ''),
                    // only https
                    // secure: false
                },
                '/evan/user/menu/list': {
                    target: 'http://127.0.0.1:9201',
                    changeOrigin: true,
                    ws: true,
                    rewrite: (path) => path.replace(new RegExp(`^/evan`), ''),
                    // only https
                    // secure: false
                },
                '/evan/user/system/getUrlList': {
                    target: 'http://127.0.0.1:9201',
                    changeOrigin: true,
                    ws: true,
                    rewrite: (path) => path.replace(new RegExp(`^/evan`), ''),
                    // only https
                    // secure: false
                },
                '/evan/user/system/getModuleList': {
                    target: 'http://127.0.0.1:9201',
                    changeOrigin: true,
                    ws: true,
                    rewrite: (path) => path.replace(new RegExp(`^/evan`), ''),
                    // only https
                    // secure: false
                },
                '/evan/user/system/updateAuthUrl': {
                    target: 'http://127.0.0.1:9201',
                    changeOrigin: true,
                    ws: true,
                    rewrite: (path) => path.replace(new RegExp(`^/evan`), ''),
                    // only https
                    // secure: false
                },
                '/evan/user/system/updateRoleUrl': {
                    target: 'http://127.0.0.1:9201',
                    changeOrigin: true,
                    ws: true,
                    rewrite: (path) => path.replace(new RegExp(`^/evan`), ''),
                    // only https
                    // secure: false
                },
                '/evan/user/system/updateRoleMenu': {
                    target: 'http://127.0.0.1:9201',
                    changeOrigin: true,
                    ws: true,
                    rewrite: (path) => path.replace(new RegExp(`^/evan`), ''),
                    // only https
                    // secure: false
                },
                '/evan/user/system/deleteAuthUrl': {
                    target: 'http://127.0.0.1:9201',
                    changeOrigin: true,
                    ws: true,
                    rewrite: (path) => path.replace(new RegExp(`^/evan`), ''),
                    // only https
                    // secure: false
                },
                '/evan/user/system/addAuthUrl': {
                    target: 'http://127.0.0.1:9201',
                    changeOrigin: true,
                    ws: true,
                    rewrite: (path) => path.replace(new RegExp(`^/evan`), ''),
                    // only https
                    // secure: false
                },
                '/evan/user/user/getPermCode': {
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
                '/evan/user/system/getDeptList': {
                    target: 'http://127.0.0.1:9201',
                    changeOrigin: true,
                    ws: true,
                    rewrite: (path) => path.replace(new RegExp(`^/evan`), ''),
                    // only https
                    // secure: false
                },
                '/evan/user/system/getAccountList': {
                    target: 'http://127.0.0.1:9201',
                    changeOrigin: true,
                    ws: true,
                    rewrite: (path) => path.replace(new RegExp(`^/evan`), ''),
                    // only https
                    // secure: false
                },
                '/evan/user/system/getAllRoleList': {
                    target: 'http://127.0.0.1:9201',
                    changeOrigin: true,
                    ws: true,
                    rewrite: (path) => path.replace(new RegExp(`^/evan`), ''),
                    // only https
                    // secure: false
                },
                '/evan/user/system/accountExist': {
                    target: 'http://127.0.0.1:9201',
                    changeOrigin: true,
                    ws: true,
                    rewrite: (path) => path.replace(new RegExp(`^/evan`), ''),
                    // only https
                    // secure: false
                },
                '/evan/user/system/getRoleListByPage': {
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
