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


    try {
      const response = await fetch("/api/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          nickname: nickname,
          password: password,
          confirm: confirm,
          birth: birth,
          introduce: introduce,
          gender: gender,
          address: address
        }),
      });

      if (!response.ok) {
        throw new Error(response.statusText);
      }

      const data = await response.json();
      alert("회원가입이 되었습니다!");
      window.location.href = "/html/sign-in.html";
    } catch (error) {
      console.error(error);
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

    // API
    const response = await fetch("/api/auth", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({

      }),
    });

    const data = await response.json();
    alert("로그인 되었습니다!")
  })
}
