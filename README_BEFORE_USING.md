# MyIdentity_Using_scilla
MyIdentity smart contract stores the name and wallet address of the users. It is written in scilla language for zilliqa blockchain.
To run the project, clone this repository using git clone command.
Also, you need to deploy the "MyIdentity_Contract.scilla" first on the testnet using Neo Savant Ide.
Then use "npm install" for node modules where the repository was cloned.
Then open the terminal and use npm start to run the Dapp.
In the frontend part which is inside the "src" folder in "App.js" ,you need to provide the contract address which you will get after deploying the contract to the app in the "Update Contract Address" section. The app takes the wallet address and name of the user and stores them as a key/value pair, key being the wallet address and name being the value. Also you can the get the name associated with the wallet address by providing the wallet address in the "Get Name" section.
