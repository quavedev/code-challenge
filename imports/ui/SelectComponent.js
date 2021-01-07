//GENERAL IMPORTS
import React from 'react';

//MATERIAL-UI COMPONENTS
import { makeStyles } from '@material-ui/core/styles';
import { Select, MenuItem } from '@material-ui/core';

const useStyles = makeStyles(() => ({
  select: {
    backgroundColor: '#FFF',
    marginTop: '1rem',
  },
}));

export const SelectComponent = ({
  events,
  selectedEvent,
  setSelectedEvent,
}) => {
  const classes = useStyles();

  return (
    <Select
      variant="outlined"
      className={classes.select}
      value={selectedEvent}
      onChange={e => setSelectedEvent(e.target.value)}
      displayEmpty
    >
      <MenuItem key="default" value="" disabled>
        Select an event
      </MenuItem>
      {events.map(event => (
        <MenuItem key={event._id} value={event._id}>
          {event.name}
        </MenuItem>
      ))}
    </Select>
  );
};
