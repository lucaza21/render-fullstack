export const mockLogin = (username, password, perfil) =>
  new Promise(function(resolve, rejected) {
    setTimeout(() => {
      if (username === "ana" && password === "123" && perfil==="alumno") {
        console.log('entro al if')
        resolve(
          JSON.parse(
            `{"token" : "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYxODg0YmJiM2Q0YTRkNDk1ZDYyNGJhYyIsImVtYWlsIjoibHVjYXNmZXJuYW5kZXphcmFnb25AZ21haWwuY29tIiwiaWF0IjoxNjM2MzIyMzA3LCJleHAiOjE2MzYzMjU5MDd9.yxy7uKWXJx5rY8znRBTg5182llyH8Rs9R8C6_SM4LIg" }`
          )
        )
        console.log(resolve.token)
      } else if (username === "juan" && password === "123" && perfil==="profesor"){
        console.log('entro al if')
        resolve(
          JSON.parse(
            `{"token" : "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYxODg0YmJiM2Q0YTRkNDk1ZDYyNGJhYyIsImVtYWlsIjoibHVjYXNmZXJuYW5kZXphcmFnb25AZ21haWwuY29tIiwiaWF0IjoxNjM2MzIyMzA3LCJleHAiOjE2MzYzMjU5MDd9.yxy7uKWXJx5rY8znRBTg5182llyH8Rs9R8C6_SM4LIg" }`
          )
        )
        console.log(resolve.token)
      } else {
        rejected(new Unauthorized())
      }
    }, 2000);
  })
  
  export class Unauthorized{}