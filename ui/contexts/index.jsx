import React from 'react'

import { SummaryProvider } from './SummaryContext'


// Provider component to add all the contexts that we use in the app into a single file
export function AppProvider({ children }) {
  return <SummaryProvider>{children}</SummaryProvider>
}