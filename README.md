## Description

Course project to learn nestjs;.

## Installation

```bash
$ npm install
```

## Running the app

```bash
#databaes
$ docker-compose up

# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod

#rename .env
$ cp .env.exemple .env
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Comands
```bash
# create module
$ nest -g create module <module_name>

# create class
$ nest -g create cls /path/to/class

#create migration - needs ormconfig
$ npx typeorm migration:create  ./src/migrations/CourseRefactory

#run migration
$  npx typeorm migration:run -d ./ormconfig.js
```

## Validation

1. Install dependencies

```bash
#install dependencies
$ npm i class-validator class-transformer

```
2. Import validation pipe on main.ts

```typescript
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // here
  app.useGlobalPipes(new ValidationPipe({
    whitelist:true,
    forbidNonWhitelisted:true,
    transform: true
  }))
  await app.listen(3000);
}
bootstrap();
```

## My notes

- Error treatment - Exception Filter https://docs.nestjs.com/exception-filters
- Interceptor chain: Request -> Middleware -> Interceptor -> Route Handler -> Interceptor
