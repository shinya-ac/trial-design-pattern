// ----------------------------------------
// レガシーシステム
// ----------------------------------------
// 既存のレガシー支払いシステムのインターフェース
interface LegacyPaymentSystem {
    makePayment(amount: number): void;
}

// レガシー支払いシステムの実装
class OldPaymentSystem implements LegacyPaymentSystem {
    makePayment(amount: number): void {
        console.log(`レガシーシステムを通じて ¥${amount} の支払いを処理しています。`);
    }
}

// ----------------------------------------
// 新しいシステム
// ----------------------------------------
// 新しい支払いゲートウェイのインターフェース
interface NewPaymentGateway {
    processTransaction(details: { amount: number, currency: string, recipient: string }): void;
}

// 新しい支払いゲートウェイの実装
class ModernPaymentGateway implements NewPaymentGateway {
    processTransaction(details: { amount: number, currency: string, recipient: string }): void {
        console.log(`最新のゲートウェイを通じて ${details.amount} ${details.currency} を ${details.recipient} に支払っています。`);
    }
}

// ----------------------------------------
// アダプター
// ----------------------------------------
// 古いシステムのインターフェース：makePayment(amount: number): void
// 新しいシステムのインターフェース：processTransaction(details: { amount: number, currency: string, recipient: string }): void
// 上記二つのインターフェースがあるが、新しいインターフェースを古いインターフェースにアダプトさせたい。

// 新しい支払いゲートウェイをレガシーシステムに適応させるAdapter
class PaymentAdapter implements LegacyPaymentSystem {// 「既存のレガシー支払いシステムのインターフェース」を踏襲してPaymentAdapterクラスを作成する。
    private newGateway: NewPaymentGateway;

    // このAdapterを初期化する際には"新しい支払いシステム"（newGateway）を引数に取る。
    constructor(newGateway: NewPaymentGateway) {
        this.newGateway = newGateway;
    }

    // 以下の「makePayment(amount: number)」はインターフェースのシグネチャに合致している。
    makePayment(amount: number): void {
        // Adapterを使って新しいゲートウェイのインターフェースに適応
        // つまり、古いシステムのIFである「makePayment」で新しいシステムのIF（processTransaction）をラップすると言うこと。
        this.newGateway.processTransaction({
            amount: amount,
            currency: "JPY",
            recipient: "受取人"
        });
    }
}

// ----------------------------------------
// 呼び出し
// ----------------------------------------

// レガシーシステムの支払い処理
const oldSystem = new OldPaymentSystem();
oldSystem.makePayment(10000);

// 新しいゲートウェイの支払い処理をAdapter経由で実行
const newGateway = new ModernPaymentGateway();
const adapter = new PaymentAdapter(newGateway);// Adapterの初期化。その際に"新しい支払いシステム"（newGateway）で依存性を注入。
adapter.makePayment(20000);// AdapterでmakePaymentを呼び出すと内部ではラップされた新しいシステムのprocessTransaction()が呼び出されて正しく動く。

// oldSystemもnewGatewayもどちらも同様にAdapterを用いれば「makePayment(200)」と言う呼び出しでIFを統一できる。
