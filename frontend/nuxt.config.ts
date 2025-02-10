export default defineNuxtConfig({
  runtimeConfig: {
    public: {
      apiBaseUrl: process.env.API_BASE_URL || 'http://localhost:3001/api'
    }
  },
  modules: [
    'vuetify-nuxt-module' // ✅ Vuetify 모듈 추가
  ],
  css: [
    'vuetify/styles' // ✅ Vuetify 스타일 적용
  ],
  vuetify: {
    // ✅ Vuetify 관련 설정
    defaultAssets: {
      font: {
        family: 'Roboto'
      },
      icons: 'mdi' // Material Design Icons 사용
    },
    treeShake: true // 사용하지 않는 Vuetify 컴포넌트 제외하여 성능 최적화
  },
  vite: {
    server: {
      watch: {
        usePolling: true,  // 폴링 방식으로 변경 감지 활성화
        interval: 100       // 폴링 주기 (환경에 따라 조절 가능)
      }
    },
    ssr: {
      noExternal: ['vuetify'] // ✅ Vuetify 모듈을 번들링하여 SSR 호환성 유지
    }
  }
});
