// 创建 Pinia 实例并导出
import { createPinia } from 'pinia'
// 导入持久化插件
import persist from 'pinia-plugin-persistedstate'
const pinia = createPinia()
// 挂载 持久化插件
pinia.use(persist)
export default pinia

// 导出 modules/ 下的 user 仓库
export * from './modules/user'

/* 
配置 Pinia 持久化
1. 安装插件 npm add pinia-plugin-persistedstate -D
2. 导入并挂载到 Pinia 实例上
3. defineStore 第三个参数 presist: true
*/

/*
Pinia 仓库独立维护
1. 把 pinia 实例创建与导出放在 stores/index.js
2. 新建的仓库放在 modules/ 下
3. 在 index.js 中导入所有的仓库，并统一导出
*/
