import React, { useReducer, useContext, createContext, memo } from 'react'

const SummaryContext = createContext({});

const initialStateSummary =[]
//type of summary
// [{communityId: string,
// peopleAtTheEvent: Array,
// peopleByCompany: Object,
// peopleNotCheckedIn: number}]


//Creating this Context to share the information about the community, people, check-in and checkout with all the components, make the business rules in one place

export const SummaryProvider = memo(({ children }) => {

  const [state, dispatch] = useReducer(reducer, initialStateSummary);
  
  function reducer(values, action) {

    //Selecting the current Community to make changes
    const communityIndex = values.findIndex(item => item.communityId === action.communityId);

    switch(action.type) {
      //Add community if it not exist on the array of Summary 
      case 'add-community': 

      if (communityIndex === -1) {
          return [
            ...values,
            {
              communityId: action.communityId,
              peopleAtTheEvent: [],
              peopleByCompany: {},
              peopleNotCheckedIn: null,
            },
          ];
        }
        return values;
      
      //Check in adding people at the summary
      case 'check-in': 
      //selecting company
        const updatedPeopleByCompany = { ...values[communityIndex].peopleByCompany };

        //selecting company name or add No company
        const companyName = action.person.companyName || 'No company';

        //IF company name exist in th object, add one person or adding 1 for starting a new company
        if (updatedPeopleByCompany[companyName]) {
          updatedPeopleByCompany[companyName] += 1;
        } else {
          updatedPeopleByCompany[companyName] = 1;
        }

        //returning the state of summary for Selected Community
        return values.map((item, index) =>
          index === communityIndex
            ? {
                ...item,
                peopleAtTheEvent: [...item.peopleAtTheEvent, { id: action.person._id, checkIn: action.checkIn, checkOut: null }],
                peopleByCompany: updatedPeopleByCompany,
                peopleNotCheckedIn: item.peopleNotCheckedIn !== null ? item.peopleNotCheckedIn - 1 : action.totalPeople - 1,
              }
            : item
        );

      case 'check-out': 
      
      const updatedPeopleByCompanyCheckOut = { ...values[communityIndex].peopleByCompany };
      const companyNameCheckOut = action.person.companyName || 'No company';
      
      //Removing people of PeopleByCompany, and removing Company from object if don't have any person
      updatedPeopleByCompanyCheckOut[companyNameCheckOut] -= 1;
      if(updatedPeopleByCompanyCheckOut[companyNameCheckOut] === 0) {
        delete updatedPeopleByCompanyCheckOut[companyNameCheckOut]
      }
      
      //Adding checkout to specific person
      const indexToAddCheckOut = values[communityIndex].peopleAtTheEvent.findIndex(item => item.id === action.person._id);

        if (indexToAddCheckOut !== -1) {
          values[communityIndex].peopleAtTheEvent[indexToAddCheckOut].checkOut = action.checkOut;
        }

      //updating value for specific Community
      return values.map((item, index) =>
        index === communityIndex
          ? {
              ...item,
              peopleAtTheEvent: [...values[communityIndex].peopleAtTheEvent],
              peopleByCompany: updatedPeopleByCompanyCheckOut,
            }
          : item
      );
        default:
          return values;
    }
  }

  return (
    <SummaryContext.Provider value={{ stateSummary: state, dispatchSummary: dispatch}}>
      {children}
    </SummaryContext.Provider>
  )
})

export function useSummary() {
  const context = useContext(SummaryContext);

  if(!context) {
    throw new Error('Error on Summary Provider')
  }
  return context;
}
