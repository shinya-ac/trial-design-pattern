### ビルドと実行方法

`factory.ts`ファイルを例にする

`tsc factory/factory.ts --outDir dist`でビルド

`node ./dist/factory.js`で実行

### テスト実行(個別実行)
`npx jest factory.test.ts`