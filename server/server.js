import Express from 'express';
import GraphHTTP from 'express-graphql';
import schema from './schema';

const APP_PORT = 4000;
const app = new Express();
app.use('/chromeql', new GraphHTTP({
    schema,
    graphiql: true, // or whatever you want
    pretty: true,
}))
app.listen(APP_PORT, ()=>{
    console.log(`App listening on port ${APP_PORT}`);
})