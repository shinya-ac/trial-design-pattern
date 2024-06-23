// Bookクラスの定義
class Book2 {
    constructor(
        public title: string,
        public author: string
    ) {}
}

// BookCollectionクラスの定義
class BookCollection2 {
    private books: Book2[] = [];

    public addBook(book: Book2): void {
        this.books.push(book);
    }

    // 配列を直接走査するメソッド
    public printBooks(): void {
        for (let i = 0; i < this.books.length; i++) {
            const book = this.books[i];
            console.log(`${book.title} by ${book.author}`);
        }
    }
}

// 上記が配列を内部構造としてbooksをprintBooks()するコード
// 以下のようにリンクリストになったとする

class Node2<T> {
    constructor(public value: T, public next: Node2<T> | null = null) {}
}

class LinkedList<T> {
    private head: Node2<T> | null = null;

    public add(value: T): void {
        if (this.head === null) {
            this.head = new Node2(value);
        } else {
            let current = this.head;
            while (current.next !== null) {
                current = current.next;
            }
            current.next = new Node2(value);
        }
    }

    public getHead(): Node2<T> | null {
        return this.head;
    }
}

class BookCollection3 {
    private books: LinkedList<Book2> = new LinkedList<Book2>();

    public addBook(book: Book2): void {
        this.books.add(book);
    }

    public printBooks(): void {
        let current = this.books.getHead();
        // リンクリストの場合、以下のようなwhile文でprintを回していくことになる。
        // なぜなら内部構造が配列とは異なるため。
        while (current !== null) {
            const book = current.value;
            console.log(`${book.title} by ${book.author}`);
            current = current.next;
        }
    }
}

// 呼び出し
const library_1 = new BookCollection2();
library_1.addBook(new Book2("リーダブルコード", "Dustin Boswell"));
library_1.addBook(new Book2("リファクタリング", "Martin Fowler"));
library_1.addBook(new Book2("Clean Architecture", "Robert C Martin"));

library_1.printBooks();

// つまり、booksの内部構造が配列からリンクリストに変わるとprintBooks()の実装が大きく変わるのが難点

const library_2 = new BookCollection3();
library_2.addBook(new Book2("リーダブルコード", "Dustin Boswell"));
library_2.addBook(new Book2("リファクタリング", "Martin Fowler"));
library_2.addBook(new Book2("Clean Architecture", "Robert C Martin"));

library_2.printBooks();
