## Description

Course project to learn nestjs;.

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
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
  app.useGlobalPipes(new ValidationPipe())
  await app.listen(3000);
}
bootstrap();
```

