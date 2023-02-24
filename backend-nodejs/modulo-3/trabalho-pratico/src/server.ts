import app from './app';

app.listen(process.env.NODE_PORT, ()=> {
  console.log(`Server up and running on PORT ${process.env.NODE_PORT}`);
})