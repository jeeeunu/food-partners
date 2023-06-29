// header 메뉴 분기점
if (document.cookie.includes("Authorization")) {
  if (location.pathname === "/") {
    document.querySelector('.right-btn-box').innerHTML = `
      <a href="html/create-content.html">작성</a>
      <a href="html/my-page.html" class="btn-my-page">마이페이지</a>
    `;
  } else {
    document.querySelector('.right-btn-box').innerHTML = `
      <a href="create-content.html">작성</a>
      <a href="my-page.html" class="btn-my-page">마이페이지</a>
    `;
  }
} else {
  console.log("게스트 입니다.");
  if (location.pathname === "/") {
    document.querySelector('.right-btn-box').innerHTML = `
      <a href="html/create-content.html">작성</a>
      <a href="html/sign-in.html" class="btn-login">로그인</a>
    `;
  } else {
    document.querySelector('.right-btn-box').innerHTML = `
      <a href="create-content.html">작성</a>
      <a href="sign-in.html" class="btn-login">로그인</a>
    `;
  }
}
