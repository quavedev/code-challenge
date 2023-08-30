import React from 'react';
import { Meteor } from 'meteor/meteor';
import { createRoot } from 'react-dom/client';
import { App } from '../ui/App';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; // Import the CSS
import './main.css';

Meteor.startup(() => {
  const root = createRoot(document.getElementById('app'));
  root.render(
    <React.Fragment>
      <App />
      <ToastContainer />
    </React.Fragment>
  );
});
