// 회원가입
const btnSignUpSubmit = document.querySelector("#sign-up-submit");
if (btnSignUpSubmit !== null) {
  btnSignUpSubmit.addEventListener("click", async () => {
    const email = document.querySelector("#sign-up-email").value;
    const password = document.querySelector("#sign-up-pw").value;
    const confirm = document.querySelector("#sign-up-pw-confirm").value;
    const nickname = document.querySelector("#sign-up-nickname").value;
    const birth = document.querySelector("#sign-up-birth").value;
    const introduce = document.querySelector("#sign-up-info").value;
    const genderInput = document.querySelector('input[type="radio"][name="gender"]:checked');
    const gender = genderInput ? genderInput.id : null;
    const address = document.querySelector("#sign-up-address").value;
    const profilePictureFile = document.querySelector('#profile-img').files[0];

    const formData = new FormData();
    formData.append("profilePicture", profilePictureFile);
    formData.append("email", email);
    formData.append("nickname", nickname);
    formData.append("password", password);
    formData.append("confirm", confirm);
    formData.append("birth", birth);
    formData.append("introduce", introduce);
    formData.append("gender", gender);
    formData.append("address", address);


    try {
      const response = await fetch("/api/signup", {
        method: "POST",
        body: formData
      });


      if (!response.ok) {
        throw new Error(response.statusText);
      }

      const data = await response.json();
      alert("회원가입이 되었습니다!");
      window.location.href = "/html/sign-in.html";
    } catch (error) {
      alert("회원가입에 실패했습니다. 다시 시도해주세요.");
    }
  });
}

// 로그인
const btnSignInSubmit = document.querySelector("#btn-sign-in");
if (btnSignInSubmit !== null) {
  btnSignInSubmit.addEventListener("click", async () => {

    const email = document.querySelector("#sign-in-email").value;
    const password = document.querySelector("#sign-in-pw").value;

    try {
      // API
      const response = await fetch("/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          password: password
        }),
      });

      const data = await response.json();
      if (response.ok) {
        const token = data.token;
        console.log(`${token}, 로그인 성공"`);
        alert("로그인 되었습니다.")
        window.location.href = "/"
      } else {
        const errorMessage = data.errorMessage;
        console.log(errorMessage);
      }
    } catch (error) {
      console.error(error);
    }
  });
}


// 토큰/쿠키확인
const getCookieValue = (name) => {
  const cookies = document.cookie.split("; ");
  for (let cookie of cookies) {
    const [cookieName, cookieValue] = cookie.split("=");
    if (cookieName === name) {
      return cookieValue;
    }
  }
  return "";
};

const token = getCookieValue("Authorization");
console.log(token);

