const app = require('./app');

const PORT = process.env.APIPORT || 3000;
const MODE = process.env.NODE_ENV;

app.listen(PORT, () => {
  /* eslint-disable-next-line no-console */
  console.log(`${MODE} server up and running on PORT ${PORT}`);
});
