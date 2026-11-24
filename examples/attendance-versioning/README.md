# 出欠記録の同時編集 · TypeScript

UP-Dreamの出欠保存で使うバージョン照合を、メモリ上の架空の記録1件で再現する公開サンプルです。二人が同じバージョンを開いた場合、先に保存した変更を残し、後から届いた古いバージョンの変更には最新の状態を返します。

[実装](attendance.ts) · [テスト](attendance.test.ts) · [本番の設計解説](../../docs/updream.md#2-shared-api-save-attendance-with-conflict-detection)

## 手元で確認する

Node.js 22.18以降で、このディレクトリから実行します。依存パッケージのインストールは不要です。

```sh
node --test attendance.test.ts
```

テストでは未入力と欠席の区別、古い編集が先の保存を上書きしないこと、最新の状態を確認して再保存できることを確認します。

本番ではDBトランザクションの中で権限の再確認、出欠とバージョンの更新、監査履歴の保存を行います。このサンプルの確認範囲は、単一プロセスでのバージョン照合と競合時の結果です。公開用にCodexの支援で作成し、架空のデータだけを使用しています。

## English

A runnable TypeScript example of UP-Dream’s expected-version check. It uses one in-memory attendance record and tests missing versus absent status, rejection of stale edits, and a fresh edit after reading the latest version. The linked case study covers the database transaction used by the service.
