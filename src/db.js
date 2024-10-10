const s = require('sequelize').Sequelize

const db = new s('teams', 'root', '', {
    host: 'localhost',
    dialect: 'mysql',
    logging: false,
});

module.exports = db;