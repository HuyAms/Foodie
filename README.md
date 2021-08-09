# Foodie 🍝

A website where people can search for different food menu 😋

## Process and Goal 👌

My goal with this project is to create a playground where I apply various things that I learned from the course [Epic React](https://epicreact.dev/)

I worked with TypeScript and wrote tests. I learned how to use [MSW](https://mswjs.io/) to mock the requests in my integration tests. In this project, I also had a chance to learn different advanced React patterns such as Composite Component.

## Installation

After cloning the project, you need to run `yarn install`.

Create a `.env.development.local` and a `.env.test.local` file in the root folder.

<br>
`SKIP_PREFLIGHT_CHECK=true`
<br>
`REACT_APP_API_URL=https://api.spoonacular.com/food/menuItems`
<br>
`REACT_APP_API_KEY=YourApiIdFromSpoonacular`
<br>
`REACT_APP_AUTH_DOMAIN=YourAuthDomainFromFireBase`
<br>
`REACT_APP_PROJECT_ID=YourProjectIdFromFireBase`
<br>
`REACT_APP_STORAGE_BUCKET=YourStorageBucketFromFireBase`
<br>
`REACT_APP_FIREBASE_API_KEY=YourFireBaseApiKey`
<br>

You could follow this [tutorial](https://blog.logrocket.com/user-authentication-firebase-react-apps/) to set up Firebase and get the keys

## Tools

- Building: React, TypeScript & Styled-Components 🍀
- Static Tests: eslint, husky, lint-staged 🛡
- Integration Tests: Jest and React Testing Library ⚙️
- Developing components in isolation: StoryBook 📚
- Mocking Requests in Tests: Mock Service worker (MSW) 🛠

## Demo

https://foodie-f9f5e.web.app/
