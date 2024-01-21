import { DataLoader, IFileReader,  IDataParser} from './facade-interface';

// FileReaderSystemのモッククラス=>IFileReaderインターフェースさえ満たしていれば中身はなんでもいい
class MockFileReaderSystem implements IFileReader {
    read(file: string): string {
        return `Mocked contents of ${file}`;
    }
}

// DataParserのモッククラス
class MockDataParser implements IDataParser {
    parse(data: string): object {
        return { mockedContent: data };
    }
}

describe('DataLoader', () => {
    test('loadData should return parsed data', () => {
        // モックインスタンスの作成
        const mockReader = new MockFileReaderSystem();
        const mockParser = new MockDataParser();

        // DataLoaderのインスタンス化
        // mockReaderとmockParserがインターフェースに沿っているので引数に渡せている
        const loader = new DataLoader(mockReader, mockParser);

        // テストの実行
        const result = loader.loadData('test.txt');

        // 期待される結果をアサートする
        // モッククラスであるMockDataParserのparserを利用しているので「mockedContent:」となっている
        // かつモッククラスであるMockFileReaderSystemのreadを利用しているので「Mocked contents of」となっている
        expect(result).toEqual({ mockedContent: 'Mocked contents of test.txt' });
    });
});