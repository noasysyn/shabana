# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## 概要

尼崎市の「謝花医院（小児科・内科）」のコーポレートサイト。ビルドツール・パッケージマネージャ・テストは一切なく、**静的 HTML/CSS/JS をそのまま公開ディレクトリに置く構成**。Dreamweaver で制作・保守されている。`www` がサイトルート（`index.html` が `/`）。

## 開発・確認方法

ビルド／lint／テストのコマンドは存在しない。編集後はブラウザでファイルを直接開くか、ローカルサーバで確認する:

```powershell
python -m http.server 8000   # F:\前川さん引継ぎ\謝花医院\www で実行 → http://localhost:8000/
```

`access/index.html` の Google Maps（`access/map.js`）は `http://maps.google.com/maps/api/js?sensor=false` という**旧・APIキー無しの読み込み方**で、現在は動作しない。地図まわりを触る場合はここが原因であることを想定する。

## 構成の要点

### Dreamweaver テンプレート（最重要）

`Templates/midmase.dwt` が下層ページ共通のテンプレート。以下のページがそのインスタンス:

`about/`, `access/`, `information/`, `staff/`, `topics/`(index, season, vaccine), `info/`(privacy, sitemap)

- 各ページ先頭に `<!-- InstanceBegin template="/Templates/midmase.dwt" -->` があり、編集可能なのは `InstanceBeginEditable`〜`InstanceEndEditable` の間だけ:
  - `doctitle` … `<title>`
  - `head` … ページ固有の `target` 変数と `css/design.css` の読み込み
  - `EditRegion1` … `h1`（ページ見出し画像）とパンくず `#pan`
  - `EditRegion2` … 本文 `#content`
- **ヘッダ・グローバルナビ・サイドバー・フッターを変更する場合は、`.dwt` を直すだけでは反映されない。** Dreamweaver でのテンプレート再適用ができない環境では、各インスタンス HTML の該当箇所を手作業で全て同じように修正する必要がある（サイドバーとフッターは全ページに実体としてコピーされている）。
- **トップページ `index.html` はテンプレート非適用の独立ファイル**。パスが相対（`common/...`、下層は `../common/...`）でありレイアウトも別物なので、下層と同じ編集を機械的に適用しない。

### CSS

- `common/css/common.css` … 全ページ共通（リセット、ヘッダ/ナビ/サイドバー/フッター、`.section` 等のレイアウト）。全ページから読み込まれる。
- `<ディレクトリ>/css/design.css` … 各セクション固有のスタイル。ファイル名は全ディレクトリで同じなので、パスを取り違えないこと。
- トップページの新着情報まわりのスタイルは `index.html` 内の `<style>` に直書きされている（`.atttxt2022`, `.att2022li` 等）。

### JavaScript

- `common/js/jquery-1.7.2.min.js` … 古い jQuery。`rollover.js` 内のスムーススクロールが `$.browser`（jQuery 1.9 で削除）に依存しているため、**jQuery を安易に上げると壊れる**。
- `common/js/rollover.js` … 画像ロールオーバー（`_off.` ↔ `_on.` のファイル名置換）と、現在ページのナビ強調。強調は各ページ `<head>` のグローバル変数 `target`（`"home"`, `"about"`, `"info"`, `"access"`, `"topics"`, `"staff"`）で決まり、`target + "img"` という id の `<img>` を `_on` に固定する。**新規ページを追加したら `target` の設定を忘れない。**
- `common/js/` の `album.js` / `heightLine.js` / `scroll.js` / `smooth.pack.js` はどの HTML からも読み込まれていない未使用ファイル。

### コンテンツ更新でよく触る箇所

- 休診・お知らせ … `index.html` の `<dl id="information">`。過去のお知らせは削除せず HTML コメントで残す運用になっている。新着には `<span class="hako">New</span>` と `class="redtxt"` を付ける。
- ルート直下の `news.html` は `<dl id="information">` だけを持つ断片で、現在どこからも参照されていない（トップの「一覧を表示」リンクはコメントアウト済み）。
- 診療時間・住所・電話番号は index / .dwt / 全インスタンスのサイドバー・フッターに重複して書かれている。変更時は全ファイルを横断的に検索して修正する。

## 文字コード・記法上の注意

- HTML/CSS は UTF-8。ただし **`common/js/rollover.js` のコメントは Shift-JIS** で書かれており、UTF-8 として読むと文字化けする。このファイルを書き換える際はコメントを壊さないよう注意する（実処理には影響しない）。
- DOCTYPE は XHTML 1.0 Transitional。既存コードに合わせて空要素は `<br />` のように閉じる。
- 見出し・ボタン・電話番号の多くは画像（`common/images/`, 各 `images/`）。文言変更が画像差し替えを伴うことが多い。
