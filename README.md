# Quave Code Challenge

Do you want to join Quave as a developer? Great. Read this document and then submit your solution. Good luck.

## Required Stack

Our main goal here is to see how well you use JavaScript and React. 

If you want to ignore the code setup in this repo and deliver the expected web app with the same database structure, seed data, and use JavaScript (Node.js, Bun, or Deno) and React in the client, with Tailwind for styling, feel free to do so. 

We recommend using our setup here so you don't waste time with setup, and we believe it's a good fit for many web apps. However, we don't want it to hinder great developers who aren't familiar with Meteor.

Make sure whatever you do will work with `npm i && npm start`. We don't want to spend time learning a custom setup to run your code challenge solution. You can use anything compatible with Node.js 20 in this setup, even if not using Meteor directly.

Ok, let's go. 

## Machine setup

- [Install Node.js](https://nodejs.org/en/download/)
  - Use [nvm](https://github.com/nvm-sh/nvm#installing-and-updating) to install Node.js
- [Install Meteor](https://docs.meteor.com/install.html)

If you're new to Meteor, we recommend this [tutorial](https://react-tutorial.meteor.com) to get familiar with it.

> This project uses Meteor 3 with Node.js 20.
>
> Use the Meteor 3 docs as a reference: https://docs.meteor.com

## Challenge setup

### Repository setup & process

-  Use this git repository as your starting point.
-  Once completed, remember to push your changes.
-  Submit this challenge via a GitHub Classroom assignment (read more below).

### How to install dependencies

```bash
meteor npm install
```

### How to run

```bash
meteor npm start
```

## What you need to deliver

A mini-application that allows event hosts to check people into an event.

The home page should show:

-  An event selector displaying each event's name. By default, it should display `Select an event` (`communities` collection).
-  A list of people registered in the selected event (`people` collection).

The list of people should allow the event host to:

-  See the full name (first and last name together), company name, title, check-in date, and check-out date in the `MM/DD/YYYY, HH:mm` format or as `N/A`.
-  Check people into the event by clicking the `Check-in {person firstName and lastName}` button.
-  If the user was checked in over five seconds ago, show a `Check-out {person firstName and lastName}` button.

Between the event selector and the list of people, display a summary like this:

-  `People in the event right now: 10`
-  `People by company in the event right now: Green Group (10), Hoppe Group (5)`
-  `People not checked in: 200`

The page needs to be reactive -- no refresh should be needed to display the latest data.

## Implementation rules

-  Use Meteor as the builder and runner, React as the view layer, and MongoDB as the data layer.
-  Use MongoDB embedded in Meteor; don't configure the project to access a different MongoDB URL.
-  Style the application using TailwindCSS.
-  Do not change `initial-data.js`.

## Important

-  We encourage the use of AI tools to generate code, but the developer needs to understand all the code generated and be able to: a) explain the code and b) explain why it's the best choice for the use case. If during the interview we realize you don't understand any part of the code you used in your solution, you will be eliminated from the process. The same applies to any question we ask during the video interview.
-  We will not answer any questions about this challenge to ensure all submissions are fairly compared.

## How to deliver your challenge

-  Complete this challenge via a [GitHub Classroom assignment](https://classroom.github.com/a/tPo4AdKE).
-  Is your solution ready for review? Respond to this [form](https://forms.gle/m2FTwSG8bcMfhS3JA).
-  Our team will review your submission and provide feedback via PR or email within 15 work days.
