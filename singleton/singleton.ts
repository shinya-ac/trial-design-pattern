import * as fs from 'node:fs';
export { AppConfig }

class AppConfig {
    // AppConfigクラスのインスタンス自身を値として持っている
    // 「static」はこのAppConfigをnewしなくても外部から参照できるようにするもの
    // このstaticキーワードによりinstanceはAppConfigの共有メンバになる
    // 以後どのインスタンスがこのinstanceを参照したとしてもグローバルに一意のこのinstanceであるAppConfigが参照される
    private static instance: AppConfig | null;

    public readonly databaseUrl: string;
    public readonly maxConnections: number;

    // constructorがprivateであることは必須
    // constructorがこのメソッドの中でしか呼び出せないことによってこのAppConfigはグローバルで一意なものになる
    private constructor(configPath: string) {
        // 設定ファイルから設定情報を読み込む
        //console.log(fs.readdirSync('.'))
        const rawData = fs.readFileSync(configPath);
        console.log(`コンフィグパス：${JSON.stringify(configPath)}`)
        const config = JSON.parse(rawData.toString());

        this.databaseUrl = config.databaseUrl;
        this.maxConnections = config.maxConnections;
    }

    public static getInstance(configPath: string): AppConfig {
        if (!AppConfig.instance) {
            AppConfig.instance = new AppConfig(configPath);
        }

        return AppConfig.instance;
    }

    public static clearInstance() {
        AppConfig.instance = null
    }
}

// 使用例
// config.json には {"databaseUrl": "http://example.com/db", "maxConnections": 10} のように記述されている

// configファイルから設定情報を読み取る
// AppConfigが既にインスタンス化されていればそのインスタンスを利用する
// インスタンス化されていなければ(つまりグローバルに初めての呼び出しであれば)constructorが呼び出されて設定ファイルから情報を設定する
const appConfig = AppConfig.getInstance('./singleton/config.json');
console.log(`Database URL: ${appConfig.databaseUrl}`);
console.log(`Max Connections: ${appConfig.maxConnections}`);

AppConfig.clearInstance

// 出力例
// Database URL: http://example.com/db
// Max Connections: 10