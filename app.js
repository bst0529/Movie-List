//引用模組
const express = require('express')
const app = express()
const port = 3000

//引用 express-handlebars 模組
const exphbs = require('express-handlebars')

//載入 json 資料
const movieList = require('./movies.json')

//告訴 Express 把樣板引擎交給 express-handlebars
app.engine('hbs', exphbs.engine({extname: '.hbs',defaultLayout: 'main'}))
//告訴 Express 要設定的 view engine 是 handlebars
app.set('view engine', 'hbs')

//設定靜態檔案資料夾
app.use(express.static('public'))

//設定 routes
app.get('/', (req, res) => {
    //將變數 movieList 傳遞至 partial template
    res.render('index', { movies: movieList.results })
})

app.get('/movie/1', (req, res) => {
    const movieOne = {
        id: 1,
        title: 'Jurassic World: Fallen Kingdom',
        description:
          'Several years after the demise of Jurassic World, a volcanic eruption threatens the remaining dinosaurs on the island of Isla Nublar. Claire Dearing, the former park manager and founder of the Dinosaur Protection Group, recruits Owen Grady to help prevent the extinction of the dinosaurs once again.',
        release_date: '2018-06-06',
        image: 'c9XxwwhPHdaImA2f1WEfEsbhaFB.jpg'
    }
    res.render('show', { movie: movieOne })
})

//啟動並監聽 Express Server
app.listen(port, () => {
    console.log(`Web is starting on http://localhost:${port}`)
})