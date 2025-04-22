# DIFF GENERATOR
二つのフォルダの差を抽出し、差分ファイルを作ります。

# SETUP
最初に下記を実行してください。処理に必要なライブラリとフォルダが生成されます。
```
npm i
npm run init
```

# HOW TO USE
`diffTargetOld`に古いフォルダ、`diffTargetNew`に新しいフォルダをコピーします。<br/>
例）プロジェクトでビルドされた結果がdistなら、<br/>`diffTargetOld/dist/`や`diffTargetNew/dist/`のようにする。<br/>
![差分生成のためのディレクトリ構造の解説](https://github.com/user-attachments/assets/93fd4ed0-4fba-4e2f-babc-e0aae37d0fd1)

この状態で`npm run diff`を実行すると、exportsに差分フォルダと最新フォルダがリネームされて生成されます。
```
npm run diff
```





