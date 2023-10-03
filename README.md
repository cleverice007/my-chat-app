# my-chat-app

## 注意

本項目旨在設計一個交友軟體聊天室，練習使用 WebSocket、SQL 資料庫和 Tailwind CSS。

![chat](https://github.com/cleverice007/my-chat-app/blob/main/%E6%88%AA%E5%9C%96%202023-10-02%20%E4%B8%8B%E5%8D%8811.16.43.png?raw=true)
### 🛠️ 環境建置

- **本地開發環境**
  - 使用 Express 框架和 MySQL 資料庫

### ☁️ 雲端服務配置

- **EC2**: 部署後端應用
- **RDS**: 資料庫托管

#### 🚀 部署到 AWS EC2 和 Nginx

- 使用 SSH 連接到 AWS EC2 實例並上傳前端和後端代碼。
- 將 React 應用的 `build` 文件夾放在 Nginx 服務器上。

### ⚙️ 後端開發

- **認證和授權**: 使用 passport.js 和 bcrypt
- **API 設計和實現**: 根據需求設計 RESTful API
- **實時通訊**: 使用 WebSocket

### 🎨 前端開發

- 使用 React 和 Tailwind CSS
- **狀態管理**: 使用 Redux

### 登入功能

**前端功能：**
- 表單驗證: 使用 react-hook-form 進行用戶輸入的表單驗證。這會確保所有必填字段都已經填寫，並且格式正確。

- 發送登入請求: 驗證通過後，使用 axios 發送 POST 請求到後端的 /api/login 端點，載有用戶輸入的 email 和密碼。

- 解碼 JWT: 收到後端的回應後，用 jwt-decode 對返回的 JSON Web Token (JWT) 進行解碼，以獲取用戶信息。

- 更新全局狀態: 用 Redux 的 dispatch 方法更新全局狀態，存儲解碼後的用戶 ID 和用戶個人信息。

- 路由跳轉: 最後，如果登入成功，使用 React Router 的 useNavigate 方法將用戶導航到他們的個人資料頁面。

**後端功能：**
- 查找用戶: 接收到前端發來的請求後，查找數據庫以確認提供的 email 是否存在。

- 密碼核對: 使用 bcrypt 對用戶輸入的密碼和數據庫中存儲的密碼進行比對。

- 生成 JWT: 如果 email 和密碼都匹配，則生成一個 JWT 並設置過期時間。

- 返回結果: 最後，將生成的 JWT 和用戶的個人資料作為 JSON 對象返回給前端。

### 聊天功能（未完成）
**前端**
- 用戶列表展示: 使用 React 來渲染所有可用的用戶列表。每個用戶都是一個 UserCard component。

- 選擇聊天對象: 當點擊 UserCard 組件時，會觸發 fetchOrCreateChatAndFetchMessages 函數，該函數會與後端交互，獲取或創建聊天室和相關消息。

- Chat Panel: 使用 ChatPanel 組件來展示與選定用戶的實時聊天。這個組件也負責發送和接收 Socket.io 訊息。

- 狀態管理: 使用 Redux 和 useSelector 來管理全局狀態，比如當前登入的用戶 ID。

- Socket.io 連接: 使用 useEffect 和 io 函數從 Socket.io 庫中建立 Socket 連接。

**後端**
- 用戶認證: 透過 JWT Token 進行用戶認證。

- 資料庫操作: 使用 Sequelize 和 MySQL 管理用戶、聊天室和消息數據。

- Socket.io 服務: 負責管理所有的實時連接，並在適當的時候廣播訊息。

- API 端點: 提供多個 RESTful API 端點以供前端調用，例如 /api/userprofiles 和 /api/getOrCreateChatAndFetchMessages。





