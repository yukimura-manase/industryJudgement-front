# Industry Judgement App Front

## 環境構築方法(初期 setup)

<br>

### 0. 前提条件: BackEnd-API の環境を構築済み

まずは、こちらの
[InstaWordCloud-backend-api](https://github.com/yukimura-manase/InstaWordCloud-backend-api)
が立ち上がっていることが前提になります。
<br>

### 1. プロジェクトを Clone

```bash
git clone git@github.com:yukimura-manase/InstaWordCloud-front.git
```

### 2. パッケージを install する

frontend ディレクトリに移動して、パッケージを install する

```bash
cd IndustryJudgement-front/frontend/ && yarn install
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

# [ 出力結果 ]
REPOSITORY                         TAG       IMAGE ID       CREATED         SIZE
insta_word_cloud_app-frontend      latest    32f9a111b134   6 seconds ago   173MB
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

```bash
docker container ps
CONTAINER ID   IMAGE                           COMMAND                  CREATED          STATUS          PORTS                               NAMES
ba6f52ee8084   insta_word_cloud_app-frontend   "docker-entrypoint.s…"   7 seconds ago    Up 5 seconds    0.0.0.0:8000->3000/tcp              insta_word_cloud_app-frontend-1
```

### 7. Web ブラウザからアクセスする

http://localhost:8002/ にアクセスして、FrontApp の起動を確認する

### 8. Docker コンテナの停止 & 削除

docker-compose down コマンドを使用して、すべてのコンテナを停止し、削除することができます。

```bash
docker-compose down
```

---

## 【 関連記事・学習用の記事 】

<br>

### 1. Dokcer にて React-TypeScript 環境を構築する

[Docker で React・TypeScript 環境を構築する方法(ハンズオン講座)](https://masanyon.com/docker-react-typescript-env/)

### 2. GitHub

[【Git・GitHub】GitHub からプロジェクトをクローン(Clone)してセットアップする方法](https://masanyon.com/git-github-project-clone-setup/)

### 3. 別々の docker-compose.yml で作成された Docker コンテナを Network 接続する方法

[別々の docker-compose.yml で作成された Docker コンテナを Network 接続する方法](https://masanyon.com/docker-docker-compose-yml-container-network-share/)
