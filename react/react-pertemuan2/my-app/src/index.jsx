import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
// import App from './App';
import Content from './Content'; 
import Navbar from './Navbar'; 
import reportWebVitals from './reportWebVitals';
import 'semantic-ui-css/semantic.min.css';

const rootElement = document.getElementById('root');
const root = ReactDOM.createRoot(rootElement);

// function App() {
//   // const message="kontol";
//   // const data={
//     // color:"red",
//     // const date = new Date();
//     // const time = date.toLocaleTimeString();
//     // return <h1>{time}</h1>;
//     return <h1> {new Date().toLocaleTimeString()}</h1>
//   };
 
// }

root.render(
  <React.StrictMode>
    {/* <App /> */}
    <Navbar /> {/* Render the Navbar component */}
    <Content /> {/* Render the Content component */}
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
