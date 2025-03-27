import { Outlet, useLocation } from 'react-router-dom';

import Navbar from './components/Navbar';

function App() {
  const location = useLocation();
  const isLandingPage = location.pathname === '/';

  return (
    <div className='container'>
      {!isLandingPage && <Navbar />}
      <main>
        <Outlet />
      </main>
    </div>
  )
}

export default App
