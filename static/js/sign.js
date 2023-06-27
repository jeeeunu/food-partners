
fetch("example.com/api/data")
  .then(response => response.json())
  .then(data => {
    // 서버로부터의 응답을 처리하는 코드
    console.log(data);
  })
  .catch(error => {
    // 에러 처리 코드
    console.error(error);
  });
