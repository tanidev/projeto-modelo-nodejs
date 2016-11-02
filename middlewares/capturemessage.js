module.exports = function(req, resp, next) {
    var render = resp.render;
    resp.render = function(view, locals, cb) {
        //if (typeof locals == 'object') {
        resp.locals.success = req.flash("success");
        resp.locals.info = req.flash("info");
        resp.locals.warning = req.flash("warning");
        resp.locals.error = req.flash("error");
        //}
        render.call(resp, view, locals, cb);
    };
    next();
};
