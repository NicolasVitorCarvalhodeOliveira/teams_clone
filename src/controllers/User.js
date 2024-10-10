const U = require('../models/User')

function tokenExpiresIn(t){
    const ms = (require('jsonwebtoken').decode(t).exp * 1000) - Date.now();
    const h = Math.floor(ms / (1000 * 60 * 60));
    const m = Math.floor((ms % (1000 * 60 * 60)) / (1000 * 60));
    const s = Math.floor((ms % (1000 * 60)) / 1000);
    return `${h}h ${m}m ${s}s`
}

class User {
    static async register(req, res) {
        try {
            const f = req.body;
            const nU = await U.create({
                name: f.name,
                email: f.email,
                password: f.password,
                isUltraUser: true
            });
            return res.status(201).json(nU);
        } catch (err) {
            const errs = [];
            err.errors.forEach(e => {
                errs.push({ error: e.message, field: e.path })
            });
            return res.status(400).json(errs)
        }
    }

    static async login(req, res) {
        try{
            const {email, password} = req.body;
            const u = await U.findOne({where: {email}});
            if (u){
                if (u.password == password){
                    const t = require('jsonwebtoken').sign(
                        {id: u.id},
                        '123',
                        {expiresIn: '10h'}
                    )
                    res.status(200).json({token: t, expiresIn: tokenExpiresIn(t)})
                } else {
                    res.status(401).json({message: 'Invalid password'})
                }
            } else{
                res.status(401).json({message: 'User not found'})
            }
        }catch(err){
            res.status(401).json({name: err.name, message: err.message})
        }
    }
}

module.exports = User;