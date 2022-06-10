# HPの内容書き換え

HPの内容を編集したい場合は，適宜，以下を編集してプルリクを立ててください．`images/`， `public__material/`はシンボリックリンクになっているので，その場に置いてくれれば大丈夫です．

- `mdfiles/`: 記事置き場
    - `static/index.md`: 公開ファイル
        - 公開したいファイルがあれば
    - `wiki/assign.md`: 研究室配属
        - 研究室配属時期の手前に編集
    - `wiki/member.md`: 研究室メンバー
        - 新規配属時や年度末に編集が必要
    - `wiki/result.md`: 業績リスト
        - 論文発表のタイミングで追記
    - `wiki/theme.md`: 研究テーマ
        - 適宜編集
    - `wiki/thesis.md`: 学位論文タイトルリスト
        - 卒論・修論・博論終了時(年度末)に追記
    - `index.md`: トップページ
        - 写真等の変更
    - `workshop/okayama.md`: 合同研究会
        - 岡山大学との合同研究会予定を記載していた．現在凍結中
    - `images/` → `../docs/images/`: 画像置き場
    - `public_material/` → `../docs/public_material/`: 公開資料(PDF)置き場

## 編集例

### 研究テーマの編集

1. ソースをcloneする
   ```bash
   git clone git@github.com:sai-lab/sai-lab.github.io.git
   ```
2. ブランチを切る
    ```bash
    git checkout -b ブランチ名
    ```
3. `wiki/theme.md`を編集する
    1. 適当な位置にテーマを追加
        ```md:wiki/theme.md
        ## ほげほげ

        <img src="../images/theme/hogehoge.png" alt="hoge" width="50%">

        本研究は，〜〜のために〜〜〜をしています．
        ```
    2. 画像を置きたい場合は，`docs/images/theme/`に置く．
        ※シンボリックリンクを使用しているため，マークダウンのリンクは切れる可能性あり
    3. 新テーマを追加した場合は、`wiki/theme.md`の上部(目次)にリンクを追加する
        ```md:wiki/theme.md
        [ほげ](#ほげ)  
        ```
4. 編集をコミットしてプッシュする
    ```bash
    git add .
    git commit -m "add 'hoge' to theme"
    git push origin add/theme-hoge
    ```
5. プルリクを建てる → main
   ※わかりやすいタイトルにすること
6. (レビュワー) 編集内容を確認してマージする

## 編集時の注意

### リンクの追加

- 書き方
    ```md
    [名前](#リンク先)

    (中略)

    ## リンク先
    ```
- 改行させるために，末尾にスペースを2つ入れる
- リンク先にスペースが含まれる場合，ハイフン(`-`)に置き換える
- 英字の大文字は小文字に変換する
- 半角記号 !@#$%^&*()+|~=`[]{};':",./<>? は省略する
