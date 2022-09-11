const { Router } = require("express")

const router = Router();

router.get('/users', (req, res) => {
    res.json({"oh hi":"mark"})
})

module.exports = router;
