<div align="center">
  <img src="./assets/images/logo-symbol-careerday.png"  width="100" />
  
  <h1>node-paginator</h1>

  <p>Simple and easy-to-use pagination library for Mongoose (Node.js)</p>

  [![npm version](https://badgen.net/npm/v/@careerday-jobs/node-paginator)](https://www.npmjs.com/package/@careerday-jobs/node-paginator)
  [![npm downloads](https://badgen.net/npm/dm/@careerday-jobs/node-paginator)](https://www.npmjs.com/package/@careerday-jobs/node-paginator)
  [![official website](https://img.shields.io/badge/website-careerday-blue)](https://careerday.jobs)
</div>

## 📚 Why node-paginator?

Every web developer should work on pagination at some point. We were using Mongo DB and node.js, 
and surprised by the fact that there is no single package we can just install and start using.
If you're using Mongoose on Node.js and going to work on pagination? Then *node-paginator* is worth trying.

## 📦 Install

```bash
npm install @careerday-jobs/node-paginator
```

## 🪄 Basic Usage

```ts
import { NodePaginator } from '@careerday-jobs/node-paginator';

// Mongoose model you're going to look up
import { UserModel } from '/src/models/user.model.ts';

const paginatedResult = await NodePaginator.paginateByMongoose({
  pageNoParam: 1, // required
  pageSizeParam: 10, // required
  model: UserModel, // required
});

const { pageNo, pageSize, totalItemNo, totalPageNo, items } = paginatedResult;
```

## 🪄 Advanced Usage
1. Use **[regex](https://www.mongodb.com/docs/manual/reference/operator/query/regex/)** feature provided by MongoDB for simple search which is useful enough.

```ts
import { NodePaginator } from '@careerday-jobs/node-paginator';

import { UserModel } from '/src/models/user.model.ts';

const paginatedResult = await NodePaginator.paginateByMongoose({
  pageNoParam: 1, // required
  pageSizeParam: 10, // required
  model: UserModel, // required
  filteredFields: [ 
    'username', 
    'email', 
    'address'
  ], // field names you are trying to look up
  filter: 'michael' // search keyword
});

const { pageNo, pageSize, totalItemNo, totalPageNo, items } = paginatedResult;
```

2. Add and queries and or queries you want to add on

```ts
import { NodePaginator } from '@careerday-jobs/node-paginator';

import { UserModel } from '/src/models/user.model.ts';

const paginatedResult = await NodePaginator.paginateByMongoose({
  pageNoParam: 1,
  pageSizeParam: 10,
  model: UserModel,
  filteredFields: [ 
    'username', 
  ],
  filter: 'michael',
  orQuery: { email: 'sample@gmail.com'}, // or query.  (should get user of which email address is 'sample@gmail.com', even if username does not include 'michael')
  andQuery: { company: 'google' } // and query (username should include 'michael' and he/she is working for google)
});

const { pageNo, pageSize, totalItemNo, totalPageNo, items } = paginatedResult;
```

3. Putting sort option is possible. (Default is ```{ _id: -1 }```)

```ts
import { NodePaginator } from '@careerday-jobs/node-paginator';

// Mongoose model you're going to look up
import { UserModel } from '/src/models/user.model.ts';

const paginatedResult = await NodePaginator.paginateByMongoose({
  pageNoParam: 1,
  pageSizeParam: 10,
  model: UserModel,
  filteredFields: [
    'username',
  ],
  filter: 'michael',
  orQuery: { email: 'sample@gmail.com'},
  andQuery: { company: 'google' },
  sortingOption: { createdAt: 1 } // show the oldest one first
});

const { pageNo, pageSize, totalItemNo, totalPageNo, items } = paginatedResult;
```

4. Default maximum size of page is 100. But if you want it to exceed the limit, you can put one more parameter at the end.
 
```ts
import { NodePaginator } from '@careerday-jobs/node-paginator';

// Mongoose model you're going to look up
import { UserModel } from '/src/models/user.model.ts';

const paginatedResult = await NodePaginator.paginateByMongoose({
  pageNoParam: 1,
  pageSizeParam: 1000, // PLEASE DON'T DO THIS.....BUT SOMETIMES YOU NEED TO DO IT
  model: UserModel,
  filteredFields: [
    'username',
  ],
  filter: 'michael',
  orQuery: { email: 'sample@gmail.com'},
  andQuery: { company: 'google' },
  sortingOption: { createdAt: 1 },
  isNoMinResultLimit: true // If you want the page size to exceed 100, you should set this true
});

const { pageNo, pageSize, totalItemNo, totalPageNo, items } = paginatedResult;
```


#### Input Parameters

| parameter                      | type                | description                                                         |
|:-------------------------------| :------------------ |:--------------------------------------------------------------------|
| pageNoParam ```(required)```   | ```number```        | current page number                                                 |
| pageSizeParam ```(required)``` | ```numer```         | maximum number of data to display on a page                         |
| model ```(required)```         | ```Model<any>```    | Mongoose model instance you want to look up                         |
| filteredFields                 | ```string[]```      | field names of the model you want to look up                        |
| filter                         | ```string```        | search keyword                                                      |
| orQuery                        | ```FilterQuery```   | custom OR query                                                     |
| andQuery                       | ```FilterQuery```   | custom AND query                                                    |
| sortingOption                  | ```SortingOption``` | sort options applied to pagination results. (default: ```{ _id: -1 }```) |
| isNoMinResultLimit             | ```boolean```       | If page size can exceed 100 (default: false)                        |

#### Output Example

```
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

## ⏳ Pagination Library On Frontend

Looking for a library which supports pagination on frontend? Why don't you check out [react-paginator](https://www.npmjs.com/package/@careerday-jobs/react-paginator)? 
It's way more efficient when you try both packages!


## Contributors

[//]: contributor-faces

<a href="https://github.com/kunhokimcareerday"><img src="https://avatars.githubusercontent.com/u/89354853?v=4" title="Kunho Kim" width="80" height="80"> @kunhokimcareerday
</a>

<a href="https://github.com/starseeder0309"><img src="https://avatars.githubusercontent.com/u/42955669?v=4" title="starseeder0309" width="80" height="80"> @starseeder0309 </a>

[//]: contributor-faces

## 🔑 License

[MIT](https://github.com/careerday-jobs/node-paginator/LICENSE) @ 2022 CareerDay
