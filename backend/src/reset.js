const app = require('./app.js');
const db = require('./db/db-create.js')
// require('dotenv').config();

app.listen(3000, async () => {
    try {
        await db.sequelize.authenticate();
        await db.sequelize.sync({ force: true });
        console.log('Connection has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
})