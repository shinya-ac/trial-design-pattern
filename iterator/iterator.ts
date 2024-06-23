// Book クラスの定義
class Book {
    constructor(
        public title: string,
        public author: string
    ) {}
}

// Iterator インターフェースの定義
interface Iterator<T> {
    next(): IteratorResult<T>;
    hasNext(): boolean;
}

// BookCollection クラスとそのイテレータの定義
class BookCollection {
    private books: Book[] = [];

    public addBook(book: Book): void {
        this.books.push(book);
    }

    // イテレーターの初期化をここで定義する
    public getIterator(): Iterator<Book> {
        return new BookCollectionIterator(this.books);
    }
}

// ここがイテレーター→BookCollectionを操作できるクラス
class BookCollectionIterator implements Iterator<Book> {
    private position: number = 0;
    private books: Book[];

    constructor(books: Book[]) {
        this.books = books;
    }

    // 順番通りに走査するイテレーターの挙動
    // books配列を0から順に走査していき、次の要素があれば
    public next(): IteratorResult<Book> {
        if (this.hasNext()) {
            return {
                // 以下の`this.position++`は後置インクリメント。まず「this.position」で現在の位置のbooks要素を取得した後にthis.positionの値を+1する。
                value: this.books[this.position++],
                done: false
            };
        } else {
            return {
                // books配列に次の要素がなくなったらvalueはnullになり、完了を示すためにdoneがtrueになる。
                value: null,
                done: true
            };
        }
    }

    public hasNext(): boolean {
        return this.position < this.books.length;
    }

    // 逆順番に走査するイテレーターが欲しかったら追加すればいい
    // ニーズに合わせたイテレーションの実装を簡単にできる
}

// libraryコレクションの初期化と本の追加
const library = new BookCollection();
library.addBook(new Book("リーダブルコード ―より良いコードを書くためのシンプルで実践的なテクニック", "Dustin Boswell"));
library.addBook(new Book("リファクタリング(第2版): 既存のコードを安全に改善する ", "Martin Fowler"));
library.addBook(new Book("Clean Architecture 達人に学ぶソフトウェアの構造と設計", "Robert C Martin"));

// libraryコレクションのgetIterator()を呼び出してイテレーターを初期化
const iterator = library.getIterator();
// BookCollectionIteratorを用いてじゅんぐりBookCollectionを操作する
// BookCollectionがどのようなコレクションの内部構造なのか（リストなのかツリーなのかなど）を気にする必要がない
let result = iterator.next();
while (!result.done) {
    const book = result.value;
    if (book) {
        console.log(`${book.title} by ${book.author}`);
    }
    result = iterator.next();
}

// ----------------------------------------
// もしbooksの内部構造がリンクリストになったとする。
// ----------------------------------------

class BookCollection4 {
    private books: LinkedList2<Book> = new LinkedList2<Book>();

    public addBook(book: Book): void {
        this.books.add(book);
    }

    public getIterator(): Iterator<Book> {
        return new LinkedListIterator(this.books.getHead());
    }
}

class Node3<T> {
    constructor(public value: T, public next: Node3<T> | null = null) {}
}

class LinkedList2<T> {
    private head: Node3<T> | null = null;

    public add(value: T): void {
        if (this.head === null) {
            this.head = new Node3(value);
        } else {
            let current = this.head;
            while (current.next !== null) {
                current = current.next;
            }
            current.next = new Node3(value);
        }
    }

    public getHead(): Node3<T> | null {
        return this.head;
    }
}

// 以下のイテレーターは内部構造がリンクリストになろうとも、「next()」と「hasNext()」を有してさえいれば
// 呼び出し側にその内部構造の変更を影響させなくても大丈夫となる。
class LinkedListIterator implements Iterator<Book> {
    private current: Node3<Book> | null;

    constructor(head: Node3<Book> | null) {
        this.current = head;
    }

    public next(): IteratorResult<Book> {
        if (this.hasNext()) {
            const value = this.current!.value;
            this.current = this.current!.next;
            return {
                value: value,
                done: false
            };
        } else {
            return {
                value: null,
                done: true
            };
        }
    }

    public hasNext(): boolean {
        return this.current !== null;
    }
}

const ll_library = new BookCollection4();
ll_library.addBook(new Book("リーダブルコード", "Dustin Boswell"));
ll_library.addBook(new Book("リファクタリング", "Martin Fowler"));
ll_library.addBook(new Book("Clean Architecture", "Robert C Martin"));

// 呼び出し側は内部構造が変わろうとも「iterator2.next()」と言う呼び出しはそのまま継続できるので何も影響を受けない
// ここがイテレーターパターンのいいところ
const iterator2 = ll_library.getIterator();
let result2 = iterator2.next();
while (!result2.done) {
    const book = result2.value;
    if (book) {
        console.log(`${book.title} by ${book.author}`);
    }
    result2 = iterator2.next();
}