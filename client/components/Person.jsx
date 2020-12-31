import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import { Card, CardContent, CardActions, Button } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import Check from '@material-ui/icons/Check';

const useStyles = makeStyles(theme => ({
  root: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between'
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  button: {
    backgroundColor: '#4DCB4D',
    color: '#FFF',
    fontSize: 12,
    width: '100%'
  },
}));

export const Person = ({ person }) => {
  const classes = useStyles();

  return (
    <Grid item xs={12} sm={6} md={4} lg={3}>
      <Card className={classes.root}>
        <CardContent>
          <Typography paragraph>
            {`${person.firstName} ${person.lastName}`}
          </Typography>
          {person.companyName ?
            <Typography variant="body1" color="textSecondary">{`${person.title} at ${person.companyName}`}</Typography>
          :
            null
          }
        </CardContent>
        <CardActions disableSpacing>
          <Button
            variant="contained"
            className={classes.button}
            startIcon={<Check />}
          >
            {`Check-in ${person.firstName}`}
          </Button>
        </CardActions>
      </Card>
    </Grid>
  );
};
