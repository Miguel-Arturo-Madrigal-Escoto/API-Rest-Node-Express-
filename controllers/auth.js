const User = require("../models/User");

const { request, response } = require('express');
const bcrypt = require('bcryptjs');

const createUser = async (req = request, res = response) => {

    const { password } = req.body;

    try {
        
        const user = await new User(req.body);

        // hash user's password
        const salt = bcrypt.genSaltSync();
        user.password = bcrypt.hashSync(password, salt);

        const userDB = await user.save();

        return res.status(201).json({
            ok: true,
            data: userDB
        });

    } catch (error) {
        console.log(error)
        return res.status(400).json({
            ok: false,
            msg: 'Error al crear usuario'
        });
    }

}

const userLogin = async (req = request, res = response) => {

    const { email, password } = req.body;

    try {
        
        const userDB = await User.findOne({ email });

        if (!userDB){
            return res.json({
                ok: false,
                msg: 'Usuario inexistente'
            })
        }

        const hash = userDB.password;
        // COMPARE USER REQ.BODY PASSWORD WITH HASH
        const unhashedpassword = bcrypt.compareSync(password, hash);

        if (unhashedpassword){
            return res.json({
                ok: true,
                userLogged: {
                    name: userDB.name,
                    email: userDB.email
                }
            })
        }
        else {
            return res.json({
                ok: false,
                msg: 'Contraseña incorrecta'
            })
        }


    } catch (error) {
        return res.status(400).json({
            ok: false,
            msg: 'Error al hacer login'
        });
    }


}

const fetchUsers = async (req = request, res = response) => {

    try {
        
        const users = await User.find({});

        return res.status(200).json({
            ok: true,
            users
        });

    } catch (error) {
        return res.status(400).json({
            ok: false,
            msg: 'Error al obtener usuarios'
        });
    }

}

const updateUser = async (req = request, res = response) => {

    const userId = req.params.id;
    const newData = req.body;

    try {
        
        const userUpdated = await User.findByIdAndUpdate(userId, newData, { new: true });

        return res.status(201).json({
            ok: true,
            userUpdated
        })

    } catch (error) {
        return res.status(400).json({
            ok: false,
            msg: 'Error al actualizar usuario'
        });
    }

}

module.exports = {
    createUser,
    fetchUsers,
    updateUser,
    userLogin
}