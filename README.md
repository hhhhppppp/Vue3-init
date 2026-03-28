# Vue3-init

Vue3 项目初始化模板，包含 ESLint + Prettier + EditorConfig 规范配置。

## 推荐开发环境

### IDE 设置

[VS Code](https://code.visualstudio.com/) + 以下插件：

| 插件                                                                                          | 说明                   |
| --------------------------------------------------------------------------------------------- | ---------------------- |
| [Vue (Official)](https://marketplace.visualstudio.com/items?itemName=Vue.volar)               | Vue 3 语法支持         |
| [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint)          | 代码规范检查           |
| [Prettier](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)        | 代码格式化             |
| [EditorConfig](https://marketplace.visualstudio.com/items?itemName=EditorConfig.EditorConfig) | 编辑器配置同步（可选） |

> 注意：安装 Vue (Official) 后需禁用 Vetur 插件，避免冲突。

### EditorConfig 插件是否必须？

**不是必须的**，但建议安装。

**不安装插件的情况**：

`.editorconfig` 文件存在，但 VS Code 不读取它，以下配置不会自动应用：

| 配置项         | 是否生效 |
| -------------- | -------- |
| `indent_size`  | ❌       |
| `indent_style` | ❌       |
| `end_of_line`  | ❌       |
| `charset`      | ❌       |

**安装插件后**：

打开文件时自动应用 `.editorconfig` 配置。

**但 Prettier 已经覆盖了部分功能**：

| 功能   | EditorConfig 插件 | Prettier        |
| ------ | ----------------- | --------------- |
| 缩进   | ✅ 打开文件时应用 | ✅ 格式化时应用 |
| 换行符 | ✅ 打开文件时应用 | ✅ 格式化时应用 |
| 行宽   | ✅ 显示警告       | ✅ 格式化时应用 |

> Prettier 格式化时会自动读取 `.editorconfig`，所以即使不安装 EditorConfig 插件，格式化后的代码也会符合配置。

**结论**：

| 情况                     | 建议                         |
| ------------------------ | ---------------------------- |
| 只用 Prettier 格式化     | 不必须安装                   |
| 想打开文件就自动应用设置 | 建议安装                     |
| 团队协作、跨编辑器       | 建议安装（其他编辑器也支持） |

### Vue (Official) vs Vetur

| 插件               | 适用版本 | 说明                      |
| ------------------ | -------- | ------------------------- |
| **Vetur**          | Vue 2    | 旧版 Vue 插件，已停止维护 |
| **Vue (Official)** | Vue 3    | 新版 Vue 插件，官方推荐   |

**冲突原因**：

| 问题         | 说明                                              |
| ------------ | ------------------------------------------------- |
| 重复诊断     | 同一个错误可能显示两次                            |
| 诊断不一致   | Vetur 用 Vue 2 规则，Vue (Official) 用 Vue 3 规则 |
| 类型检查冲突 | TypeScript 类型推断可能出错                       |

**Vue 3 新特性支持**：

| 特性               | Vetur | Vue (Official) |
| ------------------ | ----- | -------------- |
| `<script setup>`   | ❌    | ✅             |
| Composition API    | ❌    | ✅             |
| Vue 3 + TypeScript | ❌    | ✅             |

**Vue (Official) 支持 Vue 2 项目**：

在 Vue 2 项目中添加 `jsconfig.json` 或 `tsconfig.json`：

```json
{
  "vueCompilerOptions": {
    "target": 2.7
  }
}
```

**插件选择建议**：

| 项目类型     | 推荐插件                               |
| ------------ | -------------------------------------- |
| Vue 2 项目   | Vetur（更成熟）                        |
| Vue 2.7 项目 | Vue (Official)（支持 Composition API） |
| Vue 3 项目   | Vue (Official)                         |

### 浏览器 DevTools

- Chromium 浏览器（Chrome、Edge、Brave 等）：
  - [Vue.js devtools](https://chromewebstore.google.com/detail/vuejs-devtools/nhdogjmejiglipccpnnnanhbledajbpd)
- Firefox：
  - [Vue.js devtools](https://addons.mozilla.org/en-US/firefox/addon/vue-js-devtools/)

---

## 项目配置说明

### ESLint 配置 (`eslint.config.js`)

使用 Flat Config 格式，配置内容：

```js
import { defineConfig, globalIgnores } from 'eslint/config'
import globals from 'globals'
import js from '@eslint/js'
import pluginVue from 'eslint-plugin-vue'
import pluginOxlint from 'eslint-plugin-oxlint'
import skipFormatting from 'eslint-config-prettier/flat'

export default defineConfig([
  {
    name: 'app/files-to-lint',
    files: ['**/*.{vue,js,mjs,jsx}']
  },

  globalIgnores(['**/dist/**', '**/dist-ssr/**', '**/coverage/**']),

  {
    languageOptions: {
      globals: {
        ...globals.browser
      }
    },
    rules: {
      'vue/multi-word-component-names': [
        'warn',
        {
          ignores: ['index']
        }
      ],
      'vue/no-setup-props-destructure': 'off'
    }
  },

  js.configs.recommended,
  ...pluginVue.configs['flat/essential'],

  ...pluginOxlint.buildFromOxlintConfigFile('.oxlintrc.json'),

  skipFormatting
])
```

**规则说明**：

| 规则                             | 设置    | 说明                                                  |
| -------------------------------- | ------- | ----------------------------------------------------- |
| `vue/multi-word-component-names` | `warn`  | Vue 组件名需多单词（忽略 `index.vue`）                |
| `vue/no-setup-props-destructure` | `off`   | 允许 props 解构（Vue 3.3+ 已支持响应式解构）          |
| `no-undef`                       | `error` | 使用未定义变量报错（`js.configs.recommended` 已包含） |

---

### Prettier 配置 (`.prettierrc.json`)

```json
{
  "$schema": "https://json.schemastore.org/prettierrc",
  "singleQuote": true,
  "semi": false,
  "printWidth": 80,
  "trailingComma": "none",
  "endOfLine": "lf"
}
```

**配置说明**：

| 配置项          | 值       | 说明             |
| --------------- | -------- | ---------------- |
| `singleQuote`   | `true`   | 使用单引号       |
| `semi`          | `false`  | 不使用分号       |
| `printWidth`    | `80`     | 每行最大 80 字符 |
| `trailingComma` | `"none"` | 不添加末尾逗号   |
| `endOfLine`     | `"lf"`   | 使用 LF 换行符   |

---

### EditorConfig (`.editorconfig`)

```ini
[*.{js,jsx,mjs,cjs,ts,tsx,mts,cts,vue,css,scss,sass,less,styl}]
charset = utf-8
indent_size = 2
indent_style = space
insert_final_newline = true
trim_trailing_whitespace = true
end_of_line = lf
max_line_length = 80
```

**配置说明**：

| 配置项                     | 值      | 说明                                         |
| -------------------------- | ------- | -------------------------------------------- |
| `charset`                  | `utf-8` | 文件编码                                     |
| `indent_size`              | `2`     | 缩进 2 空格                                  |
| `indent_style`             | `space` | 使用空格缩进                                 |
| `insert_final_newline`     | `true`  | 文件末尾插入空行                             |
| `trim_trailing_whitespace` | `true`  | 删除行尾空白                                 |
| `end_of_line`              | `lf`    | 使用 LF 换行符                               |
| `max_line_length`          | `80`    | 最大行宽 80（与 Prettier `printWidth` 一致） |

---

### VS Code 工作区配置 (`.vscode/settings.json`)

```json
{
  "explorer.fileNesting.enabled": true,
  "explorer.fileNesting.patterns": {
    "tsconfig.json": "tsconfig.*.json, env.d.ts, typed-router.d.ts",
    "vite.config.*": "jsconfig*, vitest.config.*, cypress.config.*, playwright.config.*",
    "package.json": "package-lock.json, pnpm*, .yarnrc*, yarn*, .eslint*, eslint*, .oxlint*, oxlint*, .oxfmt*, .prettier*, prettier*, .editorconfig"
  },
  "editor.codeActionsOnSave": {
    "source.fixAll": "explicit"
  },
  "editor.formatOnSave": true,
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "[javascript]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "[vue]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "[typescript]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "[json]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  }
}
```

---

### Oxlint 配置 (`.oxlintrc.json`)

```json
{
  "$schema": "./node_modules/oxlint/configuration_schema.json",
  "plugins": ["eslint", "unicorn", "oxc", "vue"],
  "env": {
    "browser": true
  },
  "categories": {
    "correctness": "error"
  }
}
```

---

## 配置协作关系

```
┌─────────────────┐
│  .editorconfig  │ ──→ VS Code 编辑器基础设置
└────────┬────────┘
         │
         ↓ (Prettier 自动读取)
┌─────────────────┐
│ .prettierrc.json│ ──→ npm run format
└────────┬────────┘
         │
         ↓ (禁用冲突规则)
┌─────────────────┐
│ eslint.config.js│ ──→ npm run lint
└─────────────────┘
```

---

## npm scripts

```json
{
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview",
    "lint": "run-s lint:*",
    "lint:oxlint": "oxlint . --fix",
    "lint:eslint": "eslint . --fix --cache",
    "format": "prettier --write --experimental-cli src/"
  }
}
```

| 命令              | 说明                   |
| ----------------- | ---------------------- |
| `npm run dev`     | 启动开发服务器         |
| `npm run build`   | 构建生产版本           |
| `npm run preview` | 预览生产构建           |
| `npm run lint`    | 运行所有 lint 检查     |
| `npm run format`  | 格式化 `src/` 目录代码 |

---

## 项目初始化

```sh
npm install
```

### 开发模式

```sh
npm run dev
```

### 生产构建

```sh
npm run build
```

### 代码检查

```sh
npm run lint
```

### 代码格式化

```sh
npm run format
```

---

## Vite 配置参考

详见 [Vite Configuration Reference](https://vite.dev/config/)
