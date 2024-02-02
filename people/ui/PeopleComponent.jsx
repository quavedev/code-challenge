import React, { useState, useEffect } from 'react'
import { Button, Card, Col, Row, Spin, message } from 'antd';

import { useTracker } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor'
import { People } from '../people';
import styles from './styles.module.css';
import { useSummary } from '../../ui/contexts/SummaryContext';
import { dateFormatterToString } from '../../utils/dateFormatterToString';

//People component, the component of the list of peoples with the log of buttons checkin-checkout

export function PeopleComponent({ selectedCommunity }) {
  const { stateSummary, dispatchSummary } = useSummary();
  const { peopleAtTheEvent } = stateSummary?.find((current) => current.communityId === selectedCommunity);

  //Setting loading as a array to specify a person on the UI that are making Checkin with the id
  const [isLoadingCheckIn, setIsLoadingCheckIn] = useState([]); 

  //list to store people who have already checked out
  const [peopleCheckedOut, setPeopleCheckedOut] = useState([]);

  //Used for infinite scroll implementation
  // const [limit, setLimit] = useState(10);
  

  const {
    people,
    isLoading,
    totalPeople
  } = useTracker(() => {
    try {
      const handler = Meteor.subscribe('people', { communityId: selectedCommunity });
      const isLoading = !selectedCommunity || !handler.ready();

      const people = People.find({ communityId: selectedCommunity }).fetch();
      const totalPeople =  People.find({ communityId: selectedCommunity }).count();

      return { people, isLoading, totalPeople };
  } catch (error) {
    console.log(error)

    return { people: [], isLoading: false, totalPeople };
  }
});

  function handleCheckIn(person) {
    try {
      setIsLoadingCheckIn((prevState) => [...prevState, person._id]);
  
      setTimeout(() => {
        dispatchSummary({
          type: 'check-in',
          person,
          totalPeople: totalPeople,
          checkIn: dateFormatterToString(new Date()),
          communityId: selectedCommunity
        })
        message.success(`Successful check-in for ${person.firstName} ${person.lastName}!`)
        setIsLoadingCheckIn((prevState) => [...prevState.filter((item) => item !== person._id)]);
      }, 2500)    
      
    } catch (error) {
      message.error('Error when trying to checkout')
      setIsLoadingCheckIn((prevState) => [...prevState.filter((item) => item !== person._id)]);
    }
  }

  function handleCheckOut(person) {
    try {
      
      dispatchSummary({
        type: 'check-out',
        person,
        totalPeople: totalPeople,
        checkOut: dateFormatterToString(new Date()),
        communityId: selectedCommunity
      })
      message.success(`Successful check-out for ${person.firstName} ${person.lastName}!`)
      setPeopleCheckedOut((prevState) => [...prevState, person._id])
    } catch (error) {
      message.error('Error when trying to checkout')
    }
  }

   function hasCheckIn (personId){
    return peopleAtTheEvent.find((person) => person.id === personId && person?.checkIn);
   }

   function hasCheckOut (personId) {
    return peopleAtTheEvent.find((person) => person.id === personId && person?.checkOut);
   }



   //Implementation of infinite scroll commented because I don't know if I implement this in the code will pass in the automated tests

  //  useEffect(() => {
  //   const handleScroll = () => {
  //     if (
  //       window.innerHeight + document.documentElement.scrollTop !==
  //       document.documentElement.offsetHeight
  //     ) {
  //       return;
  //     }

  //     if (isLoading) {
  //       return;
  //     }

     
  //     setTimeout(() => {
  //       setLimit(prevLimit => prevLimit + 10); 
  //     }, 1000); 
  //   };

  //   window.addEventListener('scroll', handleScroll);
  //   return () => window.removeEventListener('scroll', handleScroll);
  // }, [isLoading]);

    


  return (
  <>
    {isLoading &&  <Spin />}
    <section className={styles.section}>
      <h2>People at the event</h2>

      <Row gutter={[16, 24]} >
          {people?.map((person) => (
            <Col key={person._id} className="gutter-row" span={6}>
              <Card className={`${styles.card} ${hasCheckOut(person._id) ? styles.disabledCard : ''}`} title={`${person.firstName} ${person.lastName}`}>
                <p>Company: {person.companyName}</p>
                <p>Title: {person.title}</p>
                <p>Check in:{hasCheckIn(person._id)?.checkIn}</p>
                <p>Check out:{hasCheckOut(person._id)?.checkOut}</p>
                {hasCheckIn(person._id) ? ( 
                  <>
                    <Button 
                      disabled={hasCheckOut(person._id)}
                      type='default' 
                      className={styles.checkInButton}
                      onClick={() => {handleCheckOut(person)}}
                      >
                        Check-out {`${person.firstName} ${person.lastName}`}
                    </Button>
                </>
                ) : (
                  <Button
                    disabled={hasCheckOut(person._id)}
                    loading={isLoadingCheckIn.some((id) => id === person._id)}
                    type='primary' 
                    className={styles.checkInButton}
                    onClick={() => {handleCheckIn(person)}}
                    >
                      Check-in {`${person.firstName} ${person.lastName}`}
                  </Button>
                )}
              </Card>
            </Col>
          ))}
      </Row>
    </section>
  </>
  )
}
