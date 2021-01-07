//GENERAL IMPORTS
import React, { useState, useEffect } from 'react';
import clsx from 'clsx'; // MODULE TO HELP GROUP STRINGS

//MATERIAL UI COMPONENTS
import { makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Collapse from '@material-ui/core/Collapse';

const useStyles = makeStyles(theme => ({
  expand: {
    padding: '0',
    transform: 'rotate(0deg)',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  companiesCollapse: {
    gridArea: '2/1/3/4',
  },
}));

export const SummaryBar = ({ people }) => {
  const classes = useStyles();

  const [expanded, setExpanded] = useState(false);

  const handleExpandClick = () => setExpanded(!expanded);

  const checkedInPeople = people.filter(person => person.checkedIn === true); // GETS ALL THE PEOPLE ALREADY CHECKED IN THE EVENT

  const companyNames = checkedInPeople.map(person => person.companyName);     // GETS ALL THE COMPANIES OF THE PEOPLE CHECKED IN THE EVENT 

  const uniqueCompanies = [...new Set(companyNames)];                         // REMOVES THE REPEATED COMPANIES

  const [summary, setSummary] = useState([]);

  const showSummary = (item) => {
    let company = Object.keys(item);

    if(company[0] === 'undefined'){
      company = 'No Company';
    }
    return (
      <li key={company}>
        <p className="company__name">{company}</p>
        <span>({Object.values(item)})</span>
      </li>
    )
  }
  
  useEffect(() => {
    const peopleByCompany = [];                                               // ARRAY OF OBJECTS WITH THE NAMES OF THE COMPANIES AND THE NUMBER OF TIMES THIS COMPANY APPEARS IN THE LIST OF ALL COMPANIES ABOVE EX: [{ QUAVE: 3 }]

    uniqueCompanies.forEach(company => {
      const occurrence = companyNames.filter(name => name === company).length;
      peopleByCompany.push({ [company]: occurrence });
    });

    setSummary(peopleByCompany);
  }, [people]);

  return (
    <section className="summary">
      <p className="summary__title">
        People in the event right now: 
        <span>{checkedInPeople.length}</span>
      </p>
      <p className="summary__title">
        People not checked-in:
        <span>{people.length - checkedInPeople.length}</span>
      </p>
      <div>
        <p className="summary__title">
          People by company in the event right now
        </p>
        <IconButton
          className={clsx(classes.expand, {
            [classes.expandOpen]: expanded,
          })}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </IconButton>
      </div>
      <Collapse
        className={classes.companiesCollapse}
        in={expanded}
        timeout="auto"
        unmountOnExit
      >
        <ul className="companies">
          {summary.map(item => showSummary(item))}
        </ul>
      </Collapse>
    </section>
  );
};
