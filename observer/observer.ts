export {NewsService, ConcreteSubscriber}

// ニュース通知システムをObserverパターンを用いて実装するコード。
// ニュースサービス（Subject）が新しいニュースを配信し、複数のサブスクライバー（Observers）がそれを受け取る。

// Observerインターフェース
//  Observer（観察者）の抽象
interface Subscriber {
    update(news: string): void;
}

// Subject（被観察者）クラス
// このクラスは Observer（観察者、ここでは Subscriber）を管理し、
// このクラスの状態が変化した（新しいニュースが追加された）時にそれらに通知する
class NewsService {
    private subscribers: Subscriber[] = [];

    public subscribe(subscriber: Subscriber): void {
        this.subscribers.push(subscriber);
    }

    public unsubscribe(subscriber: Subscriber): void {
        const index = this.subscribers.indexOf(subscriber);
        if (index !== -1) {
            this.subscribers.splice(index, 1);
        }
    }

    // 観察者(Subscriber)に状態の変化を通知
    public notifySubscribers(news: string): void {
        // 登録されている購読者は数人いる可能性があるので、ループでそのそれぞれに状態の変化を伝えている
        for (const subscriber of this.subscribers) {
            subscriber.update(news);
        }
    }

    public addNews(news: string): void {
        console.log(`NewsService: 新しいニュースが追加されました - ${news}`);

        // NewsServiceクラスの状態が変化したので観察者(Subscriber)に状態の変化を伝える
        this.notifySubscribers(news);
    }
}

// Subscriber具象クラス
// サブジェクト(NewsService)の状態の変化に反応するオブジェクト。
// サブジェクトからの(サブジェクトの状態の変化)の通知を受け取り、それに応じた処理を行う。
class ConcreteSubscriber implements Subscriber {
    name: string;

    constructor(name: string) {
        this.name = name;
    }

    // NewsServiceの状態が変化した時(新しいニュースが入った時)、このupdateが呼び出される(通知される)
    public update(news: string): void {
        console.log(`${this.name}はニュースを受け取りました: ${news}`);

        // 更新されたニュースの内容を購読者に出力するような処理が行われる
        // 処理
    }
}

// 使用例
const newsService = new NewsService();

// サブスク(ニュースの通知)を購読する人を二人準備
const subscriber1 = new ConcreteSubscriber("サブスクライバー1");
const subscriber2 = new ConcreteSubscriber("サブスクライバー2");

// 上記の二人が購読者一覧に登録される
newsService.subscribe(subscriber1);
newsService.subscribe(subscriber2);

// 「速報: TypeScriptは素晴らしい！」と言う新しいニュースが追加される
// NewsService状態の変化=>観察者(Subscriber)に状態の変化を伝える
newsService.addNews("速報: TypeScriptは素晴らしい！");

// 出力
// NewsService: 新しいニュースが追加されました - 速報: TypeScriptは素晴らしい！
// サブスクライバー1はニュースを受け取りました: 速報: TypeScriptは素晴らしい！
// サブスクライバー2はニュースを受け取りました: 速報: TypeScriptは素晴らしい！

// サブスクライバー2が購読者リストから消される(サブスクライバー2がニュース通知機能を解約したと言うイメージ)
newsService.unsubscribe(subscriber2);

// さらに新しいニュースが追加される
newsService.addNews("最新情報: Observerパターンについてもっと学ぶ！");

// 出力
// NewsService: 新しいニュースが追加されました - 最新情報: Observerパターンについてもっと学ぶ！
// サブスクライバー1はニュースを受け取りました: 最新情報: Observerパターンについてもっと学ぶ！
// →サブスクライバー2は通知機能を解約しているので新しいニュース(最新情報: Observerパターンについてもっと学ぶ！)が配信されない
