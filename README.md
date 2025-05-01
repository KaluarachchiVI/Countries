https://countries-kappa-seven.vercel.app/
:
web link

# REST Countries Explorer

A React application for exploring country information using the REST Countries API.

## Features

- View all countries with key information
- Search countries by name
- Filter by region and status
- View detailed country information
- Dark/light theme toggle
- Responsive design

## Technologies Used

- React with functional components and hooks
- Material-UI for UI components
- React Router for navigation
- Axios for API requests
- Framer Motion for animations

## Setup Instructions

### Prerequisites

- Node.js (v14 or higher)
- npm (v6 or higher) or yarn

### Installation

1. Clone the repository:

## Available Scripts

In the project directory, you can run:

### `npm install`

To install the dependancies.

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.


## API Usage
This application uses the following endpoints from the REST Countries API:

GET /all - Fetch all countries

GET /name/{name} - Search by country name

GET /region/{region} - Filter by region

GET /alpha/{code} - Get country by code

GET /independent?status={boolean} - Filter by independence status

##  Challenges and Solutions
### Challenge 1: API Response Handling
Issue: The API returns arrays even for single country requests, which caused initial rendering issues.
Solution: Implemented consistent response handling that always expects an array and takes the first item when needed.

### Challenge 2: Border Countries Fetching
Issue: Fetching multiple border countries required careful error handling.
Solution: Created a separate API service function specifically for border countries with proper error fallbacks.

### Challenge 3: Data Consistency
Issue: Some country data fields were missing or formatted differently.
Solution: Added comprehensive null checks and default values for all data displays.

### Challenge 4: Theme Persistence
Issue: Theme preference wasn't persisting across page refreshes.
Solution: Implemented localStorage to save user theme preference.
