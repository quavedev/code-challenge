//GENERAL IMPORTS
import React from 'react';

//CUSTOM COMPONENTS
import { ButtonComponent } from './Button';

//MATERIAL-UI COMPONENTS
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import { Card, CardContent, CardActions } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';

//STYLES
const useStyles = makeStyles(theme => ({
  root: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
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
          {person.companyName ? (
            <Typography variant="body1" color="textSecondary">
              {`${person.title} at ${person.companyName}`}
            </Typography>
          ) : null}
        </CardContent>
        <CardActions disableSpacing>
          <ButtonComponent person={person} />
        </CardActions>
      </Card>
    </Grid>
  );
};
