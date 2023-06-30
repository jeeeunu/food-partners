import { fetchData } from './utils.js';

// 마이페이지 수정정보 조회
const myPageInfo = () => {
  fetchData('/api/userInfo', { method: 'GET' }).then((data) => {
    const userInformation = document.querySelector('#my-page-edit-form');
    userInformation.innerHTML = '';
    const { email, profilepicture, nickname, birth, gender, address, introduce, password } = data.result;

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
      genderData = ` <input type="radio" id="M" name="gender" checked><label for="M">남</label>
      <input type="radio" id="F" name="gender"><label for="F">여</label>`;
    } else if (gender === 'F') {
      genderData = ` <input type="radio" id="M" name="gender"><label for="M">남</label>
      <input type="radio" id="F" name="gender" checked><label for="F">여</label>`;
    }
    userInformation.innerHTML = `
        <div class="form-inner">
          <div class="input-wrap">
          <label for="" class="required-icon">이메일(ID)</label>
          <p>${email}</p>
          </div>
          <div class="input-wrap">
            <label for="" class="required-icon">패스워드</label>
            <input type="password" id="edit-pw" value="${password}">
          </div>
          <div class="input-wrap">
            <label for="" class="required-icon">패스워드 확인</label>
            <input type="password" id="edit-pw-confirm" value="${password}">
          </div>
          <div class="input-wrap">
            <label for="" class="required-icon">닉네임</label>
            <input type="text" id="edit-nickname" value="${nickname}">
          </div>
          <div class="input-wrap">
            <label for="" class="required-icon">생년월일</label>
            <input type="text" id="edit-birth" value="${birth}">
          </div>
          <div class="input-wrap">
            <label for="" class="required-icon">한 줄 소개</label>
            <input type="text" id="edit-info" value="${introduce}">
          </div>
          <div class="input-wrap">
            <label for="">성별</label>
            <div class="radio-wrap">
             ${genderData}
            </div>
          </div>
          <div class="input-wrap">
            <label for="">주소</label>
            <input type="text" id="edit-address" value="${address}">
          </div>
          <button id="edit-submit" class="btn-primary btn-full">수정하기</button>
        </div>
      </div>
      <div class="profile-wrap">
        <div class="profile-img-wrap">${profileImage}</div>
        <input type="file" id="profile-img">
      </div>
    `;
  });
};

window.onload = myPageInfo;

document.addEventListener('click', async (event) => {
  // 마이페이지 회원정보 수정하기
  if (event.target.matches('#edit-submit')) {
    console.log('찍는중');

    const password = document.querySelector('#edit-pw').value;
    const confirm = document.querySelector('#edit-pw-confirm').value;
    const nickname = document.querySelector('#edit-nickname').value;
    const birth = document.querySelector('#edit-birth').value;
    const introduce = document.querySelector('#edit-info').value;
    const genderInput = document.querySelector('input[type="radio"][name="gender"]:checked');
    const gender = genderInput ? genderInput.id : null;
    const address = document.querySelector('#edit-address').value;
    const profilePictureFile = document.querySelector('#profile-img').files[0];

    const formData = new FormData();
    formData.append('profilePicture', profilePictureFile);
    // formData.append("email", email);
    formData.append('nickname', nickname);
    formData.append('password', password);
    formData.append('confirm', confirm);
    formData.append('birth', birth);
    formData.append('introduce', introduce);
    formData.append('gender', gender);
    formData.append('address', address);

    try {
      const response = await fetch('/api/userInfo', {
        method: 'PUT',
        body: formData,
      });

      const data = await response.json();

      if (response.ok) {
        alert('수정되었습니다');
        window.location.href = '/';
      } else {
        const { errorMessage } = data;
        alert(errorMessage);
      }
    } catch (error) {
      alert('수정에 실패했습니다. 다시 시도해주세요.');
    }
  }
});
