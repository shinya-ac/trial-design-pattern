import { Knight, Wizard, Thief, CharacterFactory } from './factory';

describe('Character Factory', () => {
    it('should create a Knight', () => {
        // モックの返却値の設定
        const createCharacterMock = jest.spyOn(CharacterFactory, 'createCharacter');
        const mockKnight = new Knight('モックKnight', 999);
        createCharacterMock.mockReturnValue(mockKnight);

        // ファクトリーメソッドを呼び出すクライアントコード
        // 名前をArthur、レベルを5で指定して呼び出しているにも関わらず
        const knight = CharacterFactory.createCharacter('Knight', 'Arthur', 5);

        // 期待される結果を検証
        console.log(knight)// ここで「Knight { name: 'モックKnight', level: 999 }」と出力されるので正しくCharacterFactory.createCharacterがモック化できているのがわかる
        console.log(mockKnight)
        expect(knight).toBe(mockKnight);
    });
});