function fetchData(url, options) {
  return fetch(url, options)
    .then((response) => {
      if (!response.ok) {
        throw new Error('마이페이지 회원정보조회 실패');
      }
      return response.json();
    })
    .catch((error) => {
      console.error(error);
    });
}

const fetchAndDisplayUser = () => {
  fetchData('/api/userInfo').then((data) => {
    const userInformation = document.querySelector('main');
    userInformation.innerHTML = '';
    const { email, profilepicture, nickname, birth, gender, address, introduce, updatedAt } = data.result;

    if (profilepicture === null) {
      profilepicture = '<img src="../images/default_img.png" alt="기본 프로필 이미지">';
    }

    const profilepicturePath = profilepicture.replace(/\\/g, '/');

    userInformation.innerHTML = `
    <h2>마이 페이지</h2>
    <div class="profile-img-wrap">
      <img src="/${profilepicturePath}" alt="">
    </div>
    <div class="input-wrap">
      <label for="">이메일(ID)</label>
      <p>${email}</p>
    </div>
    <div class="input-wrap">
      <label for="">닉네임</label>
      <p>${nickname}</p>
    </div>
    <div class="input-wrap">
      <label for="">생년월일</label>
      <p>${birth}</p>
    </div>
    <div class="input-wrap">
      <label for="">한 줄 소개</label>
      <p>${introduce}</p>
    </div>
    <div class="input-wrap">
      <label for="">성별</label>
      <p>${gender}</p>
    </div>
    <a href="../index.html" class="btn-primary btn-full">내 작성 글 보러가기</a>
    <div class="btn-wrap">
      <a href="./sign-up.html" class="btn-primary border">회원 수정</a>
      <a href="" class="btn-primary border">회원 탈퇴</a>
    </div>
    `;
  });
};


window.onload = fetchAndDisplayUser;
