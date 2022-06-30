### Voting App Near Protocol Frontend 

Live URL => https://voting-app-near-protocol-frontend.vercel.app/

DEMO PRESENTATION => https://www.loom.com/share/2080505659ad49b2aa63c05901563740

## Getting Started

First, run the development server:

```bash
npm install && npm run dev
# or
yarn && yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.


 ### Overview

 - This is a voting decentralised application whereby users can create elections, add contestants to a particular election and also vote for the contestant of their choice.



- This project is made up of two repositories as shown above. One houses the smart contract while the other houses the front end. 



- The smart contract is built with Assembly Script. It made use of <b>Persistent Map</b> and ,<b>Persistent Deque</b> to store information on-chain. Unit tests were also written to ensure all our functions work as expected.



- The front end was bult with NextJs and Typescript. Context API was used to manage the application-level state. Tailwind CSS was used for styling.



- Upon the arrival of the website, you are required to sign in, if you have an active login session, the sign-in button changes to the dashboard. Once you are in your dashboard, you can view all your elections if any have been created.



- When you create an election, you can click on the election card to view contestants and also add contestants to that election. Once you add contestants, you can begin voting.



- P.S:  The application and smart contract can be modified further and made better as it was more like an MVP due to time constraints.