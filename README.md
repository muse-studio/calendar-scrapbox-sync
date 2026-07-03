# calendar-scrapbox-sync

Google Calendar と Scrapbox を連携し、
研究室運営OSの時間軸と知識管理を統合するためのツールです。

## Goal

Google Calendar
↓
Scrapbox Project Page
↓
Task / Log / Knowledge

## Version 0.1

- Google Calendarイベント取得
- Scrapbox Projectリンク生成
- Google Calendar説明欄へProjectリンクを追記
- Dry Run対応

### Required

id:
title:
keywords:
scrapbox:

### Optional

aliases:
category:
status:
calendar:
github:

## Design Principles

- projects.yaml により、コードを書き換えずに運用ルールを変更できる
- 設定と実装を分離する
- 小さく作り、段階的に機能を追加する

## Future

- Scrapbox API連携
- 双方向同期
- Google Drive連携
- GitHub連携
- Today Dashboard
