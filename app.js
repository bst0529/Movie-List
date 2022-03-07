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

app.get('/movie/:move_id', (req, res) => {
    let movie = movieList.results.find(movie => movie.id.toString() === req.params.move_id)
    res.render('show', { movie: movie })
})

app.get('/Search', (req, res) => {
    const keyword = req.query.keyword
    const movies = movieList.results.filter(movie => {
        return movie.title.toLowerCase().includes(keyword.toLowerCase())
    })
    res.render('index',{ movies: movies,keyword: keyword  })
})

//啟動並監聽 Express Server
app.listen(port, () => {
    console.log(`Web is starting on http://localhost:${port}`)
})