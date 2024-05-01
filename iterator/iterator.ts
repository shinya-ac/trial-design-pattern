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
    public next(): IteratorResult<Book> {
        if (this.hasNext()) {
            return {
                value: this.books[this.position++],
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
        return this.position < this.books.length;
    }

    // 逆順番に走査するイテレーターが欲しかったら追加すればいい
    // ニーズに合わせたイテレーションの実装を簡単にできる
}

// libraryコレクションの初期化と本の追加
const library = new BookCollection();
library.addBook(new Book("The Hobbit", "J.R.R. Tolkien"));
library.addBook(new Book("1984", "George Orwell"));
library.addBook(new Book("The Catcher in the Rye", "J.D. Salinger"));

// libraryコレクションのgetIterator()を呼び出してイテレーターを準備
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