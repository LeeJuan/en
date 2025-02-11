<template>
    <v-container>
      <v-card>
        <v-card-title>
          <span class="headline">Languages List</span>
          <v-spacer></v-spacer>
          <!-- 단어 추가 페이지로 이동 -->
          <NuxtLink to="/languages/create">
            <v-btn color="primary" depressed>추가</v-btn>
          </NuxtLink>
        </v-card-title>
        <v-divider></v-divider>
        <v-data-table
          :headers="headers"
          :items="languages"
          class="elevation-1"
          :items-per-page="10"
        >
          <template v-slot:item.actions="{ item }">
            <!-- 수정: 각 단어별 수정 페이지로 이동 -->
            <NuxtLink :to="`/languages/edit/${item.id}`">
              <v-btn icon color="primary">
                <v-icon>mdi-pencil</v-icon>
              </v-btn>
            </NuxtLink>
            <!-- 삭제: index 페이지에서 바로 삭제 -->
            <v-btn icon color="red" @click="deleteLanguage(item)">
              <v-icon>mdi-delete</v-icon>
            </v-btn>
          </template>
        </v-data-table>
        <v-alert v-if="error" type="error" color="red lighten-4" text>
          {{ error }}
        </v-alert>
        <v-alert v-if="success" type="success" color="green lighten-4" text>
          {{ success }}
        </v-alert>
      </v-card>
    </v-container>
  </template>
  
  <script setup lang="ts">
  import { ref, onMounted } from 'vue'
  import { useRuntimeConfig } from '#app'
  
  const config = useRuntimeConfig()
  const apiBaseUrl = config.public.apiBaseUrl
  
  const languages = ref([])
  const error = ref('')
  const success = ref('')
  
  // v-data-table 헤더 정의: 단어와 액션(수정, 삭제)
  const headers = ref([
    { text: '단어', value: 'word' },
    { text: '액션', value: 'actions', sortable: false }
  ])
  
  // 백엔드 API로부터 단어 목록을 불러오는 함수
  const fetchLanguages = async () => {
    error.value = ''
    try {
      const { data, error: fetchError } = await useFetch(`${apiBaseUrl}/languages`, {
        method: 'GET'
      })
      if (fetchError.value) {
        error.value = '단어 데이터를 가져오는 중 오류가 발생했습니다.'
      } else {
        // 응답 데이터가 { data: [...], total, page, totalPages } 형태일 경우:
        languages.value = data.value.data || data.value
      }
    } catch (e: any) {
      error.value = '오류: ' + e.message
    }
  }
  
  // 삭제 기능: 백엔드 DELETE API 호출 후 리스트 갱신
  const deleteLanguage = async (item: any) => {
    error.value = ''
    success.value = ''
    if (!confirm(`단어 '${item.word}'를 삭제하시겠습니까?`)) return
    try {
      const { error: delError } = await useFetch(`${apiBaseUrl}/languages/${item.id}`, {
        method: 'DELETE'
      })
      if (delError.value) {
        error.value = '단어 삭제 중 오류가 발생했습니다.'
      } else {
        success.value = '단어가 성공적으로 삭제되었습니다.'
        // 삭제 후, 목록에서 해당 단어 제거
        languages.value = languages.value.filter(lang => lang.id !== item.id)
      }
    } catch (e: any) {
      error.value = '오류: ' + e.message
    }
  }
  
  onMounted(() => {
    fetchLanguages()
  })
  </script>
  
  <style scoped>
  .headline {
    font-weight: bold;
  }
  </style>
  