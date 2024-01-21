export { DataLoader, IFileReader,  IDataParser};

// interfaceを用いてfacadeパターンのコードを疎結合にした場合

// FileReaderSystemのためのインターフェース
interface IFileReader {
    read(file: string): string;
}

// DataParserのためのインターフェース
interface IDataParser {
    parse(data: string): object;
}
// 実際のところ、上記のインターフェース二つは別ファイルに記載してもいい

// サブシステム1: ファイル読み込み
// 以下のサブシステム(FileReaderSystem)はIFileReaderインターフェースを満たすクラスだと言うことを`implements`で指定
class FileReaderSystem implements IFileReader {
    // インターフェースを満たすために「read」と言う名前かつ引数に「string」をとり、返り値に「string」を返すメソッドが定義される
    read(file: string): string {
        // ファイル読み込みのロジック（ダミー）
        return `Contents of ${file}`;
    }
}

// サブシステム2: データ解析
// サブシステム1同様にインターフェースを指定していて、それに沿ったメソッドの実装がなされている
class DataParser implements IDataParser {
    parse(data: string): object {
        // データ解析のロジック（ダミー）
        return { content: data };
    }
}

// ファサード: データローダー > サブシステム二つを統合している
class DataLoader {
    // インターフェース(≒型)を指定してreaderとparserをプロパティとして定義
    private reader: IFileReader;
    private parser: IDataParser;

    // DataLoaderが呼び出されるときにインターフェースに沿ったreaderとparserを受け取れば
    // その二つの引数をもとにDataLoaderを初期化できる
    // つまりクライアントでreaderとparserをモック化して呼び出せるなどするのでテストも行いやすくなる
    constructor(reader: IFileReader, parser: IDataParser) {
        this.reader = reader;
        this.parser = parser;
    }

    loadData(file: string): object {
        const data = this.reader.read(file);
        return this.parser.parse(data);
    }
}

// クライアントはIFileReaderインターフェースとIDataParserインターフェースに沿った
// 「reader」と「parser」を準備(new)すればいい(インターフェースに沿ってさえすればいいのでモックでもいい)
const reader = new FileReaderSystem();
const parser = new DataParser();
// 上記の二つのクラスを用いてDataLoaderをnewすることができる
const loader = new DataLoader(reader, parser);
// DataLoaderのインスタンスを用いてloadDataメソッドを呼び出す
const result = loader.loadData('data-interface.txt');
console.log(result);
