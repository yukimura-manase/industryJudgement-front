# Industry Judgement App Front

## App 概要

1. 会社名と電話番号から、業種を判定するツールの FrontEnd

2. 営業さんのサポートツール

## App の機能説明

1. 「業種」判定 & 「業種」を入力した CSV の Download 機能

   - 会社名, 電話番号, 業種 の 3 つの Column が存在する CSV の「会社名」と「電話番号」から「業種」を判定します。

   - GPT4 と、Web スクレイピングを活用して、判定しています。

2. CSV 確認機能

   - 「業種」判定の実施前に、CSV の内容を App で確認することができます。

### これから、追加予定の機能

3. 「電話番号」から「会社名」を判定 & 「会社名」を入力した CSV の Download 機能

   - Web スクレイピングを活用して、判定します。

## 環境構築方法(初期 setup)

<br>

### 0. 前提条件: BackEnd-API の環境を構築済み

まずは、こちらの
[industryJudgement-backend-api](https://github.com/yukimura-manase/industryJudgement-backend-api)
が立ち上がっていることが前提になります。
<br>

### 1. プロジェクトを Clone

```bash
git clone git@github.com:yukimura-manase/industryJudgement-front.git
```

### 2. パッケージを install する

frontend ディレクトリに移動して、パッケージを install する

```bash
cd industryJudgement-front/frontend/ && yarn install
```

### 3. docker-compose で Dockerfile から image をビルドする

docker-compose build コマンドは、Docker ファイルから image を作成してくれるコマンドです。

```bash
docker-compose build
```

このコマンドを実行すると、Dockerfile に従って各サービスの Docker イメージがビルドされ、
<br/>
イメージ名とタグ名が作成されます。

### 4. Docker Image の ビルドを確認する

docker image ls で、build された image を確認しておきます。

```bash
docker image ls
```

### 5. Docker コンテナを実行する

次のコマンドで、Docker Compose ファイルに定義されたサービスをバックグラウンドで起動できます。

```bash
docker-compose up -d
```

ちなみに、Image のビルド と コンテナの実行を同時にする場合は、次のコマンドを実行します。

```bash
docker-compose up --build
```

### 6. コンテナの起動状況を確認する

Docker コンテナの起動状況は、`docker container ps` コマンドで確認できます。

### 7. Web ブラウザからアクセスする

http://localhost:8002/ にアクセスして、FrontApp の起動を確認する

### 8. Docker コンテナの停止 & 削除

docker-compose down コマンドを使用して、すべてのコンテナを停止し、削除することができます。

```bash
docker-compose down
```
