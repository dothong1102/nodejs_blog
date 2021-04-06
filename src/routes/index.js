const newsRouter = require('./news');
const siteRouter = require('./site');
const coursesRouter = require('./courses');
const meRouter = require('./me');

function route(app) {
    // meRouter
    app.use('/me', meRouter);

    // courseRouter
    app.use('/courses', coursesRouter);

    // newsRouter
    app.use('/news', newsRouter);

    // siteRouter
    app.use('/', siteRouter);
}

module.exports = route;
