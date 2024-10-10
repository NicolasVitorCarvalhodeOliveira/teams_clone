const db = require('../db')
const d = require('sequelize').DataTypes

const str = d.STRING;
const bool = d.BOOLEAN;
const int = d.INTEGER;

const User = db.define('User', {
    name: { type: str, allowNull: false },
    email: { type: str, allowNull: false, unique: true },
    password: { type: str, allowNull: false },
    isUltraUser: { type: bool, defaultValue: false }
}, { tableName: 'users', timestamps: true })

module.exports = User;