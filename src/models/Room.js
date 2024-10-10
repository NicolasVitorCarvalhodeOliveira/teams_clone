const db = require('../db')
const d = require('sequelize').DataTypes

const str = d.STRING;
const bool = d.BOOLEAN;
const int = d.INTEGER;

const U = require('./User')

const Room = db.define('Room', {
    name: { type: str, allowNull: false },
    description: { type: str, allowNull: true }, 
    capacity: { type: int, allowNull: false }, 
    isActive: { type: bool, defaultValue: true },
    createdBy: { type: int, references: { model: U, key: 'id'}, allowNull: false }
}, { tableName: 'rooms', timestamps: true });

module.exports = Room;