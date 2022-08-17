# React dApp Dev Challenge

The idea of this challenge is to evaluate your skills as a **React dApp Developer**. You should be able to create a dApp with React that interacts with [Compound's cDAI contract](https://kovan.etherscan.io/address/0xF0d0EB522cfa50B716B3b1604C4F0fA6f04376AD) in [Kovan](https://kovan.etherscan.io/).

If you want to apply to this position, please send the following to jobs at exact dot ly:
1. The URL with the dApp up and running
2. Your solution in a ***private repository***

The team will review your solution only if the online dApp you send does [all requirements requested here](#the-dapp-should-be-able-to).

## The dApp should be able to:

1. Connect and disconnect a wallet like [MetaMask](https://metamask.io/)
2. Get the cDAI balance in the wallet and show it in the UI
3. Deposit DAI to the contract directly from the UI
4. Get the transaction history of the connected wallet

## Think about

- You can use this [faucet](https://faucet.paradigm.xyz/) to get tokens to test your dApp
- cDAI and DAI are not 1:1, you should display the amount in cDAI
- You can deposit, borrow, repay and redeem directly from [Compound](https://app.compound.finance/) if you are connected to the Kovan testnet
- If you want to use a subgraph, you can use [this one](https://thegraph.com/hosted-service/subgraph/juanigallo/cdai-kovan-subgraph) or create your own
- How much logic do you offload out of the UI components?
- Think about the UX, minimize the number of interactions to use the application
- Take care of your environment variables

## Criteria

The things that we will pay attention to are:

- Commit history
- Responsiveness
- Accessibility
- Knowledge of web3
- Good design practices

## Desirable

- Type all elements used in the app
- Add unit tests, with [Jest](https://jestjs.io/) for functions and [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/) for components
- Add integration tests with [Cypress](https://www.cypress.io/) or similar testing frameworks
