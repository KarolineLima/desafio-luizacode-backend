module.exports = {
    dialect: process.env.DB_DIALECT,
    host: process.env.DB_HOST,
    username: process.env.DB_USERNAME,
    port: process.env.DB_PORT,
    password: process.env.DB_PASSWORD,
    database:process.env.DB_NAME,
    define: {
        timeStamps:true,
        underscored: true,
        underscoredAll: true,
    }
 }