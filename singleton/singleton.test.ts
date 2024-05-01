import { AppConfig } from "./singleton";
import * as fs from 'node:fs';

// テスト用仮想ファイル
const testConfigPath = 'testConfig.json';
const testConfig = {
    databaseUrl: "http://testdb.example.com",
    maxConnections: 15
};
fs.writeFileSync(testConfigPath, JSON.stringify(testConfig));

const testConfigPath2 = 'testConfig2.json';
const testConfig2 = {
    databaseUrl: "http://testdb.example2.com",
    maxConnections: 16
};
fs.writeFileSync(testConfigPath2, JSON.stringify(testConfig2));

describe('singleton pattern test', () => {

    afterEach(() => {
        AppConfig.clearInstance();
    });

    afterAll(() => {
        fs.unlinkSync(testConfigPath);
        fs.unlinkSync(testConfigPath2);
    });
    
    test('should create only one instance', () => {
        const config1 = AppConfig.getInstance(testConfigPath);
        const config2 = AppConfig.getInstance(testConfigPath);
        expect(config1).toBe(config2);
    });

    it('should correctly load configuration from a file', () => {
        const config = AppConfig.getInstance(testConfigPath);
        expect(config.databaseUrl).toBe(testConfig.databaseUrl);
        expect(config.maxConnections).toBe(testConfig.maxConnections);
    });

    it('should return the same instance for any config path after the first one', () => {
        const firstCall = AppConfig.getInstance(testConfigPath);
        const secondCall = AppConfig.getInstance(testConfigPath2);
        expect(firstCall).toBe(secondCall);
    });
    
})