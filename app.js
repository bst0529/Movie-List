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

//設定靜態檔案資料夾
app.use(express.static('public'))

//設定 routes
app.get('/', (req, res) => {
    //建立 movieList 儲存其內容
    const movieList = [
        {
            id: 1,
            title: 'Jurassic World: Fallen Kingdom',
            image: 'https://movie-list.alphacamp.io/posters/c9XxwwhPHdaImA2f1WEfEsbhaFB.jpg'
        },
        {
            id: 2,
            title: 'Ant-Man and the Wasp',
            image: 'https://movie-list.alphacamp.io/posters/rv1AWImgx386ULjcf62VYaW8zSt.jpg'
        }
    ]
    //將變數 movieList 傳遞至 partial template
    res.render('index', { movies: movieList })
})

//啟動並監聽 Express Server
app.listen(port, () => {
    console.log(`Web is starting on http://localhost:${port}`)
})