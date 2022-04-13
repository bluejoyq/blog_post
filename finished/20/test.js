
const asyncWork = () => {
  return new Promise((resolve, reject) => {
    doSomeWorkCanFail((res,err)=> {
      if(res){
        resolve(res);
      }
      else{
        reject(err);
      }
    });
  });
};

asyncWork()
  .then(sucessCallback)
  .catch(failureCallback)
  .finally(cleanUpWork)