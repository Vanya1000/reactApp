import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';

let posts = [
  { id: 1, message: 'Hi, how a you?', likesCount: 15 },
  { id: 1, message: 'Its my first post!', likesCount: 25 }
];

let dialogs = [
  { id: 1, name: 'Ivan' },
  { id: 2, name: 'Alex' },
  { id: 3, name: 'Kesha' },
  { id: 4, name: 'Inokentiy' }
];

let messages = [
  { id: 1, message: 'What you name?' },
  { id: 2, message: 'Tony' },
  { id: 3, message: 'Fack you Tony!' },
  { id: 4, message: 'What you name?' }
];

ReactDOM.render(
  <React.StrictMode>
    <App dialogs={dialogs} messages={messages} posts={posts}/>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
