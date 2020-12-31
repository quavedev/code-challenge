import React, { useState } from 'react';

import { Select, MenuItem } from '@material-ui/core';

export const SelectComponent = ({ events, selectedEvent, handleSelectedEvent }) => {

  return (
    <Select variant="outlined" value={selectedEvent} onChange={handleSelectedEvent} displayEmpty>
      <MenuItem key="default" value="" disabled>Select an event</MenuItem>
      {events.map(event => <MenuItem key={event._id} value={event._id}>{event.name}</MenuItem>)}
    </Select>
  )
}