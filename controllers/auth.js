const { request, response } = require('express');
const { validationResult } = require('express-validator');
const User = require('../models/user');
const bcrypt = require('bcryptjs');
const { generateJWT } = require('../helpers/jwt');
const res = require('express/lib/response');

const createUser = async (req = request, resp = response) => {

    try {
        const { email, password } = req.body;

        const existEmail = await User.findOne({ email });

        if (existEmail) {
            return resp.status(400).json({
                ok: false,
                msg: 'Email already registered'
            });
        }

        const user = new User(req.body);

        // encrypt password
        const salt = bcrypt.genSaltSync();
        user.password = bcrypt.hashSync(password, salt);

        await user.save();

        // generate JWT
        const token = await generateJWT(user.id);

        resp.json({
            ok: true,
            msg: { user, token, }
        });

    } catch (error) {
        console.log('auth $error',error);
        return resp.status(400).json({
            ok: false,
            msg: 'Server Error'
        });
    }

}

// login user 
const loginUser = async (req = request, resp = response) => {
    try {
        const { email, password } = req.body;

        // check if user don't exists
        const user = await User.findOne({ email });

        if (!user) {
            return resp.status(404).json({
                ok: false,
                msg: 'Invalid Credentials'
            });
        }

        // validate password
        const validPassword = bcrypt.compareSync(password, user.password);

        if (!validPassword) {
            return resp.status(400).json({
                ok: false,
                msg: 'Invalid Credentials'
            });
        }

        // generate JWT
        const token = await generateJWT(user.id);

        resp.json({
            ok: true,
            msg: { user, token, }
        });

    } catch (error) {
        console.log('auth $error',error);
        return resp.status(400).json({
            ok: false,
            msg: 'Server Error'
        });
    }
}


const renewToken = async (req = request, resp = response) => {

    // search user by id
    const user = await User.findById(req.uid);

    // generate new JWT
    const token = await generateJWT(req.uid);

    resp.json({
        ok: true,
        msg: {
            user, token
        }
    });
};

module.exports = {
    createUser, loginUser, renewToken
};
