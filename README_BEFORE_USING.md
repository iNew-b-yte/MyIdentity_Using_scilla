# MyIdentity_Using_scilla
1.MyIdentity smart contract stores the name and wallet address of the users. It is written in scilla language for zilliqa blockchain.  
2.To run the project, clone this repository using git clone command.  
3.Also, you need to deploy the "MyIdentity_Contract.scilla" first on the testnet using Neo Savant Ide.  
4.Then use "npm install" for node modules where the repository was cloned.  
5.Then open the terminal and use npm start to run the Dapp.  
6.In the frontend part which is inside the "src" folder in "App.js" ,you need to provide the contract address which you will get after deploying the contract to the app in the "Update Contract Address" section.  
7.The app takes the wallet address and name of the user and stores them as a key/value pair, key being the wallet address and name being the value.  
8.Also you can the get the name associated with the wallet address by providing the wallet address in the "Get Name" section.  
