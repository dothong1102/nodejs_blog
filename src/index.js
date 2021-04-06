const express = require('express'); //đi vào thư mục node_modules để tải thư viện express trả về function
const app = express(); // gọi tới function express() trả về đối tượng đại diện cho ứng dụng nodejs để có thể xây dựng website
const port = 3001; // cổng chạy website

// morgan
const morgan = require('morgan');

//express handlebars
const handlebars = require('express-handlebars');
const path = require('path'); //
const { extname } = require('path');

//config route
const route = require('./routes');

//connect to db
const db = require('./config/db');

//middleware
const SortMiddleware = require('./app/middlewares/SortMiddleware');

//fix use put
var methodOverride = require('method-override');

db.connect();

//middleware
app.use(SortMiddleware);

// HTTP logger
app.use(morgan('combined'));

//Template engine
app.engine(
    'hbs',
    handlebars({
        extname: '.hbs',
        helpers: {
            sum: (a, b) => a + b,
            sortTable: (field, sort) => {
                const sortType = field === sort.column ? sort.type : 'default';

                const icons = {
                    default: 'oi oi-elevator',
                    asc: 'oi oi-sort-ascending',
                    desc: 'oi oi-sort-descending',
                };

                const types = {
                    default: 'desc',
                    asc: 'desc',
                    desc: 'asc',
                };

                const icon = icons[sortType];
                const type = types[sortType];

                return `<a href="?_sort&column=${field}&type=${type}">
                            <span class="${icon}"></span>
                        </a>`;
            },
        },
    }),
);
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'resources', 'views'));

//Static files
app.use(express.static(path.join(__dirname, 'public')));

//Middleware xử lý data POST từ form submit lên (req.body) - (tương tự như req.query.name của GET)
app.use(
    express.urlencoded({
        //Dữ liệu từ form submit lên
        extended: true, // Express sử dụng thư viện body-parser nên sẽ cảnh báo nếu không thêm dòng này
    }),
);
app.use(express.json()); //Sử dụng thư viện trong js, code js: XMLHttpRequest, fetch, axios, ajax,...

// use method put
app.use(methodOverride('_method'));

// routes init
route(app);

//127.0.0.1 - localhost
app.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`);
});
