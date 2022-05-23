db.createUser({
  user: 'silas',
  pwd: '123456',
  roles: [
    {
      role: 'readWrite',
      db: 'myshoppinglist',
    },
  ],
});
