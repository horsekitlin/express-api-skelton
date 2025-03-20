# Monorepo 項目結構說明

## 目錄
- [簡介](#簡介)
- [整體結構](#整體結構)
- [資料夾說明](#資料夾說明)
- [規範與最佳實踐](#規範與最佳實踐)
- [工具配置](#工具配置)
- [開發流程](#開發流程)
- [常見問題](#常見問題)

## 簡介

本 monorepo 採用集中式儲存庫管理方法，將所有相關專案、套件和應用程式集中在單一代碼儲存庫中。使用 monorepo 架構的主要目標是促進代碼共享、簡化依賴管理並確保整個生態系統的一致性。

### 什麼是 Monorepo?

Monorepo（單體儲存庫）是一種將多個專案的代碼儲存在同一個版本控制儲存庫中的開發策略。這與傳統的多儲存庫（multi-repo）方法相反，後者為每個專案維護單獨的儲存庫。

### 我們使用 Monorepo 的原因

- **代碼共享和重用**：更容易共享通用功能和組件
- **統一版本控制**：所有專案共享同一個版本歷史
- **簡化依賴管理**：避免複雜的外部依賴關係
- **原子性變更**：可以跨多個專案進行原子性變更
- **統一的工具與流程**：所有專案使用相同的構建工具、測試框架和開發流程

## 整體結構

```
monorepo-root/
├── .github/                 # GitHub 相關配置
├── .husky/                  # Git Hooks 設定
├── apps/                    # 應用程式
│   ├── web/                 # Web 應用
│   ├── admin/               # 後台管理應用
│   ├── mobile/              # 移動端應用
│   └── desktop/             # 桌面應用
├── packages/                # 內部共享套件
│   ├── ui/                  # UI 組件庫
│   ├── utils/               # 通用工具函數
│   ├── api/                 # API 相關邏輯
│   └── config/              # 共享配置
├── services/                # 微服務或後端服務
│   ├── auth/                # 認證服務
│   ├── payment/             # 支付服務
│   └── notification/        # 通知服務
├── tools/                   # 開發工具和腳本
│   ├── generators/          # 代碼生成器
│   ├── scripts/             # 實用腳本
│   └── testing/             # 測試工具
├── docs/                    # 文檔
│   ├── architecture/        # 架構文檔
│   ├── guides/              # 開發指南
│   └── api/                 # API 文檔
├── .eslintrc.js             # ESLint 配置
├── .prettierrc              # Prettier 配置
├── jest.config.js           # Jest 配置
├── lerna.json               # Lerna 配置（如果使用）
├── nx.json                  # Nx 配置（如果使用）
├── package.json             # 根 package.json
├── pnpm-workspace.yaml      # PNPM 工作空間配置（如果使用）
├── tsconfig.json            # 基礎 TypeScript 配置
└── README.md                # 項目說明
```

## 資料夾說明

### .github/

**用途**：存放 GitHub 相關配置文件。
**內容**：
- `workflows/`: GitHub Actions 工作流程定義
- `ISSUE_TEMPLATE/`: Issue 模板
- `PULL_REQUEST_TEMPLATE.md`: PR 模板

**規範**：
- 所有 CI/CD 流程應定義在 `workflows/` 中
- 保持工作流程模組化，避免過於複雜的單一工作流程
- 使用標準的 issue 和 PR 模板以確保提交質量

### .husky/

**用途**：設定 Git Hooks，確保提交前執行代碼檢查和測試。
**內容**：
- `pre-commit`: 提交前執行的腳本
- `commit-msg`: 驗證提交信息
- `pre-push`: 推送前執行的檢查

**規範**：
- 所有開發者必須安裝 husky 以啟用 Git Hooks
- 提交前必須通過 lint 和基本單元測試
- 提交信息必須遵循 [Conventional Commits](https://www.conventionalcommits.org/) 規範

### apps/

**用途**：包含所有面向最終用戶的應用程式。
**內容**：

#### web/
**用途**：面向用戶的 Web 應用程式。
**技術堆疊**：React, Next.js, TypeScript
**結構**：
```
web/
├── public/                  # 靜態資源
├── src/
│   ├── components/          # 應用專屬組件
│   ├── pages/               # 頁面組件
│   ├── hooks/               # React Hooks
│   ├── contexts/            # React Contexts
│   ├── styles/              # 樣式文件
│   ├── types/               # TypeScript 類型定義
│   └── utils/               # 應用專屬工具函數
├── package.json             # 套件配置
└── tsconfig.json            # TypeScript 配置
```

#### admin/
**用途**：後台管理系統。
**技術堆疊**：React, Ant Design, TypeScript
**結構**：類似 web/ 的結構

#### mobile/
**用途**：移動端應用。
**技術堆疊**：React Native, TypeScript
**結構**：遵循 React Native 最佳實踐

#### desktop/
**用途**：桌面應用。
**技術堆疊**：Electron, React, TypeScript
**結構**：遵循 Electron 應用最佳實踐

**規範**：
- 應用程式不應直接依賴其他應用程式
- 共享功能應移至 packages/ 中
- 每個應用程式必須包含自己的 README.md、測試和文檔
- 應用程式應使用共享的配置和工具鏈

### packages/

**用途**：存放內部共享套件，可被多個應用程式或服務引用。
**內容**：

#### ui/
**用途**：共享 UI 組件庫。
**技術堆疊**：React, Styled-components/Emotion, TypeScript, Storybook
**結構**：
```
ui/
├── src/
│   ├── components/          # UI 組件
│   ├── hooks/               # UI 相關 hooks
│   ├── styles/              # 主題和樣式
│   └── types/               # 類型定義
├── .storybook/              # Storybook 配置
├── package.json             # 套件配置
└── tsconfig.json            # TypeScript 配置
```

#### utils/
**用途**：通用工具函數和輔助方法。
**技術堆疊**：TypeScript
**結構**：
```
utils/
├── src/
│   ├── formats/             # 格式化函數
│   ├── validators/          # 驗證函數
│   ├── helpers/             # 輔助函數
│   └── types/               # 類型定義
├── package.json             # 套件配置
└── tsconfig.json            # TypeScript 配置
```

#### api/
**用途**：API 客戶端和相關邏輯。
**技術堆疊**：TypeScript, Axios/fetch
**結構**：
```
api/
├── src/
│   ├── clients/             # API 客戶端
│   ├── endpoints/           # 端點定義
│   ├── interceptors/        # 請求/回應處理器
│   ├── mocks/               # 模擬資料
│   └── types/               # 類型定義
├── package.json             # 套件配置
└── tsconfig.json            # TypeScript 配置
```

#### config/
**用途**：共享配置。
**技術堆疊**：TypeScript
**結構**：
```
config/
├── src/
│   ├── eslint/              # ESLint 預設設定
│   ├── typescript/          # TypeScript 預設設定
│   ├── jest/                # Jest 預設設定
│   └── prettier/            # Prettier 預設設定
├── package.json             # 套件配置
└── tsconfig.json            # TypeScript 配置
```

**規範**：
- 套件應使用明確的語義化版本管理
- 每個套件必須有完整的單元測試和文檔
- 必須定義清晰的公開 API，避免內部實現泄漏
- 使用 TypeScript 並提供完整的類型定義
- 建立明確的依賴關係，避免循環依賴

### services/

**用途**：後端服務和微服務。
**內容**：

#### auth/
**用途**：認證和授權服務。
**技術堆疊**：Node.js, Express/NestJS, TypeScript
**結構**：
```
auth/
├── src/
│   ├── controllers/         # 控制器
│   ├── middlewares/         # 中間件
│   ├── models/              # 資料模型
│   ├── services/            # 業務邏輯
│   └── utils/               # 工具函數
├── test/                    # 測試
├── package.json             # 套件配置
└── tsconfig.json            # TypeScript 配置
```

#### payment/
**用途**：支付處理服務。
**技術堆疊**：Node.js, Express/NestJS, TypeScript
**結構**：類似 auth/ 的結構

#### notification/
**用途**：通知服務。
**技術堆疊**：Node.js, Express/NestJS, TypeScript
**結構**：類似 auth/ 的結構

**規範**：
- 服務應設計為獨立部署單元
- 服務間通信應使用明確定義的 API
- 每個服務必須有完整的集成測試和文檔
- 服務應遵循微服務最佳實踐，如容錯、監控和可伸縮性
- 使用環境變數進行配置管理

### tools/

**用途**：開發工具和腳本，提高開發效率。
**內容**：

#### generators/
**用途**：代碼生成器，用於快速創建新組件、服務等。
**技術堆疊**：Node.js, Plop
**結構**：
```
generators/
├── templates/               # 模板文件
├── src/                     # 生成器邏輯
├── package.json             # 套件配置
└── plop-templates.js        # Plop 配置
```

#### scripts/
**用途**：實用腳本，如批量操作、版本管理等。
**技術堆疊**：Node.js, Shell
**結構**：
```
scripts/
├── src/
│   ├── release/             # 發布相關腳本
│   ├── ci/                  # CI 腳本
│   └── dev/                 # 開發輔助腳本
├── package.json             # 套件配置
└── tsconfig.json            # TypeScript 配置
```

#### testing/
**用途**：測試工具和輔助函數。
**技術堆疊**：Jest, Testing Library, TypeScript
**結構**：
```
testing/
├── src/
│   ├── fixtures/            # 測試資料
│   ├── mocks/               # 模擬對象
│   ├── utils/               # 測試工具
│   └── setup/               # 測試設置
├── package.json             # 套件配置
└── tsconfig.json            # TypeScript 配置
```

**規範**：
- 工具應有完整的文檔和示例
- 腳本應支持跨平台運行
- 生成的代碼應遵循項目規範
- 工具應易於擴展和配置

### docs/

**用途**：項目文檔。
**內容**：

#### architecture/
**用途**：架構文檔，描述系統整體設計和組件關係。
**結構**：
```
architecture/
├── overview.md              # 系統概覽
├── diagrams/                # 架構圖
├── decisions/               # 架構決策記錄 (ADRs)
└── components/              # 組件說明
```

#### guides/
**用途**：開發指南和教程。
**結構**：
```
guides/
├── getting-started.md       # 入門指南
├── contribution.md          # 貢獻指南
├── code-style.md            # 代碼風格指南
└── best-practices.md        # 最佳實踐
```

#### api/
**用途**：API 文檔。
**結構**：
```
api/
├── overview.md              # API 概覽
├── authentication.md        # 認證說明
├── endpoints/               # 端點文檔
└── examples/                # 使用示例
```

**規範**：
- 文檔應使用 Markdown 格式
- 架構圖應使用標準工具（如 PlantUML、Draw.io）創建
- 所有公開 API 必須有文檔
- 文檔應隨代碼變更而更新

## 規範與最佳實踐

### 代碼風格

- 使用 ESLint、Prettier 和 TypeScript 確保代碼一致性
- 遵循功能設計模式和 SOLID 原則
- 所有代碼必須通過靜態分析和 lint 檢查
- 使用統一的命名規範（如駝峰式命名法、類型首字母大寫）

### 版本控制

- 遵循 [Conventional Commits](https://www.conventionalcommits.org/) 提交規範
- 使用語義化版本控制（[SemVer](https://semver.org/)）
- 主要功能開發使用 feature 分支
- 使用 pull request 進行代碼審查
- 使用 squash merge 保持提交歷史整潔

### 套件管理

- 使用 pnpm 作為套件管理器，利用其硬連結功能節省磁碟空間
- 使用工作空間（workspace）功能管理內部依賴
- 鎖定依賴版本，確保構建可重現性
- 定期更新依賴以修復安全漏洞

### 測試策略

- 所有共享套件必須達到至少 80% 的測試覆蓋率
- 使用單元測試、集成測試和端到端測試的組合
- 測試應獨立、快速且可靠
- 使用模擬（mock）和存根（stub）隔離測試

### 文檔要求

- 所有公開 API 和組件必須有文檔
- 使用 JSDoc 或 TSDoc 注釋代碼
- 保持 README.md 文件更新
- 文檔應包含使用示例

## 工具配置

### 構建工具

我們使用以下工具進行項目構建和管理：

- **Nx** 或 **Turborepo**：用於管理 monorepo 工作流程
- **TypeScript**：用於靜態類型檢查
- **ESLint**：用於代碼質量檢查
- **Prettier**：用於代碼格式化
- **Jest**：用於單元和集成測試
- **Cypress**：用於端到端測試
- **Storybook**：用於 UI 組件開發和文檔
- **Husky**：用於 Git Hooks
- **Commitlint**：用於驗證提交信息

### 依賴管理

- 使用 **pnpm** 作為套件管理器
- 使用 `pnpm-workspace.yaml` 定義工作空間
- 使用 `changesets` 管理發布和變更記錄
- 使用 `.npmrc` 配置套件註冊表和安裝選項

## 開發流程

### 設置開發環境

```bash
# 安裝 pnpm（如果尚未安裝）
npm install -g pnpm

# 克隆儲存庫
git clone https://github.com/organization/monorepo.git
cd monorepo

# 安裝依賴
pnpm install

# 設置 Git Hooks
pnpm husky install
```

### 常用命令

```bash
# 運行所有測試
pnpm test

# 運行特定套件或應用的測試
pnpm test --filter=@org/package-name

# 構建所有項目
pnpm build

# 構建特定套件或應用
pnpm build --filter=@org/package-name

# 啟動開發服務器
pnpm dev

# 運行 lint 檢查
pnpm lint

# 自動修正 lint 問題
pnpm lint:fix

# 創建新組件（使用生成器）
pnpm generate component

# 創建新套件
pnpm generate package
```

### 分支策略

- `main`：主要開發分支，所有功能開發完成後合併至此
- `production`：生產環境分支，僅接受從 `main` 合併的穩定版本
- `feature/*`：功能開發分支
- `bugfix/*`：錯誤修復分支
- `release/*`：發布準備分支

### 發布流程

1. 創建變更集（changeset）描述變更
2. 變更被合併到 `main` 分支
3. 發布機器人創建 PR 更新版本和變更日誌
4. 審查並合併 PR
5. CI 自動發布到套件註冊表

## 常見問題

### Q: 如何添加新的依賴？

A: 使用 pnpm 添加依賴：

- 全局依賴（所有套件共享）：
  ```bash
  pnpm add -w package-name
  ```

- 特定套件或應用的依賴：
  ```bash
  pnpm add package-name --filter=@org/target-package
  ```

### Q: 如何創建新套件？

A: 使用生成器創建新套件：
```bash
pnpm generate package
```
或手動創建套件目錄並設置必要的文件，然後將其添加到 `pnpm-workspace.yaml`。

### Q: 如何處理套件間的依賴？

A: 在 `package.json` 中引用其他內部套件：
```json
{
  "dependencies": {
    "@org/utils": "workspace:*"
  }
}
```
使用 `workspace:*` 指示 pnpm 使用工作空間中的版本。

### Q: 如何確保變更不會破壞其他套件？

A: 確保有足夠的測試覆蓋率，特別是針對公開 API。使用 CI 在每次 PR 中運行所有套件的測試。考慮使用依賴圖工具（如 Nx 或 Turborepo）只運行受影響的測試。

### Q: 如何管理不同套件的版本？

A: 使用 Changesets 或 Lerna 等工具進行版本管理。考慮使用獨立版本或鎖定版本策略，具體取決於專案需求。

