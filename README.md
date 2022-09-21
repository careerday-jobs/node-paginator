<div align="center">
  <img src="./assets/images/logo-symbol-careerday.png"  width="100" />
  
  <h1>node-paginator</h1>

  <p>Node.js based custom pagination library</p>

  [![npm version](https://badgen.net/npm/v/@careerday-jobs/node-paginator)](https://www.npmjs.com/package/@careerday-jobs/node-paginator)
  [![npm downloads](https://badgen.net/npm/dm/@careerday-jobs/node-paginator)](https://www.npmjs.com/package/@careerday-jobs/node-paginator)
  [![official website](https://img.shields.io/badge/website-careerday-blue)](https://careerday.jobs)
</div>

## 🚀 Features

- 🍀 paginateByMongoose - Monoogse-based pagination helper method that allows you to filter the value of a specific field using a regular expression.

## 📦 Install

```bash
npm install @careerday-jobs/node-paginator
```

## 🪄 Usage

### paginateByMongoose

```ts
import { NodePaginator } from '@careerday-jobs/node-paginator';

# Your Mongoose Model
import { UserModel } from '/src/models/user.model.ts';

const paginatedResult = await NodePaginator.paginateByMongoose({
  pageNoParam: 1,
  pageSizeParam: 10,
  model: UserModel,
  filteredFields: ['name'],
  filter: 'careerday',
  orQuery: null,
  andQuery: null,
  sortingOption: { _id: -1 },
  isNoMinResultLimit: false,
});
```

#### Input Parameters

| parameter          | type                | description                                 |
| :----------------- | :------------------ | :------------------------------------------ |
| pageNoParam        | ```number```        | current page number                         |
| pageSizeParam      | ```numer```         | maximum number of data to display on a page |
| model              | ```Model<any>```    | Mongoose model instance you want to display |
| filteredFields     | ```string[]```      | fields in the document put in regex filter  |
| filter             | ```string```        | value to search for in regex filter         |
| orQuery            | ```FilterQuery```   | custom OR filter query                      |
| andQuery           | ```FilterQuery```   | custom AND filter query                     |
| sortingOption      | ```SortingOption``` | sort options to apply to pagination results |
| isNoMinResultLimit | ```boolean```       | whether to have a pagination minimum value  |

#### Output Example

```ts
PaginatedResult {
      pageNo: 1,
      pageSize: 20,
      totalItemNo: 100,
      totalPageNo: 5,
      items: [
        {
          _id: new ObjectId("632a8d60d7b81199ad39d674"),
          email: 'Tony14@yahoo.com',
          name: 'Hermann80',
          age: 71
        },
        {
          _id: new ObjectId("632a8d60d7b81199ad39d673"),
          email: 'Romaine_Wilkinson@gmail.com',
          name: 'Agustina7',
          age: 58
        },
        ...
      ]
    }
```

## 🔑 License

[MIT](https://github.com/careerday-jobs/node-paginator/LICENSE)
