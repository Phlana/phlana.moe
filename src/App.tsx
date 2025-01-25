import './App.css';
import { Route, Routes } from 'react-router-dom';
import DiscordLogin from './DiscordLogin';
import Home from './Home';
import QuoteList from './QuoteList';
import TestPage from './TestPage';

// const router = createHashRouter([
//   {
//     path: "/",
//     element: <Home />,
//   },
//   {
//     path: "/auth/discord",
//     element: <DiscordLogin />,
//   },
//   {
//     path: "/quotelist",
//     element: <QuoteList />,
//   },
// ]);

// const App = () => {
//   return <RouterProvider router={router} />
// };

const App = () => {
  return (
    <Routes>
      <Route path='/' element={ <Home /> } />
      <Route path='/auth/discord' element={ <DiscordLogin /> } />
      <Route path='/quotelist' element={ <QuoteList /> } />
      <Route path='/test' element={ <TestPage content='test' /> } />
      <Route path='*' element={ <TestPage content='catch' /> } />
    </Routes>
  );
};

export default App;
