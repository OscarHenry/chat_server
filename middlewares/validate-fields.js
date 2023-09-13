const { validationResult } = require('express-validator');

const validateFields = (req = request,resp = response,next) => {
    const errs = validationResult(req);

    // return error if validator found any error
    if (!errs.isEmpty()) {
        return resp.status(400).json({
            ok: false,
            errors: errs.mapped()
        });
    }

    next();
}

module.exports = {validateFields}