# 目的

Googleカレンダーの予定から
Scrapbox Projectページへ1クリックで飛べるようにする。

## 対象

7月以降の予定

## 処理

1. Google Calendarからイベントを取得する
2. projects.yamlからProject候補を検索する
3. DescriptionにProjectリンクが既に存在するか確認する
4. 存在しなければDescription先頭へ追記する
5. Dry Runの場合は更新せず結果のみ表示する

■Project
https://scrapbox.io/{project}/{page}

## 入力

Google Calendar Event

Title:
ふくくるさんぽ（編曲演奏・リズムパフォーマンス）

Description:
9:00 積み込み開始
...

## 出力

Description

■Project
https://scrapbox.io/muselab/ふくくるさんぽ-26/7/18(土)

9:00 積み込み開始
...

## 完了条件

- Google Calendarの1件の予定にProjectリンクを追加できる
- 既にProjectリンクがある場合は更新しない
- Dry Runで更新内容を確認できる

## 対象外

- Scrapbox APIによるページ作成
- 双方向同期
- projects.yamlの自動生成
- AIによるページ推定

## Dry Run出力例

```
=== DRY RUN ===

Event
----------------------------------------
Title:
ふくくるさんぽ（編曲演奏・リズムパフォーマンス）

Matched Project
----------------------------------------
Project : muselab
Page    : ふくくるさんぽ-26/7/18(土)

Generated URL
----------------------------------------
https://scrapbox.io/muselab/ふくくるさんぽ-26/7/18(土)

Action
----------------------------------------
Projectリンクが存在しません。
Description先頭へ以下を追加します。

■Project
https://scrapbox.io/muselab/ふくくるさんぽ-26/7/18(土)

Result
----------------------------------------
Update Required
(Calendarは更新しません)
```

### 既にProjectリンクがある場合

```
=== DRY RUN ===

Event
----------------------------------------
Title:
ふくくるさんぽ（編曲演奏・リズムパフォーマンス）

Result
----------------------------------------
Projectリンクは既に存在します。

No Update
```

### マッピングできなかった場合

```
=== DRY RUN ===

Event
----------------------------------------
Title:
○○○

Result
----------------------------------------
projects.yamlに一致するProjectがありません。

Skipped
```
