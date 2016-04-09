// My Test Module
module.exports = function(app) {  

    // The /test route
    app.use('/test', function(req, res, next) {
        res.end('test module');
        next();
    });

};