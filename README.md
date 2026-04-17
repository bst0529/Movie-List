# Vue 3 股票量化交易儀表板

## 1️⃣ 畫面版面配置 (Wireframe)

```mermaid
flowchart TB
    MainUI["量化交易儀表板 - 畫面版面配置 (Wireframe)"]

    subgraph TopPanel ["🔝 頂部：控制與摘要區 (Height: 10%)"]
        Search["🔍 股票搜尋框: 0050"]
        Date["📅 回測區間: 2016-01-01 至今"]
        KPIs["📊 總獲利: 145.2% | 勝率: 68% | MDD: -12.4%"]
        
        Search -->|連動| Date
        Date -->|連動| KPIs
    end

    subgraph ChartPanel ["📊 中間：三層連動圖表區 (Height: 60%)"]
        C1["第一層 主圖<br/>價量 K 線 + MA60 季線"]
        C2["第二層 副圖<br/>KD 9-3-3 指標"]
        C3["第三層 訊號<br/>KD 死叉/金叉買賣標記"]
        
        C1 --> C2
        C2 --> C3
    end

    subgraph BottomPanel ["📋 底部：回測數據報表區 (Height: 30%)"]
        Table["📑 逐筆交易紀錄表<br/>(進出場日期、價格、單筆損益%)"]
        Curve["📈 資金累積曲線與回檔圖<br/>(總資產變化走勢)"]
        
        Table ---|並行顯示| Curve
    end

    MainUI --> TopPanel
    TopPanel --> ChartPanel
    ChartPanel --> BottomPanel

    classDef root fill:#0F0F0F,stroke:#42B883,stroke-width:3px,color:#42B883
    classDef panel fill:#1E1E1E,stroke:#42B883,stroke-width:2px,stroke-dasharray: 5 5,color:#FFF
    classDef control fill:#2C3E50,stroke:#34495E,stroke-width:1px,color:#FFF
    classDef highlight fill:#183153,stroke:#2196F3,stroke-width:2px,color:#64B5F6

    class MainUI root
    class TopPanel,ChartPanel,BottomPanel panel
    class Search,Date,Table,Curve control
    class KPIs,C1,C2,C3 highlight
```

## 2️⃣ Vue 3 組件架構樹

```mermaid
graph TD
    App["App.vue<br/>前端主應用程式"]

    Header["Header.vue<br/>頂部控制列"]
    Dashboard["Dashboard.vue<br/>核心圖表儀表板"]
    BottomPanel["ReportPanel.vue<br/>底部回測報表區"]

    Search["SearchBar.vue<br/>股票模糊搜尋輸入框"]
    DateRange["DateSelector.vue<br/>日期區間過濾器"]
    KPI["KPICards.vue<br/>策略績效摘要卡片"]

    ChartContainer["SyncChartContainer.vue<br/>三層連動圖表容器"]
    Layer1["MainChart.vue<br/>第一層：K線與 MA60 主圖"]
    Layer2["KDChart.vue<br/>第二層：KD 指標副圖"]
    Layer3["SignalChart.vue<br/>第三層：買賣訊號標記圖"]
    Crosshair(["CrosshairController<br/>全局 X 軸游標連動邏輯"])

    TradeTable["TradeLogTable.vue<br/>逐筆交易明細表"]
    EquityCurve["EquityChart.vue<br/>資金累積曲線圖"]

    App --> Header
    App --> Dashboard
    App --> BottomPanel

    Header --> Search
    Header --> DateRange
    Header --> KPI

    Dashboard --> ChartContainer
    ChartContainer --> Layer1
    ChartContainer --> Layer2
    ChartContainer --> Layer3
    
    ChartContainer -.->|共用時間軸狀態| Crosshair
    Layer1 -.->|監聽游標位置| Crosshair
    Layer2 -.->|監聽游標位置| Crosshair
    Layer3 -.->|監聽游標位置| Crosshair

    BottomPanel --> TradeTable
    BottomPanel --> EquityCurve

    classDef root fill:#1A1A1A,color:#42B883,stroke:#42B883,stroke-width:2px
    classDef layout fill:#2C3E50,color:#FFF,stroke:#34495E,stroke-width:2px
    classDef component fill:#34495E,color:#FFF,stroke:#42B883,stroke-dasharray: 5 5
    classDef logic fill:#E6A23C,color:#000,stroke:#D35400,stroke-width:2px

    class App root
    class Header,Dashboard,BottomPanel layout
    class Search,DateRange,KPI,ChartContainer,Layer1,Layer2,Layer3,TradeTable,EquityCurve component
    class Crosshair logic
```

## 🎯 架構關鍵要點

### 版面設計
- **頂部 (10%)**: 搜尋、日期篩選、績效指標
- **中間 (60%)**: 三層連動K線圖表，共用游標與時間軸
- **底部 (30%)**: 交易紀錄表 + 資金曲線圖

### 組件特性
✅ **三層連動圖表**: MainChart → KDChart → SignalChart  
✅ **共用游標控制器**: CrosshairController 管理全局 X 軸位置  
✅ **狀態共享**: 虛線表示組件間的狀態監聽關係  
✅ **響應式佈局**: 使用 Flexbox 自動調整高度比例

### 資料流向
```
搜尋/日期篩選 → API 請求 → 圖表資料更新 → 三層圖表同步 → 回測報表更新
```
