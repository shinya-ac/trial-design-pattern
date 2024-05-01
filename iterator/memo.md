Iteratorパターン
要は「コレクション操作を行う際のインターフェース」だと考えると一番シンプル

抽象化とカプセル化:
Iterator パターンはコレクションの内部構造（データがどのように格納されているか）を隠蔽する。利用者はコレクションの要素にアクセスするために、単純なインターフェイス（next と hasNext）を使用するだけでよく、コレクションの実装詳細を知る必要はない。

再利用性と拡張性:
異なるタイプのコレクション（配列、リスト、ツリーなど）に対して、同じイテレータインターフェイスを使用することができる。これにより、新しいコレクションタイプを追加する際も、既存のイテレータインターフェイスを拡張するだけで済む。

同時走査のサポート:
同一のコレクションに対して、複数のイテレータを同時に使用できる。これにより、一つのコレクションを異なる方法で同時に走査することが可能となる。

コレクションの安全な走査:
コレクションの構造が走査中に変更された場合でも、イテレータはそれを適切に処理することが可能となる（例えば、走査中に要素が追加または削除されること）。