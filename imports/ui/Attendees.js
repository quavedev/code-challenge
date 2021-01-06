import React from 'react';
import Grid from '@material-ui/core/Grid';

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
