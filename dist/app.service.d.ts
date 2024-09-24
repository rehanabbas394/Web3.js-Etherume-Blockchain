export declare class AppService {
    private web3;
    constructor();
    getHello(): string;
    getweb3instance(): void;
    getbalance(): Promise<string>;
    makeTransaction(): Promise<any>;
    smartContract(x: number): Promise<any>;
    DeployContract(): Promise<void>;
}
