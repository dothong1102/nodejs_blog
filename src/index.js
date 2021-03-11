const express = require('express'); //đi vào thư mục node_modules để tải thư viện express trả về function
const app = express(); // gọi tới function express() trả về đối tượng đại diện cho ứng dụng nodejs để có thể xây dựng website
const port = 3000; // cổng chạy website

// morgan 
const morgan = require('morgan');

//express handlebars
const handlebars = require('express-handlebars');
const path = require('path'); //
const { extname } = require('path');

// HTTP logger
app.use(morgan('combined'))

//Template engine
app.engine('hbs', handlebars({
    extname: '.hbs'
}));
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'resources/views'));

//Static files
app.use(express.static(path.join(__dirname, 'public')));

// route
app.get('/', (req, res) => {
    res.render('home')
})

app.get('/news', (req, res) => {
    res.render('news')
})

//127.0.0.1 - localhost
app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})