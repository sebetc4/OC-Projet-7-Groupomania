// Imports
const models = require('../models');
const attributes = require('../utils/attributesInRes')
const bcrypt = require("bcrypt");


// Contrôleur d'inscription
exports.createUser = async (req, res, next) => {
    const { email, lastName, firstName, password } = req.body;
    if (email === null || lastName === null || firstName === null || password == null) {
        return res.status(400).send('Missing parameters');
    }
    try {
        const newUser = await models.User.create({
            email,
            firstName,
            lastName,
            password
        })
        return res.status(201).json({ userId: newUser.id })
    } catch (err) {
        return res.status(500).json({ path: err.errors[0].path, error: err.errors[0].message })
    }
}

// Controleur de récupération de tous les utilisateurs
exports.getAllUsers = async (req, res, next) => {
    try {
        const users = await models.User.findAll({
            attributes: attributes.user
        })
        return res.status(200).json(users)
    } catch (err) {
        return res.status(500).send('Unable to get all users')
    }
}

exports.getOneUser = async (req, res, next) => {
    try {
        const user = await models.User.findOne({
            where: { id: req.params.id },
            attributes: attributes.user
        })
        if (!user) {
            return res.status(400).send(`ID unknown ${req.params.id}`)
        }
        return res.status(200).json(user)
    } catch (err) {
        return res.status(500).send('Unable to get user')
    }
}

const getImageUrl = (req) => {
    if (req.body.origin === 'avatar') {
        return { avatarUrl: `${req.protocol}://${req.get("host")}/images/${req.files.avatar[0].filename}` }
    } else if (req.body.origin === 'cover') {
        return { coverUrl: `${req.protocol}://${req.get("host")}/images/${req.files.cover[0].filename}` }
    }
}

const getUserObject = (req) => {
    return req.files ? (
        getImageUrl(req)
    ) :
        {
            email: req.body.email,
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            password: req.body.password,
            bio: req.body.bio
        }
}

exports.updateUser = async (req, res, next) => {
    try {
        const user = await models.User.findOne({
            where: { id: req.params.id },
            attributes: attributes.user
        })
        if (!user) {
            return res.status(400).send(`ID unknown ${req.params.id}`)
        }
        const userObject = getUserObject(req)
        await user.update(userObject);
        res.status(200).json({ ...userObject })
    } catch (err) {
        return res.status(500).send({err})
    }
}

exports.updatePassword = async (req, res, next) => {
    const { password, newPassword } = req.body;
    if (password === null || newPassword === null) {
        return res.status(400).send('missing parameters');
    }
    try {
        const user = await models.User.findOne({
            where: { id: req.params.id }
        })
        if (!user) {
            return res.status(400).send(`ID unknown ${req.params.id}`)
        }
        const validPassword = bcrypt.compareSync(password, user.password)
        if (!validPassword) {
            return res.status(403).json({ error: "invalid password" });
        }
        await user.update({ password: newPassword })
        res.status(200).json("Modification effectuée")
    } catch (err) {
        return res.status(500).send({ err })
    }
}



exports.deleteUser = async (req, res, next) => {
    try {
        const user = await models.User.findOne({
            where: { id: req.params.id }
        })
        if (!user) {
            return res.status(400).send(`ID unknown ${req.params.id}`)
        }
        await user.destroy()
        res.status(200).json("Supression effectuée")
    } catch (err) {
        return res.status(500).send({ err })
    }
}
