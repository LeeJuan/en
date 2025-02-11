<template>
    <v-app>
      <!-- 헤더 (공통 상단 내비게이션) -->
      <v-app-bar app color="primary" dark>
        <v-toolbar-title>My Nuxt App</v-toolbar-title>
        <v-spacer />
        <NuxtLink to="/" class="mx-2">
          <v-btn text>홈</v-btn>
        </NuxtLink>
        <NuxtLink to="/languages" class="mx-2">
          <v-btn text>단어</v-btn>
        </NuxtLink>
        <!-- 추가 내비게이션 버튼 -->
      </v-app-bar>
  
      <!-- 메인 콘텐츠 영역 -->
      <v-main>
        <v-container fluid>
          <NuxtPage />
        </v-container>
      </v-main>
  
      <!-- 푸터 (공통 하단 영역) -->
      <v-footer app color="grey lighten-4">
        <v-col class="text-center">
          © 2025 My Nuxt App. All rights reserved.
        </v-col>
      </v-footer>
    </v-app>
  </template>
  
  <script setup lang="ts">
    // 여기서 필요한 전역 상태 관리나 컴포넌트 로직이 있다면 작성합니다.
    // 예를 들어, 사용자 인증 상태를 확인하는 미들웨어를 적용할 수 있습니다.
  </script>
  
  <style scoped>
  /* 레이아웃 전반의 스타일을 추가합니다. */
  </style>
  