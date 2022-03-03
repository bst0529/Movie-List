//引用模組
const express = require('express')
const app = express()
const port = 3000

//引用 express-handlebars 模組
const exphbs = require('express-handlebars')

//告訴 Express 把樣板引擎交給 express-handlebars
app.engine('hbs', exphbs.engine({extname: '.hbs',defaultLayout: 'main'}))
//告訴 Express 要設定的 view engine 是 handlebars
app.set('view engine', 'hbs')

//設定 routes
app.get('/', (req, res) => {
    res.render('index')
})

//啟動並監聽 Express Server
app.listen(port, () => {
    console.log(`Web is starting on http://localhost:${port}`)
})