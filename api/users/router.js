const { createUser ,getUser , getUserById ,updateUser ,deleteUser ,login } = require('./controller');
const router = require('express').Router();
const { chekToken } = require('../../auth/token_validation');

router.post('/' , chekToken , createUser);
router.get('/' , chekToken ,getUser);
router.get('/:id' ,chekToken,  getUserById);
router.put('/' ,chekToken, updateUser);
router.delete('/' ,chekToken , deleteUser);
router.post('/login' , login);

module.exports = router;