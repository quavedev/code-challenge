import React from 'react'
import { Button, Card, Col, message, Row, Spin } from 'antd';

import { useTracker } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor'
import { People } from '../people';
import styles from './styles.module.css';


export function PeopleComponent({ selectedCommunity }) {

  const {
    people,
    isLoading,
  } = useTracker(() => {
    try {
      const handler = Meteor.subscribe('people', { communityId: selectedCommunity });
      const isLoading = !selectedCommunity || !handler.ready();

      const people = People.find({ communityId: selectedCommunity }).fetch();
      return { people, isLoading, error: null };
  } catch (error) {
    console.log(error)

    return { people: [], isLoading: false, error };
  }
});

  return (
  <>
    {isLoading &&  <Spin />}
    <section className={styles.section}>
      <h2>People at the event</h2>

      <Row gutter={[16, 24]} >
          {people?.map(({_id, firstName, lastName, companyName, title}) => (
            <Col key={_id} className="gutter-row" span={6}>
              <Card className={styles.card} title={`${firstName} ${lastName}`}>
                <p>Company: {companyName}</p>
                <p>Title: {title}</p>
                <Button type='primary' className={styles.checkInButton}>Check In</Button>
              </Card>
            </Col>
          ))}
      </Row>
    </section>
  </>
  )
}
