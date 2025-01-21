# Banking CLI Application

A simple command-line application to manage bank accounts, allowing users to create accounts, check balances, deposit, and withdraw funds.

## Features

- Create a new bank account.
- Check account balance.
- Deposit funds into an account.
- Withdraw funds (feature to be implemented).
- User-friendly CLI interface using `inquirer`.
- Data persistence through JSON files.

## Prerequisites

Ensure you have the following installed on your system:

- [Node.js](https://nodejs.org/) (version 14 or higher)
- npm (comes with Node.js)

## Installation


1. Clone the repository:
   <code> git clone https://github.com/your-username/banking-cli.git </code>

2. Install dependencies:
   <code>npm install </code>


## Usage

Run the application with the following command: <code> npm run dev </code>

   


### Available Actions

1. **Create Account**: Create a new account with a unique name.
2. **Check Balance**: View the current balance of an existing account.
3. **Deposit**: Add funds to an existing account.
4. **Withdraw**: (Feature in progress) Withdraw funds from an existing account.
5. **Exit**: Exit the application.

## File Structure

- **`accounts/`**: Directory where account data is stored as JSON files.
- **`app.mjs`**: Main application script.

## Dependencies

- [inquirer](https://www.npmjs.com/package/inquirer): For creating interactive CLI prompts.
- [chalk](https://www.npmjs.com/package/chalk): For styling console output.
- [fs](https://nodejs.org/api/fs.html): For file system operations (built-in Node.js module).

## Scripts

- <code>npm install</code>: Installs all necessary dependencies.
- <code>npm run dev</code>: Starts the application.

## Future Improvements

- Implement the withdrawal functionality.
- Add validation for inputs (e.g., positive numbers for deposits).
- Enhance error handling.
- Add unit tests for core functionality.
- Provide a summary of all accounts.

## License

This project is licensed under the [ISC License](LICENSE).

---

Happy coding! 🚀
