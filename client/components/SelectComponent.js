//GENERAL IMPORTS
import React from 'react';

//MATERIAL-UI COMPONENTS
import { Select, MenuItem } from '@material-ui/core';

export const SelectComponent = ({
  events,
  selectedEvent,
  setSelectedEvent,
}) => {
  return (
    <Select
      variant="outlined"
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
