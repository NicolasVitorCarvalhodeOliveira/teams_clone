const R = require('../models/Room')

class Room {
    static async createRoom(req, res) {
        try {
            const uId = require('jsonwebtoken').verify(req.headers.authorization.split(' ')[1], '123').id;

            const { name, description, capacity } = req.body;

            const nR = await R.create({
                name,
                description,
                capacity,
                isActive: true,
                createdBy: uId
            });

            return res.status(201).json(nR);
        } catch (err) {
            const errs = [];
            err.errors.forEach(e => {
                errs.push({ error: e.message, field: e.path });
            });
            return res.status(400).json(errs);
        }
    }
    static async list(req, res) {
        try {
            const rooms = await R.findAll();
            return res.status(200).json(rooms);
        } catch (err) {
            const errs = [];
            err.errors.forEach(e => {
                errs.push({ error: e.message, field: e.path });
            });
            return res.status(400).json(err);
        }
    }
    static async join(req, res) {
        try {
            const uId = require('jsonwebtoken').verify(req.headers.authorization.split(' ')[1], '123').id;
            console.log(uId)

            const r = await R.findByPk(req.body.roomId);
            if (!r){
                res.status(401).json({message: "roomId not found"})
            }

            return res.status(201).json({message: 'You joined the room'});
        } catch (err) {
            const errs = [];
            err.errors.forEach(e => {
                errs.push({ error: e.message, field: e.path });
            });
            return res.status(400).json(errs);
        }
    }
}

module.exports = Room;