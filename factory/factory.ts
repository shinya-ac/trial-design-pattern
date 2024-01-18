export { Character, Knight, Wizard, Thief, CharacterFactory };

// Charactersの抽象クラス
abstract class Character {
    protected name: string;
    protected level: number;

    constructor(name: string, level: number = 1) {
        this.name = name;
        this.level = level;
    }

    // プロパティにアクセスするためのゲッターメソッド
    getName(): string {
        return this.name;
    }

    getLevel(): number {
        return this.level;
    }

    abstract getRole(): string;
    abstract getAbility(): string;
}

// 具象クラス(Knight,Wizard,Thief)
class Knight extends Character {
    getRole() {
        return '剣士';
    }
    getAbility() {
        return '剣で闘う';
    }
}

class Wizard extends Character {
    getRole() {
        return '魔法使い';
    }
    getAbility() {
        return '呪文を唱える';
    }
}

class Thief extends Character {
    getRole() {
        return '泥棒';
    }
    getAbility() {
        return 'こっそり盗む';
    }
}

// CharacterFactory - Factoryメソッド
class CharacterFactory {
    static createCharacter(type: string, name: string, level: number = 1): Character {
        switch (type) {
            case 'Knight':
                return new Knight(name, level);
            case 'Wizard':
                return new Wizard(name, level);
            case 'Thief':
                return new Thief(name, level);
            default:
                throw new Error(`Unknown character type: ${type}`);
        }
    }
}

// クライアントからの呼び出しの際にどの具象クラスを生成するかをクライアント側で指定できる
const knight = CharacterFactory.createCharacter('Knight', 'Arthur', 5);
const wizard = CharacterFactory.createCharacter('Wizard', 'Merlin', 10);
const thief = CharacterFactory.createCharacter('Thief', 'Robin', 3);

// ファクトリーパターンを利用しない実装例
// const knight = new Knight('Arthur', 5);
// const wizard = new Wizard('Merlin', 10);
// const thief = new Thief('Robin', 3);
// この場合、不明なキャラクターをインスタンス化しても「Unknown character type」と言うエラーは返らない

// 生成した具象クラスを用いてそのメソッドを呼び出す&ゲッターメソッドも利用し値も出力
console.log(`${knight.getName()}：${knight.getRole()} - level ${knight.getLevel()} - ${knight.getAbility()}`);
console.log(`${wizard.getName()}：${wizard.getRole()} - level ${wizard.getLevel()} - ${wizard.getAbility()}`);
console.log(`${thief.getName()}：${thief.getRole()} - level ${thief.getLevel()} - ${thief.getAbility()}`);
