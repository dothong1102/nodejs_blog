const newsRouter = require('./news');
const siteRouter = require('./site');

function route(app) {
    // newsRouter
    app.use('/news', newsRouter);

    // siteRouter
    app.get('/search', siteRouter);
    app.use('/', siteRouter);




}

module.exports = route;