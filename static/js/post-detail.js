// 게시물 상세 조회
async function getPosts() {
  try {
    const response = await fetch('/api/posts', {
      method: 'GET',
      headers: {},
    });
    const data = await response.json();
    if (response.ok) {
      const posts = data.data;

      const cardList = document.querySelector('#card-list');
      cardList.innerHTML = ''; // 카드 담는 리스트 비우기
      // 데이터 map 돌려서 html 템플릿 담음

      const htmlArray = posts.map((post) => {
        const { img: postImg, title: title, content: content } = post; // 프로퍼티 확인 필요
        return `<ol class="card">
              <ul>
                ${postImg}
              </ul>
              <ul>
                ${title}
              </ul>
              <ul>
                ${content}
              </ul>
            </ol>`;
      });

      cardList.innerHTML = htmlArray.join(''); // 데이터 담은 htmlArray를 문자열로 합쳐서 card-list에 넣음
    } else {
      const errorMessage = data.message;
      console.log(errorMessage);
    }
  } catch (error) {
    console.error(error);
  }
}

getPosts();
