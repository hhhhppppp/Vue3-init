import { ref } from 'vue'
import { defineStore } from 'pinia'
export const useUserStore = defineStore(
  'userStore',
  () => {
    // 数据、 action（普通方法）、getters（计算属性）
    const token = ref()
    const setToken = (newToken) => {
      token.value = newToken
    }
    const removeToken = () => {
      token.value = ''
    }
    return {
      token,
      setToken,
      removeToken
    }
  },
  { persist: true }
)


