console.log("my-page-detail.js 연결")
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

// 마이페이지 회원정보 조회
const fetchAndDisplayUser = () => {
  fetchData('/api/userInfo').then((data) => {
    const userInformation = document.querySelector('#my-page-form');
    userInformation.innerHTML = '';
    const { email, profilepicture, nickname, birth, gender, address, introduce } = data.result;

    // 이미지
    let profileImage = '';
    if (profilepicture) {
      profileImage = `<img src="/${profilepicture.replace(/\\/g, '/')}" alt="프로필 이미지">`;
    } else {
      profileImage = `<img src="../images/default_img.png" alt="기본 프로필 이미지">`;
    }

    // 성별
    let genderData = '';
    if (gender === 'M') {
      genderData = `👦 남자`;
    } else if (gender === 'F') {
      genderData = `👩‍🦰 여자 `;
    }
    userInformation.innerHTML = `
      <h2>마이 페이지</h2>
      <div class="profile-img-wrap">
        ${profileImage}
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
        <p>${genderData}</p>
      </div>
      <div class="input-wrap">
      <label for="">주소</label>
      <p>${address}</p>
    </div>
      <a href="../index.html" class="btn-primary btn-full">내 작성 글 보러가기</a>
      <div class="btn-wrap">
        <a href="./my-page-edit.html" class="btn-primary border">회원 수정</a>
        <button id="btn-logout" class="btn-primary border">로그아웃</button>
        <button id="btn-delete" class="btn-primary border red">회원 탈퇴</button>
      </div>
    `;
  });
};

window.onload = fetchAndDisplayUser;

// 로그아웃
document.addEventListener('click', async (event) => {
  if (event.target.id === "btn-logout") {
    try {
      const response = fetch("/api/logout", {
        method: "DELETE",
      });
      alert("로그아웃이 완료되었습니다.");
      window.location.href = "/";
    } catch (error) {
      console.error("로그아웃 오류:", error);
    }
  }

  // 회원 탈퇴하기
  if (event.target.matches('#btn-delete')) {
    console.log('hey')
    try {
      const response = await fetch('/api/userInfo', {
        method: 'DELETE',
      });

      const data = await response.json();
      alert('삭제되었습니다');
      window.location.href = '/';
    } catch (error) {
      alert('삭제에 실패했습니다. 다시 시도해주세요.');
    }
  }

});

