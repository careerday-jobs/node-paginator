import { faker } from '@faker-js/faker';

export interface IUser {
  email: string;
  name: string;
  age: number;
}
export type IUsers = IUser[];

export const generateMockUser = (): IUser => {
  const user: IUser = {
    email: faker.internet.email(),
    name: faker.internet.userName(),
    age: faker.datatype.number({
      min: 8,
      max: 99,
    }),
  };

  return user;
};

export const generateMockUsers = (): IUsers => {
  let users: IUsers = [];

  Array.from({ length: 100 }).forEach(() => {
    users.push(generateMockUser());
  });

  return users;
};
