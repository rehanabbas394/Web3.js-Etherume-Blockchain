"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppService = void 0;
const common_1 = require("@nestjs/common");
const web3_1 = require("web3");
const abi_1 = require("./utils/abi");
const solc = require("solc");
const fs = require("fs");
let AppService = class AppService {
    constructor() {
        this.web3 = new web3_1.Web3("HTTP://127.0.0.1:7545");
    }
    getHello() {
        return 'Hello World!';
    }
    getweb3instance() {
        console.log(this.web3);
    }
    getbalance() {
        return this.web3.eth.getBalance("0x65cbBA74cb4d1c532c26713296F08527eBB99fD4").then((result) => {
            return this.web3.utils.fromWei(result, 'ether');
        });
    }
    async makeTransaction() {
        try {
            const receipt = await this.web3.eth.sendTransaction({
                from: "0xaE3A23e6593aF9Ac7ec99b99B0A85B6E1B8083ab",
                to: "0x7Cbf6Fe3B0f4991D6E337f99F23aDA01187949ba",
                value: this.web3.utils.toWei("5", "ether"),
            });
            const balance = JSON.parse(JSON.stringify(receipt, (key, value) => typeof value === "bigint" ? value.toString() : value));
            return balance;
        }
        catch (error) {
            console.error("Transaction failed:", error);
            throw new Error("Transaction failed");
        }
    }
    async smartContract(x) {
        try {
            const contract = new this.web3.eth.Contract(abi_1.abi, abi_1.Contract_address);
            console.log(this.web3.eth.Contract);
            const accounts = await this.web3.eth.getAccounts();
            const setResult = await contract.methods.set(x).send({
                from: accounts[0],
            });
            const updatedX = await contract.methods.x().call();
            return { updatedX: updatedX };
        }
        catch (error) {
            console.error("Error fetching contract data:", error);
            throw new Error("Contract method call failed");
        }
    }
    async DeployContract() {
        try {
            let fileContent = fs.readFileSync("src/contract/contract.sol").toString();
            var input = {
                language: 'Solidity',
                sources: {
                    "contract.sol": {
                        content: fileContent,
                    },
                },
                settings: {
                    evmVersion: "istanbul",
                    outputSelection: {
                        "*": {
                            "*": ["*"]
                        },
                    },
                },
            };
            var output = JSON.parse(solc.compile(JSON.stringify(input)));
            console.log(output);
            let abi = output.contracts["contract.sol"]["Demo"].abi;
            let bytecode = output.contracts["contract.sol"]["Demo"].evm.bytecode.object;
            console.log("abi: ", abi);
            console.log("bytecode: ", bytecode);
            const accounts = await this.web3.eth.getAccounts();
            const defaultAccount = accounts[0];
            console.log("Available accounts:", accounts);
            console.log("Using account:", defaultAccount);
            const contract = new this.web3.eth.Contract(abi);
            const demoContract = await contract
                .deploy({ data: bytecode })
                .send({ from: defaultAccount, gas: "5000000" })
                .on("receipt", (receipt) => {
                console.log("Contract deployed at:", receipt.contractAddress);
            });
            const initialData = await demoContract.methods.x().call();
            console.log("Initial Data from contract:", initialData);
        }
        catch (error) {
            console.error("Error deploying contract:", error.message);
            throw new Error("Contract deployment failed");
        }
    }
};
exports.AppService = AppService;
exports.AppService = AppService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [])
], AppService);
//# sourceMappingURL=app.service.js.map