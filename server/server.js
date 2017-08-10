import Express from 'express';
import GraphHTTP from 'express-graphql';
import schema from './schema';

const APP_PORT = 4000;
const app = new Express();
var cookieSession = require('cookie-session');
app.use(cookieSession({
    name: 'chrometab',
    keys: ['good', 'bad']
}))
app.use('/chromeql', (req, res) => {
    return GraphHTTP({
        schema,
        graphiql: true, // or whatever you want
        pretty: true,
        context: { req, res },
    })(req, res)}
)
app.listen(APP_PORT, ()=>{
    console.log(`App listening on port ${APP_PORT}`);
})