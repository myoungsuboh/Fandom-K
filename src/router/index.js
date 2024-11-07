import ListPage from 'pages/ListPage';
import LandingPage from 'pages/Landing';
import MyPage from 'pages/MyPage';
const routes = [
  {
    path: '/',
    element: <LandingPage />,
  },
  {
    path: '/list',
    element: <ListPage />,
  },
  {
    path: '/my-page',
    element: <MyPage />,
  },
];

export default routes;
