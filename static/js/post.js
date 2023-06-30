// 게시글 작성
const btnPostSubmit = document.querySelector('#create-post-submit');
if (btnPostSubmit !== null) {
  btnPostSubmit.addEventListener('click', async () => {
    const postImgFile = document.querySelector('#create-post-img').files[0];
    const postTitle = document.querySelector('#create-post-title').value;
    const postContent = document.querySelector('#create-post-content').value;

    console.log(postImgFile, postTitle, postContent);

    const formData = new FormData();
    formData.append('postImg', postImgFile);
    formData.append('postTitle', postTitle);
    formData.append('postContent', postContent);

    try {
      const response = await fetch('/api/posts', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error(response.statusText);
      }

      const data = await response.json();
      alert('게시글을 작성하였습니다.');
      window.location.href = '/html/index.html';
    } catch (error) {
      alert('게시글 작성에 실패하였습니다.');
    }
  });
}

// 게시물 조회
getPosts();
async function getPosts() {
  try {
    const response = await fetch('/api/posts', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const data = await response.json();
    if (response.ok) {
      const posts = data.posts;
      // 게시물 목록을 받아와서 원하는 동작을 수행할 수 있습니다.
      // 예: 게시물 카드 생성, 리스트 표시 등
      createCards(posts);
    } else {
      const errorMessage = data.message;
      console.log(errorMessage);
    }
  } catch (error) {
    console.error(error);
  }
}

// 내 게시물 조회

// 게시글 삭제
const btnPostDelete = document.querySelector('#detail-page-delete');

const fetchData = { data: 'fetch에서 받은 데이터' };

fetch('/api/posts', {
  method: 'POST',
  body: fetchData,
});

// 카드 생성
const createCards = (posts) => {
  const cardList = document.querySelector('#card-list');
  cardList.innerHTML = ''; // 카드 담는 리스트 비우기
  // 데이터 map 돌려서 html 템플릿 담음
  const htmlArray = posts.map((post) => {
    const { img: postImg, title: postTitle, content: postContent } = post; // 프로퍼티 확인 필요
    return `<ol class="card">
              <ul>
                ${postImg}
              </ul>
              <ul>
                ${postTitle}
              </ul>
              <ul>
                ${postContent}
              </ul>
            </ol>`;
  });
  cardList.innerHTML = htmlArray.join(''); // 데이터 담은 htmlArray를 문자열로 합쳐서 card-list에 넣음
};
