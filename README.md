# Backend

## 追加した物
```
// dependencies
- @prisma/client
- class-transformer
- class-validator
- lodash.isequal

// devDependencies
- prisma
- @types/lodash.isequal

// ???
- @nestjs/cqrs
- @nestjs/event-emitter

npm install -D prisma @types/lodash.isequal
npm install @prisma/client class-transformer class-validator lodash.isequal
// ???
npm install @nestjs/cqrs @nestjs/event-emitter
```

## modules
- auth-system  : 認証システム ※必要なのか不明 Microsoft
- chant-system : メインのチャントシステム
- data-transformation-system : 外部データ管理
- report-system: 帳票出力システム


https://github.com/Sairyss/domain-driven-hexagon

https://zenn.dev/yamachan0625/books/ddd-hands-on/viewer/chapter5_event_storming
