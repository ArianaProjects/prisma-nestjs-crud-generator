# Prisma Code Generator

> **WARNING**: This project is a BETA PHASE

## **Intro**

Prisma Code Generator CRUD Generator from the Prisma Schema for NestJs with most used Decorator for Entities and DTOs and controllers. This generator works with PostgreSQL. This Generator generates the following files for each Model.

1. Module
2. Controller
3. DTOs
4. Entity
5. Service

## Installation

Simply install the Prisma Code Generator

```bash
npm install @ariana/prisma-code-generator
yarn add @ariana/prisma-code-generator
```

add the following configuration into your Prisma Schema

```TS
generator Prisma_Code_Generator {
  provider = "Prisma_Code_Generator"
  output   = "../gen"
}
```

Running npx prisma generate for your Prisma Schema

```bash
npx prisma generate
```

### TODO

[ ] Add to Package manager
[ ] Bug Fixing

# Related links

Many Tanks to [Prisma](https://www.prisma.io/) with an open source database toolkit for PostgreSQL, MySQL, SQL Server, SQLite and MongoDB

This repository is created with love in our team at [Ariana Germany GmbH](https://www.arianagermany.com/)
