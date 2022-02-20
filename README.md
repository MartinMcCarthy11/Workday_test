# Workday-test

## Setup
1- Clone the repo git clone https://github.com/MartinMcCarthy11/Workday_test

2- `yarn install` or `npm install` to install npm packages

3- Run app by using `yarn start` or `npm run start`, then open http://localhost:3000 to view it in the browser.

4- `yarn test` or  `npm run test` to run component level tests

5- `yarn run cypress` or `npm run cypress` to run e2e test

6- View the app live at https://workday-test.vercel.app/

Thanks for taking the time to look through this project :+1:


## Notes

### Data

- I noticed that the response from the api was inconsistent, as the id of the {type: employee} was off by 1 to the id of the {type: account}. If this was for production I would investigate why the data was inconsistent and correct it at source. As the imost efficient way of matching email addresses to the managers would be by id comparison.
- As a result I implemented 2 approaches to transforming the api response into usable data. I've commented out the approach where I am manipulating the id of the accounts object as this relies on the assumption that all of the data which we will recieve will also be similarly inconsistent.
- The approach I took negates the use of ids by sorting both the list of employees and emails and so works in this situation.

### Solution Notes and Architecture Choices

- I choose to use typescript for a number of reasons
  - Assuming this is a live application typescript gives me more confidence that certain types of errors won't make it to production due to the static typed nature of typescript
  - It gives tighter control(gaurd rails) as to how the components are used, allowing the solution to scale better.
  - It improves developer experience through intelli-sense, pre-defined object structure and a compiler errors
- I did not use redux as I have very little experience using it (excited to learn though :grin:). Instead I choose to use context api in order to handle the global state that the search bar needs.
- I extracted the api call out to a custom hook and used that it my context provider. This means my components only need to manage their local state.
- The app is largely accessible and navigable by keyboard, both by up/down arrows and by tab.
- I've noticed that the SearchResultItem components re-render each time you navigate with the keyboard. this is due to an onkeydown function being passed to the SearchresultItem for accessibility reasons(being able to hit enter when tab navigating). This something I would rectify before releasing to live.

### Tech used

- React
- Typescript
- Styled-Components
- Cypress
- React Testing Library / Jest

