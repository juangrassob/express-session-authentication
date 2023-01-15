import bcrypt from 'bcrypt';

interface User {
  email: string;
  passwordHash: string;
  roles: string[];
  id: string;
}

const users: User[] = [
  {
    email: 'test@test.com',
    passwordHash: bcrypt.hashSync('password1', 10),
    roles: ['ADMIN'],
    id: '69205188-b597-4cf3-aace-13f78735dc5f',
  },
  {
    email: 'test2@test.com',
    passwordHash: bcrypt.hashSync('password1', 10),
    roles: ['ACCOUNT-MANAGER'],
    id: '87444c80-958e-4bbf-b55c-830837575fbe',
  },
  {
    email: 'test3@test.com',
    passwordHash: bcrypt.hashSync('password1', 10),
    roles: ['ADMIN'],
    id: '684733c0-dbd3-4640-877c-82c1d08fae3b',
  },
];

export async function findUserByEmail(
  email: string
): Promise<User | undefined> {
  const user = users.find((user) => user.email === email);

  return user;
}
