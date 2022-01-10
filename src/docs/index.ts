export const SuccessLoginResponseExample = {
  id: 1,
  email: 'johndoe@gmail.com',
  password: null,
  token: 'Aez...',
};

export const SuccessRegisterResponseExample = {
  name: 'John',
  age: 20,
  email: 'johndoe@gmail.com',
  password: null,
  telephone: '+110000000000',
  gender: 'Male',
  id: 1,
  createdAt: '2022-01-09T22:36:33.478Z',
  token: 'Aez...',
};

export const UnAuthorizedResponseExample = {
  message: 'Jwt token not found',
  error: 'Unauthorized',
};

export const UsersResponseExample = [
  {
    id: 1,
    name: 'John',
    age: 15,
    email: 'john.doe@gmail.com',
    telephone: '+110000000000',
    gender: 'Male',
  },
];

export const MeResponseExample = {
  id: 1,
  name: 'John',
  age: 15,
  email: 'john.doe@gmail.com',
  telephone: '+110000000000',
  gender: 'Male',
};

export const UserByIdResponseExample = {
  id: 1,
  name: 'John',
  age: 15,
  email: 'john.doe@gmail.com',
  telephone: '+110000000000',
  gender: 'Male',
  socketId: 'Esw23...',
};

export const ChatsResponseExample = [
  {
    id: 1,
    name: 'Test',
    users: [
      {
        id: 4,
        name: 'John',
        age: 15,
        email: 'john.doe@gmail.com',
        telephone: '+110000000000',
        gender: 'Male',
      },
    ],
    lastMessage: {
      id: 1,
      text: 'Hello',
      createdAt: '2022-01-08T21:21:15.850Z',
      from: {
        id: 1,
        name: 'John',
        age: 15,
        email: 'john.doe@gmail.com',
        telephone: '+110000000000',
        gender: 'Male',
      },
    },
  },
];

export const ChatByIdResponseExample = {
  id: 1,
  name: 'Test',
  users: [
    {
      id: 4,
      name: 'John',
      age: 15,
      email: 'john.doe@gmail.com',
      telephone: '+110000000000',
      gender: 'Male',
    },
  ],
  lastMessage: {
    id: 1,
    text: 'Hello',
    createdAt: '2022-01-08T21:21:15.850Z',
    from: {
      id: 1,
      name: 'John',
      age: 15,
      email: 'john.doe@gmail.com',
      telephone: '+110000000000',
      gender: 'Male',
    },
  },
};

export const CallsResponseExample = [
  {
    id: 1,
    name: 'Test',
    start: '2022-01-04',
    end: '2022-01-06',
    status: 'Scheduled',
  },
];
