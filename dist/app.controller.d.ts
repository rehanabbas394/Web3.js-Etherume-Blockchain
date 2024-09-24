import { AppService } from './app.service';
export declare class AppController {
    private readonly appService;
    constructor(appService: AppService);
    getHello(): string;
    getweb3(): void;
    getbalance(): Promise<string>;
    makeTranscation(): Promise<any>;
    Contract(x: number): Promise<{
        message: string;
        updatedX: any;
    }>;
    compileSM(x: number): Promise<void>;
}
