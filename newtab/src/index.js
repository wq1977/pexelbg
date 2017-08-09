import dva from 'dva';
import persistState from 'redux-localstorage';
import './index.css';

// 1. Initialize
const app = dva();

// 2. Plugins
app.use({
  extraEnhancers: [persistState()],
});

// 3. Model
app.model(require('./models/todo'));

// 4. Router
app.router(require('./router'));

// 5. Start
app.start('#root');
