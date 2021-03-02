const bcrypt = require('bcryptjs');

const dummyUsers = [{
  name: 'thomas',
  email: 'thomas@example.com',
  password: bcrypt.hashSync('123456'),
  image: './images/b1f0e680702e811aa8ba333cb19c0e0ea95e8e31.png',
},
{
  name: 'santiago',
  email: 'santiago@example.com',
  password: bcrypt.hashSync('123456'),
  image: './images/775db5e79c5294846949f1f55059b53317f51e30.png',
},
{
  name: 'chiumbo',
  email: 'chiumbo@example.com',
  password: bcrypt.hashSync('123456'),
  image: './images/8bc2e13b8ab74765fd57f0880f318eed1c3fb001.png',
},
{
  name: 'hualing',
  email: 'hualing@example.com',
  password: bcrypt.hashSync('123456'),
  image: './images/6c4faa7d65bc24221c3d369a8889928158daede4.png',
},
{
  name: 'ashanti',
  email: 'ashanti@example.com',
  password: bcrypt.hashSync('123456'),
  image: './images/68f55f7799df6c8078a874cfe0a61a5e6e9e1687.png',
},
{
  name: 'julia',
  email: 'julia@example.com',
  password: bcrypt.hashSync('123456'),
  image: './images/d9fc84a0d1d545d77e78aaad39c20c11d3355074.png',
},
{
  name: 'cheng',
  email: 'cheng@example.com',
  password: bcrypt.hashSync('123456'),
  image: './images/9e2972c07afac45a8b03f5be3d0a796abe2e566e.png',
},
];

module.exports = dummyUsers;
