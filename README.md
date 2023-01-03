# CMS-Restaurant-Landing-Page

A content management system (CMS) for a restaurant landing page, built using TypeScript, Next.js, and React.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Configuration](#configuration)
- [Contributing](#contributing)

## Installation

1. Clone this repository: git clone https://github.com/Gravgor/CMS-Restaurant-Landing-Page.git

2. Navigate to the project directory: cd CMS-Restaurant-Landing-Page

3. Install the dependencies: npm install

4. Create a `.env` file in the root directory, and set the following environment variables: DATABASE_URL=[url_of_your_database]

5. Start the development server: npm run dev

The CMS and the landing page should now be running on [http://localhost:3000](http://localhost:3000).

## Usage

To access the CMS, go to [http://localhost:3000/admin](http://localhost:3000/admin) and log in with the credentials that you have set in the `.env` file. From the CMS dashboard, you can add and update content for the landing page, such as the menu, specials, location, and so on.

To view the landing page, go to [http://localhost:3000](http://localhost:3000). The landing page should display the content that you have added or updated in the CMS.

## Configuration

You can customize the appearance and behavior of the landing page by modifying the following files:

- `app/*`: Contains the Typescript code for the landing page.
- `app/components`: Contains the React components that render the content of the landing page.

You can also configure the CMS by modifying the following files:

- `pages/api/db.ts`: Contains the configuration options for the CMS, such as the database connection settings and the authentication credentials.
- `pages/api/*.ts`: Contains the routes and controllers for the CMS.


To manually test the CMS and the landing page, you can create an account in the CMS and make some changes to the content. Then, check if the changes are reflected on the landing page.

## Contributing

If you want to contribute to this project, please follow these steps:

1. Fork this repository.
2. Create a new branch for your feature or bug fix.
3. Commit your changes.
4. Push the branch to your fork.
5. Open a pull request.


