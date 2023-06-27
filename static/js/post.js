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

// 게시글 상세 페이지
// 로그인 한 상태에서 수정, 삭제 가능
document.querySelector('#create-post-submit');
``;

// 게시글 작성
document.querySelector('#create-post-submit');
document.querySelector('#create-post-img').value;
document.querySelector('#create-post-title').value;
document.querySelector('#create-post-content').value;

// 게시글 수정, 새로고침
document.querySelector('#create-post-submit');
document.querySelector('#create-post-img').value;
document.querySelector('#create-post-title').value;
document.querySelector('#create-post-content').value;

// 게시글 삭제, 새로고침
document.querySelector('#detail-page-delete');
