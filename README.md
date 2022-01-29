<!-- PROJECT LOGO -->
<br />
<div align="center">
  <a href="https://www.arianagermany.com/">
    <img src="https://storage.agio360.com/ariana/images/Untitled-3.svg" alt="Logo" width="80" height="80">
  </a>

  <h2 align="center">Prisma Code Generator</h2>

  <p align="center">
    A full CRUD generator for NestJs with Prisma Schema
    <br />
    <a href="https://github.com/ariana-germany/prisma-code-generator"><strong>Explore the docs »</strong></a>
    <br />
    <br />
    <a href="https://github.com/ariana-germany/prisma-code-generator">View Demo</a>
    ·
    <a href="https://github.com/ariana-germany/prisma-code-generator/issues">Report Bug</a>
    ·
    <a href="https://github.com/ariana-germany/prisma-code-generator/issues">Request Feature</a>
  </p>
</div>

<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#installation">Installation</a></li>
        <li><a href="#installation">Configuration</a></li>
        <li><a href="#installation">Generation</a></li>
        <li><a href="#usage">Usage</a></li>     
      </ul>
    </li>
    <li><a href="#example">Example</a></li>
    <li><a href="#roadmap">Roadmap</a></li>
    <li><a href="#contributing">Contributing</a></li>
    <li><a href="#license">License</a></li>
    <li><a href="#contact">Contact</a></li>
  </ol>
</details>

<!-- ABOUT THE PROJECT -->

## About The Project

[![Product Name Screen Shot][product-screenshot]](https://example.com)

There are many great Generators available on GitHub for Prisma Schema; however we wanted a fully automatic and complete generator which is compatible with [NestJs](https://nestjs.com/) and we didn't find. So we created this advanced generator.

Of course, no one Generators will serve all projects since your needs may be different. So We'll be adding more in the near future. You may also suggest changes by forking this repo, creating a pull request, or opening an issue. Thanks to all the people who have contributed to expanding this template!

<p align="right">(<a href="#top">back to top</a>)</p>

### Built With

This project is built on top of [Next.js](https://nextjs.org/) Framework Template, which is fully configured by Our Team at [Ariana Company](https://www.arianagermany.com/). You need at least the following packages and libraries for this Generator, which we used in our NestJs template.

- [Prisma](https://prisma.io/)
- [class-transformer](https://github.com/typestack/class-transformer)
- [class-validator](https://github.com/typestack/class-validator)
- [@nestjs/swagger](https://github.com/nestjs/swagger)
- [@nestjs/common](https://github.com/nestjs/common)

<p align="right">(<a href="#top">back to top</a>)</p>

<!-- GETTING STARTED -->

## Getting Started

This section will learn how to use our generator with Prisma and NestJs. We will not show how to install and configure NestJs, and we assume that you know NestJs and Prisma well

### Installation

Simply install the Prisma Code Generator

- npm
  ```sh
  npm i @ariana-germany/prisma-code-generator -D
  yarn add @ariana-germany/prisma-code-generator -D
  ```

### Configuration

After installation, you should add our configuration to your Prisma.schema File.

```TS
generator Prisma_Code_Generator {
  provider = "Prisma_Code_Generator"
  output   = "../gen"
}
```

Output path is relative to the path of the Prisma.schema File and should be an folder.

> **_WARNING_**: Generator will overwrite the folders with the same name as models in the output path.

<p align="right">(<a href="#top">back to top</a>)</p>

<!-- USAGE EXAMPLES -->

## Generation

The Prisma command line interface (CLI) is the primary way to interact with our Generator.

for example:

```sh
npx prisma generate
```

<p align="right">(<a href="#top">back to top</a>)</p>

<!-- ROADMAP -->

## Usage

Now, your CRUD is generated. For using this generated CRUD you should import each of the Module's Model in to your main module. In our case is app.module.ts.

# Example

Now, your CRUD is generated. For using this generated CRUD you should import each of the Module's Model in to your main module. In our case is app.module.ts.

## Prisma.schema

```Prisma

generator prismaCodeGenerator {
  provider = "prisma-code-generator"
  output   = "../gen"
}


generator client {
  provider = "prisma-client-js"

}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

model User {
  id      Int       @id @default(autoincrement())
  email   String    @unique
  name    String?
  Address Address[]
}

model Address {
  id        Int       @id @default(autoincrement())
  createdAt DateTime  @default(now())
  updatedAt DateTime  @updatedAt
  deletedAt DateTime?
  User      User?     @relation(fields: [userId], references: [id])
  Tax       Tax[]
  axId      Int?
  line1     String
  line2     String
  line3     String
  city      String
  zipcode   String
  userId    Int?
}

model Tax {
  id        Int       @id @default(autoincrement())
  createdAt DateTime  @default(now())
  updatedAt DateTime  @updatedAt
  deletedAt DateTime?
  Address   Address?  @relation(fields: [addressId], references: [id])
  addressId Int?
}
```

## Folder sctructure

```
📦gen
 ┣ 📂address
 ┃ ┣ 📜address.controller.ts
 ┃ ┣ 📜address.dto.ts
 ┃ ┣ 📜address.entity.ts
 ┃ ┣ 📜address.module.ts
 ┃ ┗ 📜address.service.ts
 ┣ 📂tax
 ┃ ┣ 📜tax.controller.ts
 ┃ ┣ 📜tax.dto.ts
 ┃ ┣ 📜tax.entity.ts
 ┃ ┣ 📜tax.module.ts
 ┃ ┗ 📜tax.service.ts
 ┗ 📂user
 ┃ ┣ 📜user.controller.ts
 ┃ ┣ 📜user.dto.ts
 ┃ ┣ 📜user.entity.ts
 ┃ ┣ 📜user.module.ts
 ┃ ┗ 📜user.service.ts
```

app.module.ts

```TS
@Module({
  imports: [
    ...
    AddressModule,
    TaxModule,
    UserModule,
    ...
  ],
  controllers: [
    ...
  ],
  providers: [
    ...
  ],
})
export class AppModule implements NestModule {
  ...
}

```

<p align="right">(<a href="#top">back to top</a>)</p>

<!-- ROADMAP -->

## Roadmap

- [x] initial
- [x] soft Delete
- [ ] Add Additional Templates w/ Examples
- [ ] Refactoring
- [ ] MySQL
- [ ] MongoDB

See the [open issues](https://github.com/ariana-germany/prisma-code-generator/issues) for a full list of proposed features (and known issues).

<p align="right">(<a href="#top">back to top</a>)</p>

<!-- CONTRIBUTING -->

## Contributing

Contributions are what make the open source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

If you have a suggestion that would make this better, please fork the repo and create a pull request. You can also simply open an issue with the tag "enhancement".
Don't forget to give the project a star! Thanks again!

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

<p align="right">(<a href="#top">back to top</a>)</p>

<!-- LICENSE -->

## License

Distributed under the Apache License Version 2.0 License. See `LICENSE.txt` for more information.

<p align="right">(<a href="#top">back to top</a>)</p>

<!-- CONTACT -->

## Contact

Shayan - shayan.fard@arianagermany.com - shayandavarifard@yahoo.com

<p align="right">(<a href="#top">back to top</a>)</p>

<!-- ACKNOWLEDGMENTS -->
