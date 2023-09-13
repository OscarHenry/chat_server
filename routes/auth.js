

/**
 * path: api/login
 */

const {Router}  = require('express');
const { createUser , loginUser ,renewToken} = require('../controllers/auth');
const { check, body } = require('express-validator');
const { validateFields } = require('../middlewares/validate-fields');
const UserCollection = require('../models/user');
const { validateJWT } = require('../middlewares/validate-jwt');
const router = Router();

router.post('/new',[
    body(['name','email','password'],'Missing required field').not().isEmpty(),
    body('email').isEmail().withMessage('Not a valid e-mail address'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
    validateFields,
],createUser);

router.post('/',[
    body('email').isEmail().withMessage('Invalid Credentials'),
    body('password').isLength({ min: 6 }).withMessage('Invalid Credentials'),
    validateFields,
],loginUser);

router.get('/renew',validateJWT,renewToken);

module.exports = router;