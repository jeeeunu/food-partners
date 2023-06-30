// header 메뉴 분기점
if (document.cookie.includes('Authorization')) {
  if (location.pathname === '/') {
    document.querySelector('.right-btn-box').innerHTML = `
      <a href="html/create-post-page.html">글 작성</a>
      <a href="html/my-page.html" class="btn-my-page">마이페이지</a>
    `;
  } else {
    document.querySelector('.right-btn-box').innerHTML = `
      <a href="create-post-page.html">글 작성</a>
      <a href="my-page.html" class="btn-my-page">마이페이지</a>
    `;
  }
} else {
  console.log('게스트 입니다.');
  if (location.pathname === '/') {
    document.querySelector('.right-btn-box').innerHTML = `
      <a href="html/sign-in.html" class="btn-login">로그인</a>
    `;
  } else {
    document.querySelector('.right-btn-box').innerHTML = `
      <a href="sign-in.html" class="btn-login">로그인</a>
    `;
  }
}

// 프로필 이미지 미리보기
function setThumbnail(event) {
  const reader = new FileReader();
  const previewWrap = document.querySelector('.profile-img-wrap');

  reader.onload = function (event) {
    previewWrap.innerHTML = '';
    const img = document.createElement('img');
    img.src = event.target.result;
    previewWrap.appendChild(img);
  };

  reader.readAsDataURL(event.target.files[0]);
}

// 이벤트 위임(동적요소 적용위해 추가)
document.addEventListener('change', function (event) {
  if (event.target && event.target.matches('#profile-img')) {
    setThumbnail(event);
  }
});
