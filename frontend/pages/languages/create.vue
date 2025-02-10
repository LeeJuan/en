<template>
    <v-container class="mt-8">
      <v-card>
        <v-card-title>
          <span class="headline">단어 추가</span>
        </v-card-title>
        <v-card-text>
          <v-form ref="form" @submit.prevent="submitForm">
            <v-text-field
              v-model="word"
              label="단어"
              required
            ></v-text-field>
            <v-btn color="primary" type="submit">저장</v-btn>
          </v-form>
        </v-card-text>
        <v-card-actions>
          <v-alert v-if="success" type="success" dense text>
            {{ success }}
          </v-alert>
          <v-alert v-if="error" type="error" dense text>
            {{ error }}
          </v-alert>
        </v-card-actions>
      </v-card>
    </v-container>
  </template>
  
  <script setup lang="ts">
  import { ref } from 'vue'
  
  // Use Nuxt 3 runtime config
  const config = useRuntimeConfig()
  const apiBaseUrl = config.public.apiBaseUrl
  
  const word = ref('')
  const error = ref('')
  const success = ref('')
  const form = ref(null)
  
  const submitForm = async () => {
    error.value = ''
    success.value = ''
  
    try {
      // 사용된 runtimeConfig를 기반으로 백엔드 API URL을 지정합니다.
      const { error: fetchError } = await useFetch(`${apiBaseUrl}/languages`, {
        method: 'POST',
        body: { word: word.value }
      })
  
      if (fetchError.value) {
        error.value = '단어 저장 중 오류가 발생했습니다.'
      } else {
        success.value = '단어가 성공적으로 저장되었습니다!'
        word.value = '' // 입력값 초기화
      }
    } catch (e: any) {
      error.value = '오류: ' + e.message
    }
  }
  </script>
  
  <style scoped>
  /* 필요한 스타일 추가 */
  </style>
  