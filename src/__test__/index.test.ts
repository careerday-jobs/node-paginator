import mongoose from 'mongoose';

import { mongoDBConfig } from './config';
import { UserModel } from './user.model';
import { generateMockUsers, IUsers } from './user.mock';
import { NodePaginator } from '..';

let mongooseInstance: typeof mongoose;
let db: any;

beforeAll(async () => {
  mongooseInstance = await mongoose.connect(mongoDBConfig.url);
  db = mongooseInstance.connection.db;
});

afterAll(async () => {
  await db.dropDatabase();
  await mongooseInstance.connection.close();
});

describe('[NodePaginator] paginateByMongoose()', () => {
  it('테스트용 Mock User를 100개 삽입한다.', async () => {
    const usersCollection = db.collection('users');
    const mockUsers: IUsers = generateMockUsers();

    await usersCollection.insertMany(mockUsers);

    const mockUsersCount = mockUsers.length;
    const usersCollectionCount = await usersCollection.countDocuments();
    expect(usersCollectionCount).toEqual(mockUsersCount);
  });

  let pageNoParam: number;
  let pageSizeParam: number;
  let expectedTotalItemNo: number;
  let expectedTotalPageNo: number;

  it('pageNo는 1, pageSize는 20으로 설정해 paginateByMongoose()를 호출한다. Mock User가 100개 삽입되어 있으므로 결과로 totalItemNo는 100, totalPageNo는 5가 반환되어야 한다.', async () => {
    pageNoParam = 1;
    pageSizeParam = 20;
    expectedTotalItemNo = 100;
    expectedTotalPageNo = 5;

    const result = await NodePaginator.paginateByMongoose({
      pageNoParam,
      pageSizeParam,
      model: UserModel,
      filteredFields: [],
    });

    expect(result.totalItemNo).toEqual(expectedTotalItemNo);
    expect(result.totalPageNo).toEqual(expectedTotalPageNo);
  });
});
