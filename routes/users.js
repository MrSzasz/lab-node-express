const {
    Router
} = require("express")
require('../database/db')
const User = require("../models/User")

const router = Router();

// Get all users

router.get('/users', async (req, res) => {
    try {
        let usersInDB = await User.find().lean()
        return res.json(usersInDB)
    } catch (err) {
        console.error(err)
    }
})


// Get one user

router.get('/users/:name', async (req, res) => {
    try {
        let name = (req.params.name).toLowerCase();
        let oneUserInDB = await User.findOne({
            name
        }).lean()
        oneUserInDB ?
            res.json(oneUserInDB) :
            res.status(404).json({
                error: 'User not found'
            })
    } catch (err) {
        console.error(err)
    }
})


// Add user

router.post('/users', async (req, res) => {
    try {
        let name = (req.body.name).toLowerCase()
        const userToDB = new User({
            name
        })
        await userToDB.save()
        return res.json({
            message: 'success'
        })

    } catch (err) {
        console.error(err);
    }
})


// Edit user

router.put('/users/:name', async (req, res) => {
    try {
        let data = (req.body.name).toLowerCase()
        let name = (req.params.name).toLowerCase()
        await User.findOneAndUpdate({
                name: name
            }, {
                name: data
            })
            .then(response => response !== null ? res.json({
                "message": "done"
            }) : res.status(400).json({
                message: "user not found"
            }))
    } catch (err) {
        console.error(err)
    }
})


// Delete user

router.delete('/users/:name', async (req, res) => {
    try {
        let name = (req.params.name).toLowerCase();
        await User.findOneAndDelete({
                name
            })
            .then(response => response !== null ? res.json({
                message: 'done'
            }) : res.status(404).json({
                message: 'user not found'
            }))
    } catch (err) {
        console.error(err)
    }
})


// Exports

module.exports = router;