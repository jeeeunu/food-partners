// header 메뉴 분기점
if (document.cookie.includes("Authorization")) {
  console.log("로그인 되어있습니다.")
  document.querySelector(".btn-login").classList.add("hidden");
  document.querySelector(".btn-my-page").classList.remove("hidden");

} else {
  console.log("게스트 입니다.")
  document.querySelector(".btn-login").classList.remove("hidden");
  document.querySelector(".btn-my-page").classList.add("hidden");
}


