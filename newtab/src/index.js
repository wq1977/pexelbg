import dva from 'dva';
import persistState from 'redux-localstorage';
import './index.css';

// 1. Initialize
const app = dva();

// 2. Plugins
app.use({
  extraEnhancers: [persistState('todo')],
});

// 3. Model
app.model(require('./models/todo'));
app.model(require('./models/photo'));

// 4. Router
app.router(require('./router'));

// 5. Start
app.start('#root');
