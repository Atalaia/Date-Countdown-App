const express = require('express');
const router = express.Router();
const checkAuth = require('../middleware/checkAuth');

const event_controller = require('../controllers/event.controller');

router.get('/', checkAuth, event_controller.event_list);
router.get('/user/:userId', checkAuth, event_controller.user_event_list);
router.get('/:id', checkAuth, event_controller.user_event_detail);
router.post('/add', checkAuth, event_controller.event_add);
router.put('/edit/:id', checkAuth, event_controller.event_update);
router.delete('/delete/:id', checkAuth, event_controller.event_delete);

module.exports = router;