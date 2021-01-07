//GENERAL IMPORTS
import React from 'react';

//MATERIAL UI COMPONENTS
import Grid from '@material-ui/core/Grid';

//CUSTOM COMPONENTS
import { Person } from './Person';


export const Attendees = ({ people }) => {
  return (
    <Grid container spacing={3}>
      {people.map(person => (
        <Person key={person._id} person={person} />
      ))}
    </Grid>
  );
};
