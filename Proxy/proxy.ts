// ユーザーの権限を定義する列挙型
enum UserRole {
    USER, // データの読み取り（getData）は可能
    ADMIN // データの読み取りも書き込みも可能
}

// ユーザークラス
class User {
    constructor(public name: string, public role: UserRole) {}
}

// データサービスのインターフェース
interface IDataService {
    getData(): string;
    setData(data: string): void;
}

// 実際のデータサービス
class DataService implements IDataService {
    private data: string = "初期データ";

    getData(): string {
        console.log("DataService: データを取得します。");
        return this.data;
    }

    setData(data: string): void {
        console.log("DataService: データを設定します。");
        this.data = data;
    }
}

// データサービスのプロキシ
class DataServiceProxy implements IDataService {
    private realService: DataService;
    private user: User

    constructor(user: User) {
        this.realService = new DataService();
        this.user = user
    }

    getData(): string {
        if (this.hasAccess('get')) {
            return this.realService.getData();
        } else {
            throw new Error("アクセスが拒否されました: データの取得権限がありません。");
        }
    }

    setData(data: string): void {
        if (this.hasAccess('set')) {
            this.realService.setData(data);
        } else {
            throw new Error("アクセスが拒否されました: データの設定権限がありません。");
        }
    }

    // 権限チェックメソッド
    private hasAccess(action: 'get' | 'set'): boolean {
        if (action === 'get') {
            // 全ユーザーがデータを取得できる
            return true;
        } else if (action === 'set') {
            // データの設定はADMINのみ可能
            return this.user.role === UserRole.ADMIN;
        }
        return false;
    }
}

// 使用例

// 一般ユーザー
const regularUser = new User("一般ユーザー", UserRole.USER);
// 一般ユーザーを指定してDataServiceを初期化（正確にはDataServiceのプロキシーを初期化だけど、プロキシーを初期化すると実際のDataServiceも初期化される仕様）
const userDataService: IDataService = new DataServiceProxy(regularUser);

try {
    console.log(`${regularUser.name} がデータを取得: ${userDataService.getData()}`);
    userDataService.setData("一般ユーザーによる新しいデータ");
} catch (error) {
    // 一般ユーザーでのsetDataなのでhasRoleがfalseになって以下のエラーが出る
    console.error(error.message);
}

// 管理者ユーザー
const adminUser = new User("管理者", UserRole.ADMIN);
const adminDataService: IDataService = new DataServiceProxy(adminUser);

try {
    // 管理者ユーザーなのでsetDataもgetDataもエラーなく行える
    console.log(`${adminUser.name} がデータを取得: ${adminDataService.getData()}`);
    adminDataService.setData("管理者による新しいデータ");
    console.log(`${adminUser.name} がデータを再取得: ${adminDataService.getData()}`);
} catch (error) {
    // エラーはキャッチされないので以下のエラーは出力されないはず
    console.error(error.message);
}
