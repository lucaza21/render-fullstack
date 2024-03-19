const DataTypes = require("sequelize");

const sequelize = new DataTypes(
  process.env.DDBB_NAME,
  process.env.DDBB_USER,
  process.env.DDBB_PASSWORD,
{
host: process.env.DDBB_HOST,
dialect: 'mysql',
define: {
    timestamps: false,
    freezeTableName: true
  },
},

);

sequelize.authenticate().then(() => {
    console.log(`SQL Connection ${process.env.DDBB_NAME} has been established successfully.`);
    }).catch((error) => {
    console.error('Unable to connect to the database: ', error);
    });

/* sequelize.sync().then((data) => {
    console.log("Table Catcursos and model synced successfully")
  }).catch((error) =>{
    console.log("Error syncing the table and model", error);
  }) */


module.exports = [DataTypes, sequelize]
