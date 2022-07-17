import logo from './logo.svg';
import Layout from './global/Layout.server';
import { Routes, Route, Link } from 'react-router-dom';

function App() {
  return (
    <div className='font-jost'>
      <Layout>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='about' element={<About />} />
          <Route path='welcome-to-wimberley' element={<WelcomeToWimberley />} />
        </Routes>
      </Layout>
    </div>
  );
}
function Home() {
  return (
    <>
      <main>
        <h2>Welcome to the homepage!</h2>
        <p>You can do this, I believe in you.</p>
      </main>
      <nav>
        <Link to='/about'>About</Link>
      </nav>
    </>
  );
}

function About() {
  return (
    <>
      <main>
        <h2>Who are we?</h2>
        <p>That feels like an existential question, don't you think?</p>
      </main>
      <nav>
        <Link to='/'>Home</Link>
      </nav>
    </>
  );
}

function WelcomeToWimberley() {
  return (
    <>
      <main>
        <h2>WELCOME TO WIMBERLEY</h2>
        <p>SOMETHING SOMETHING</p>
      </main>
      <nav>
        <Link to='/'>Home</Link>
      </nav>
    </>
  );
}

export default App;
