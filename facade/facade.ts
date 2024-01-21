// サブシステム1: ファイル読み込み
class FileReaderSystem {
    read(file: string): string {
        // ファイル読み込みのロジック（ダミー）
        return `Contents of ${file}`;
    }
}

// サブシステム2: データ解析
class DataParser {
    parse(data: string): object {
        // データ解析のロジック（ダミー）
        return { content: data };
    }
}

// ファサード: データローダー > サブシステム二つを統合している
class DataLoader {
    private reader = new FileReaderSystem();
    private parser = new DataParser();

    loadData(file: string): object {
        const data = this.reader.read(file);
        return this.parser.parse(data);
    }
}

// クライアントはファサードだけをインスタンス生成してloadDataだけを呼び出せばいい
const loader = new DataLoader();
const result = loader.loadData('data.txt');
console.log(result);

// ファサードを利用しない場合は以下のようになる
// const reader = new FileReaderSystem();
// const parser = new DataParser();
// const readData = reader.read('not-use-facade-data.txt')
// const res = parser.parse(readData)
// console.log(res);
// この場合、クライアントは二つのサブシステムをインスタンス化する必要が出てくる
// 2つのサブシステムなら違いは感じにくいが数が増えると複雑性が増加したり
// facadeを利用するとfacadeクラスにサブシステムが閉じ込められるので依存関係を正しく設定できたり、
// サブシステムに変更が加わってもクライアント側に直接的な影響を及ぼさないというメリットがある
