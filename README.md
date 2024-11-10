# Quave Code Challenge

Want to join Quave as a developer? 

Great! Read this document and submit your solution.

We hire full stack developers only, so you must be comfortable with both front-end and back-end development.

Good luck!

> Not sure if we have open positions right now? Check our [Join repository](https://github.com/quavedev/join/issues/).

# Submission

## Getting Started

First, you'll need to create your own copy of the challenge repository. We use GitHub Classroom to manage submissions, which automatically creates a private repository for you to work in.

Click this [GitHub Classroom assignment link](https://classroom.github.com/a/tPo4AdKE) to create your repository. If this is your first time using GitHub Classroom, you'll need to authorize it to access your GitHub account. Once authorized, GitHub Classroom will create a new private repository containing the challenge starter code.

This repository is where you'll make all your changes and submit your final solution. Unlike regular GitHub forks, this gives you a private workspace that only you and the Quave team can access.

## Review

Ready for review? Fill out this [form](https://forms.gle/m2FTwSG8bcMfhS3JA).

You will provide a link to your solution repository in the form and also a cover letter. In the letter you should explain why you're a great fit and what you'll bring to Quave

## Feedback

We'll give you feedback based on the position description. Check the timeline section in the job posting for feedback deadlines.

# Code Stack and Environment

## Introduction

At Quave, we use Meteor.js for many clients, projects, and products.

Meteor.js is a full-stack JavaScript platform that lets you build modern web and mobile apps with a single JavaScript codebase.

Under the hood, Meteor.js runs on Node.js server-side, and we typically use React client-side (though Vue, Angular, Svelte, etc. also work with Meteor).

Meteor.js comes with many useful core packages and Quave packages for common features like:
- Authentication
- Jobs
- Migrations
- Collections
- Email
- And more

It's great for real-time apps, using WebSockets and DDP (Distributed Data Protocol) to sync data between client and server. All this works smoothly thanks to deep MongoDB integration.

While this challenge uses Meteor.js, you can use other technologies if you prefer, with some restrictions.

## Required Stack

We want to see your Javascript and React skills.

You can either:
1. Use our Meteor.js setup (recommended to save time)
2. Build the app with your preferred JavaScript runtime (Node.js, Bun, or Deno) and React

Both approaches must:
- Use the same database structure and seed data
  - In case you are not using Meteor embedded MongoDB you can assume we will have a proper instalation of MongoDB 7 running on 27017.
- Use Tailwind for styling
- Work with `npm i && npm start`
- Be compatible with Node.js 20

## Machine Setup

1. Install Node.js
   - Use [nvm](https://github.com/nvm-sh/nvm#installing-and-updating)
2. Install [Meteor](https://docs.meteor.com/install.html)

New to Meteor? Try this [tutorial](https://react-tutorial.meteor.com).

> This project uses Meteor 3 with Node.js 20.
>
> Reference: https://docs.meteor.com

## Install Dependencies

```bash
meteor npm install
```

## Run the App

```bash
meteor npm start
```

# Scope

## Requirements

Build a mini-app for event check-ins. The home page needs:

1. Event selector showing event names from the `communities` collection
   - Default text: "Select an event"

2. List of registered people from the `people` collection showing:
   - Full name (first + last name)
   - Company name
   - Title
   - Check-in date (MM/DD/YYYY, HH:mm or N/A)
   - Check-out date (MM/DD/YYYY, HH:mm or N/A)
   - "Check-in {person name}" button
   - "Check-out {person name}" button (shows 5 seconds after check-in)

3. Event summary showing:
   - Current attendee count
   - Company breakdown of current attendees
   - Number of people not checked in

The page must update in real-time without refreshing.

## Implementation Rules

1. Use:
   - JavaScript server-side (Node.js, Bun, or Deno)
   - React for views
   - MongoDB for data
   - TailwindCSS for styling

2. App must:
   - Start with `meteor npm i && meteor npm start`
   - Run on port `3000`
   - Use the provided `initial-data.js` seed data

# AI Tools

You can use AI tools to generate code, but you must:
1. Understand all generated code
2. Explain why it's the best solution
3. Answer any related questions in the interview

Not understanding your code = disqualification.

# Note

We won't answer questions about this challenge to ensure fair evaluation.
