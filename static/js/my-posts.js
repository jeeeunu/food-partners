import { fetchData } from './utils.js';

//  내 작성글 조회
const myPosts = () => {
  fetchData('/api/myPost', { method: 'GET' }).then((data) => {
    const postList = document.querySelector('#default_post_img');
    postList.innerHTML = '';
    const { title, createdAt, updatedAt } = data.result;

    // 이미지
    let profileImage = '';
    if (profilepicture) {
      profileImage = `<img src="/${profilepicture.replace(/\\/g, '/')}" alt="프로필 이미지">`;
    } else {
      profileImage = `<img src="../images/default_img.png" alt="기본 프로필 이미지">`;
    }

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
  });
};

myPosts();
