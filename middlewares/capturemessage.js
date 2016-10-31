module.exports = function(req, resp, next) {
    var render = resp.render;
    resp.render = function(view, locals, cb) {
        if (typeof locals == 'object') {
          locals.success = req.flash("success");
          locals.info = req.flash("info");
          locals.warning = req.flash("warning");
          locals.error = req.flash("error");
        }
        render.call(resp, view, locals, cb);
    };
    next();
};
