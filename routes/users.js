const {
    Router
} = require("express")

const router = Router();


// Database

let users = [{
        id: 1,
        name: "Mark",
        age: "24",
        active: true
    },
    {
        id: 2,
        name: "Leslie",
        age: "20",
        active: true
    },
    {
        id: 3,
        name: "Jack",
        age: "52",
        active: false
    }
]


// Get all users

router.get('/users', (req, res) => {
    res.json(users)
})


// Get one user

router.get('/users/:id', (req, res) => {
    let user = users.find(userInArray => userInArray.id === parseInt(req.params.id));
    if (!user) {
        return res.status(404).send({
            message: 'User not found'
        });
    }
    res.json(user)
})


// Add user

router.post('/users', (req, res) => {
    users.push({
        id: users.length + 1,
        ...req.body
    })
    res.json(users)
})


// Edit user

router.put('/users/:id', (req, res) => {
    let userInDB = users.find(user => user.id === parseInt(req.params.id));
    if (!userInDB) {
        return res.status(404).json({
            message: 'User not found'
        })
    }
    users = users.map(user => user.id === parseInt(req.params.id) ? {
        ...user,
        ...req.body
    } : user)
    res.json(users)
})


// Delete user

router.delete('/users/:id', (req, res) => {
    let userIndex = users.findIndex(user => user.id === parseInt(req.params.id));
    if (userIndex === -1) {
        return res.status(404).send({
            message: 'User not found'
        });
    }
    users.splice(userIndex, 1);
    res.json(users)
})


// Exports

module.exports = router;