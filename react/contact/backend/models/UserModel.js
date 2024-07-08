import { Sequelize } from "sequelize";
import db from "../config/Database.js";
const {DataTypes} = Sequelize;

const User = db.define('users', {
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
       
    },
    gender: {
        type: DataTypes.STRING // Assuming gender is a string type
    }
}, {
    freezeTableName: true
});


export default User;
(async () => {
    await db.sync();    
})();