//GENERAL IMPORTS
import { Meteor } from 'meteor/meteor';
import React, { useState, useEffect } from 'react';
import clsx from 'clsx';

//MATEIRAL-UI COMPONENTS
import { makeStyles } from '@material-ui/core/styles';
import { Button } from '@material-ui/core';
import Check from '@material-ui/icons/Check';

//STYLES
const useStyles = makeStyles(() => ({
  button: {
    color: '#FFF',
    fontSize: '12',
    width: '100%',
  },
  checkInButton: {
    backgroundColor: '#4DCB4D',
  },
  checkOutButton: {
    backgroundColor: '#ff4c4c',
  },
  disabled: {
    opacity: '.5',
    backgroundColor: 'yellow',
    color: '#333'
  },
}));

//METHODS
const handleCheckIn = _id => Meteor.call('people.setCheckIn', _id);

export const ButtonComponent = ({ person }) => {
  const classes = useStyles();
  const [className, setClassName] = useState('');
  const handleButtonBackground = () => {
    setClassName(classes.disabled);

    if (person.checkedIn === true) {
      setTimeout(() => {
        setClassName(classes.checkInButton);
      }, 5000);
      return;
    }

    setTimeout(() => {
      setClassName(classes.checkOutButton);
    }, 5000);
  };

  useEffect(() => {
    if (person.checkedIn === true) {
      setClassName(classes.checkOutButton);
      return;
    }

    setClassName(classes.checkInButton);
  }, []);

  return (
    <Button
      variant="contained"
      className={clsx(className, classes.button)}
      startIcon={<Check />}
      onClick={() => {
        handleButtonBackground();
        handleCheckIn(person._id);
      }}
    >
      {person.checkedIn === true
        ? `Check-out ${person.firstName} ${person.lastName}`
        : `Check-in ${person.firstName} ${person.lastName}`}
    </Button>
  );
};
