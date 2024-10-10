function authToken(req, res, next) {
    const t = req.headers.authorization.split(' ')[1];
    console.log(t)
    if (!t){
        return res.status(401).json({message: "no token, can't pass"})
    }

    const d = require('jsonwebtoken').verify(t, '123')
    console.log(d)

    require('jsonwebtoken').verify(t, '123', (err, user) => {
        if (err) {
            return res.sendStatus(403);
        }
        req.user = user;
        next();
    });
}

module.exports = authToken;