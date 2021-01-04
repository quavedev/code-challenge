//GENERAL IMPORTS
import React, { useState, useEffect } from 'react';
import { handleCheckIn } from '../../imports/infra/handleCheckIn';
import clsx from 'clsx';

//MATEIRAL-UI COMPONENTS
import { makeStyles } from '@material-ui/core/styles';
import { Button } from '@material-ui/core';
import Check from '@material-ui/icons/Check';

//STYLES
const useStyles = makeStyles(theme => ({
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
  },
}));

export const ButtonComponent = ({ person }) => {
  const classes = useStyles();
  const [className, setClassName] = useState('');
  const handleButton = () => {
    setClassName(classes.disabled);

    if (person.checkedIn === true) {
      setTimeout(() => {
        setClassName(classes.checkInButton);
      }, 5000);
    } else {
      setTimeout(() => {
        setClassName(classes.checkOutButton);
      }, 5000);
    }
  };

  useEffect(() => {
    if (person.checkedIn === true) {
      setClassName(classes.checkOutButton);
    } else {
      setClassName(classes.checkInButton);
    }
  }, []);

  return (
    <Button
      variant="contained"
      className={clsx(className, classes.button)}
      startIcon={<Check />}
      onClick={() => {
        handleButton();
        handleCheckIn(person._id);
      }}
    >
      {person.checkedIn === true
        ? `Check-out ${person.firstName} ${person.lastName}`
        : `Check-in ${person.firstName} ${person.lastName}`}
    </Button>
  );
};
