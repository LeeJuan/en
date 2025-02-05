export default defineNuxtConfig({
    runtimeConfig: {
      public: {
        apiBaseUrl: process.env.API_BASE_URL || 'http://localhost:3001/api'
      }
    }
  });
  