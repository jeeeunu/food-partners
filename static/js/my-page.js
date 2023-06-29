function fetchData(url, options) {
  return fetch(url, options)
    .then(response => {
      if (!response.ok) {
        throw new Error('마이페이지 회원정보조회 실패');
      }
      return response.json();
    })
    .catch(error => {
      console.error(error);
    });
}

const fetchAndDisplayUser = () => {
  fetchData('/api/userInfo', {
  })
    .then(data => {
      const userInformation = document.querySelector('main');
      userInformation.innerHTML = `
            <p>Email: ${data.data.email}</p>
            <p>Profile Picture: ${data.data.profilepicture}</p>
            <p>Nickname: ${data.data.nickname}</p>
            <p>Birth: ${data.data.birth}</p>
            <p>Gender: ${data.data.gender}</p>
            <p>Address: ${data.data.address}</p>
            <p>Introduce: ${data.data.introduce}</p>
            <p>Last Updated At: ${data.data.updatedAt}</p>
          `;
    });
}

window.onload = fetchAndDisplayUser;