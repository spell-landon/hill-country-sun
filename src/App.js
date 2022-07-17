import Layout from './global/Layout.server';
import { Routes, Route } from 'react-router-dom';
import { Homepage } from './routes/Home/Homepage';

export const App = () => {
  return (
    <div className='font-jost'>
      <Layout>
        <Routes>
          <Route path='/' element={<Homepage />} />
          {/* <Route path='/about' element={<About />} />
          <Route path='welcome-to-wimberley' element={<WelcomeToWimberley />} /> */}
        </Routes>
      </Layout>
    </div>
  );
};
