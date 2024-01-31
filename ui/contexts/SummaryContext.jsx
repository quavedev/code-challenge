import React, { useReducer, useContext, createContext } from 'react'

const SummaryContext = createContext({});

const initialState = {
  peopleAtTheEvent: [], //list of people that make checkin ({id, checkIn}) and quantitty (.length)
  peopleByCompany: {},
  peopleNotCheckedIn: null // initial value will be the total of regitered people when load event
}


export function SummaryProvider({ children }) {

  const [state, dispatch] = useReducer(reducer, initialState);

 
  function reducer(values, action) {
    switch(action.type) {
      case 'checkin': 
      let updatedPeopleByCompany = { ...state.peopleByCompany };
      const companyId = action.values.person.communityId;

      if (updatedPeopleByCompany[companyId]) {
        updatedPeopleByCompany[companyId] += 1;
      } else {
        updatedPeopleByCompany[companyId] = 1;
      }

      
        return { 
          peopleAtTheEvent: 
          [...peopleAtTheEvent, { id: values.person.id, checkIn: values.person.checkIn }],
          peopleByCompany: updatedPeopleByCompany,
          peopleNotCheckedIn: state.peopleNotCheckedIn !== null ? state.peopleNotCheckedIn - 1 : values.totalPeople,
         }
      case 'checkout': 
      console.log('checkout')
        return {}
    }
  }

  return (
    <SummaryContext.Provider value={{ stateSummary: state, dispatchSummary: dispatch}}>
      {children}
    </SummaryContext.Provider>
  )
}

export function useSummary() {
  const context = useContext(SummaryContext);

  if(!context) {
    throw new Error('Error on Summary Provider')
  }
  return context;
}
