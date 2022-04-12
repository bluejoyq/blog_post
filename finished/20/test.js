const axios = require('axios');
const URL = 'localhost:3000';

axios.get(`${URL}/api/hello`).then((res)=>{
  console.log(res);
});

console.log("A");