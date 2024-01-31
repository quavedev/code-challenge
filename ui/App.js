import React from 'react';
import { LayoutContent } from './components/LayoutContent';
import { AppProvider } from './contexts';

//Organanize the App, and separate specific component with the Skeleton Layout

export const App = () => {
  return (
    <AppProvider>
      <LayoutContent />
    </AppProvider>
  );
};
