//引用模組
const express = require('express')
const app = express()
const port = 3000

//設定routes
app.get('/', (req, res) => {
    res.send('這裡是根路徑')
})

//啟動並監聽Express Server
app.listen(port, () => {
    console.log(`Web is starting on http://localhost:${port}`)
})