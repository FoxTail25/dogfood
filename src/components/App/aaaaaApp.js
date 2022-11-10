// import logo from './logo.svg';
import Header from '../Header/header';
import './style.css';
// import { AppHeader } from './AppHeader/AppHeader.jsx';

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

function App() {

  return (
    <>
      <Header />
      <main className='content container'>
        Это маин
        {/* Sort */}
        <div className='content__cards'>
          {/* Cards */}
        </div>
      </main>
      {/* footer */}
    </>
  )
}

export default App;
