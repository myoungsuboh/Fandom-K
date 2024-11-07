import React from 'react';
import ReactDOM from 'react-dom/client';
import {HashRouter, Route, Routes} from 'react-router-dom';
import routes from './router';
import 'style/css/style.css';
import {Provider} from 'react-redux';
import store from './redux/store';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  // <React.StrictMode>
  <Provider store={store}>
    <HashRouter>
      <Routes>
        {routes.map(({path, element}) => (
          <Route key={path} path={path} element={element} />
        ))}
      </Routes>
    </HashRouter>
  </Provider>,
  // {/* </React.StrictMode> */}
);
