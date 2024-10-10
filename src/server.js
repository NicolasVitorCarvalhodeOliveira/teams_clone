const e = require('express');
const a = require('express')();

a.use(e.json());

const User = require('./controllers/User');
const Room = require('./controllers/Room');

const authToken = require('./authMiddleware');

a.post('/auth/register', User.register);
a.post('/auth/login', User.login);
a.post('/api/rooms', authToken ,Room.createRoom);
a.get('/api/rooms', authToken ,Room.list);
a.post('/api/rooms/join', authToken, Room.join);


a.listen(3000, () => {
    console.log('3000')
});