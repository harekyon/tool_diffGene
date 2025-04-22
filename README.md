# DIFF GENERATOR
二つのフォルダの差を抽出し、差分ファイルを作ります。

# SETUP
最初に以下を実行してください。処理に必要なライブラリとフォルダが生成されます。
```
npm i
npm run init
```

# HOW TO USE
`diffTarget/old`に古いフォルダ、`diffTarget/new`に新しいフォルダをコピーします。<br/>
例）プロジェクトでビルドされた結果がdistなら、<br/>`diffTarget/old/dist/`や`diffTarget/new/dist/`のようにする。<br/>
![差分生成のためのディレクトリ構造の解説](https://github.com/user-attachments/assets/20fd1b3b-c8fc-419c-8b0b-940417aa61b3)

この状態で下記を実行すると、exportsに差分フォルダと最新フォルダがリネームされて生成されます。
```
npm run diff
```





