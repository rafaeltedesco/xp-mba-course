const app = require('./app');

const PORT = process.env.APIPORT || 3005;
const MODE = process.env.NODE_ENV;

app.listen(PORT, ()=> {
    console.log(`${MODE} server up and running on PORT ${PORT}`);
})