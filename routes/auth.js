
const { Router } = require('express');
const router = Router();

const { createUser, fetchUsers, updateUser, userLogin } = require('../controllers/auth');

router.get('/', (req, res) => {
    res.status(201).json({
        ok: true,
        route: '/'
    });
});

router.post(
    '/new',
    [],
    createUser
);

router.post(
    '/login',
    [],
    userLogin
)

router.get(
    '/users',
    [],
    fetchUsers
);

router.put(
    '/update/:id',
    [],
    updateUser
);


module.exports = router;