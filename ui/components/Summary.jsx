import { Card } from 'antd'
import React from 'react'
import { useSummary } from '../contexts/SummaryContext'

export function Summary({ selectedCommunity }) {
  const { stateSummary } = useSummary();

  let { peopleAtTheEvent, 
    peopleByCompany, 
    peopleNotCheckedIn 
  } = stateSummary?.find((current) => current.communityId === selectedCommunity)

  //People in the event without Checkout
  let peopleWithoutCheckout = peopleAtTheEvent.filter((person) => person.checkOut === null)


  //formatting the Object(key/value) in String to show in the summary
  let resultString = "";

  for (const company in peopleByCompany) {
    if (peopleByCompany.hasOwnProperty(company)) {
      resultString += `${company} (${peopleByCompany[company]}) `;
    }
  }


  return (
    <Card title="Summary Events" style={{ width: '580px', alignSelf: 'center' }}>
      <p>People in the event right now: <strong>{peopleWithoutCheckout.length}</strong></p>
      <p>People by company in the event right now: <strong>{resultString || 0}</strong></p>
      <p>People not checked-in: <strong>{peopleNotCheckedIn}</strong></p>
    </Card>
  )
}
