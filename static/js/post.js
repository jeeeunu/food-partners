// 헤더
// 로그인 하면 로그인 버튼 마이 페이지로 변경

// 뉴스피드
let data = [
  {
    img: `<a href="../static/html/detail-post.html">
  <img src="https://via.placeholder.com/500x400.jpg" alt="임시 이미지" />
</a>`,
    title: 'title',
    content: 'content',
  },
];

let tempHtml = '';
for (let { img, title, content } of data) {
  let cardHtml = `<ol class="card">
                    <ul>
                      ${img}
                    </ul>
                    <ul>
                      ${title}
                    </ul>
                    <ul>
                      ${content}
                    </ul>
                  </ol>`;
  tempHtml += cardHtml;
}
let cardList = document.querySelector('#card-list');
cardList.innerHTML = tempHtml;

``;
// 내가 작성한 글
``;

// // 게시글 상세 페이지
// // 로그인 한 상태에서 수정, 삭제 가능
// document.querySelector('#create-post-submit');
// ``;

// // 게시글 작성
// document.querySelector('#create-post-submit');
// document.querySelector('#create-post-img').value;
// document.querySelector('#create-post-title').value;
// document.querySelector('#create-post-content').value;

// // 게시글 수정, 새로고침
// document.querySelector('#create-post-submit');
// document.querySelector('#create-post-img').value;
// document.querySelector('#create-post-title').value;
// document.querySelector('#create-post-content').value;

// // 게시글 삭제, 새로고침
// document.querySelector('#detail-page-delete');

fetch('/posts')
  .then((response) => response.json())
  .then((data) => {
    // 서버로부터 받은 데이터 처리
    console.log(data); // 예시로 콘솔에 출력
    // 여기서 원하는 동작을 수행하면 됩니다.
  })
  .catch((error) => {
    console.error('Error:', error);
  });

// 게시물 조회
const getPosts = async () => {
  try {
    const response = await fetch('/api/posts', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const data = await response.json();
    if (response.ok) {
      const posts = data.result;
      // 게시물 목록을 받아와서 원하는 동작을 수행할 수 있습니다.
      // 예: 게시물 카드 생성, 리스트 표시 등
      console.log(posts);
    } else {
      const errorMessage = data.message;
      console.log(errorMessage);
    }
  } catch (error) {
    console.error(error);
  }
};

// TODO : 카드 만들기
const createCards = (dataArr) => {
  const cardList = document.querySelector('.card-list');
  cardList.innerHTML = ''; // 카드 담는 리스트 비우기
  // 데이터 map 돌려서 html 템플릿 담음
  const htmlArray = dataArr.map((post) => {
    const { id: postId, backdrop_path: postImage, title: postName, overview: postOverview, vote_average: postAverage } = post;
    return `
            <div class="card-item" data-id="${postId}" onClick="cardIDAlert('${postId}')">
                <div class="img-wrap">
                    <img src="https://image.tmdb.org/t/p/w500${postImage}" alt="">
                </div>
                <strong class="post-name">${postName}</strong>
                <p class="post-text">${postOverview}</p>
                <p class="post-averate">${postAverage}</p>
            </div>
        `;
  });
  cardList.innerHTML = htmlArray.join(''); // 데이터 담은 htmlArray를 문자열로 합쳐서 card-list에 넣음
};
