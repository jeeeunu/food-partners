import { fetchData } from './utils.js';

//  내 작성글 조회
const myPosts = () => {
  fetchData('/api/posts', { method: 'GET' }).then((response) => {
    const { data } = response;
    const thumbnail = data;
    console.log(thumbnail);
    const postList = document.querySelector('.card-list');
    postList.innerHTML = '';

    data.forEach((content) => {
      // 이미지
      let profileImage = '';
      if (content.thumbnail) {
        profileImage = `<img src="/${content.thumbnail.replace(/\\/g, '/')}" alt="프로필 이미지">`;
      } else {
        profileImage = `<img src="../images/default_post_img.png" alt="기본 프로필 이미지" style="display: block; width: 40%; object-fit: contain; margin: 0 auto">`;
      }

      // 날짜
      const postCreatedAt = new Date(content.createdAt);
      const options = { year: 'numeric', month: 'long', day: 'numeric' };
      const formatDate = postCreatedAt.toLocaleString('ko-KR', options);

      const contentHtml = `
        <div class="card-item">
          <a href="api/posts/${content.postId}">
            <div class="img-wrap">
              ${profileImage}
            </div>
            <div class="text-wrap">
              <strong>${content.title}</strong>
              <p>${content.content}</p>
              <p class="post-date">${formatDate}</p>
            </div>
          </a>
        </div>
      `;
      postList.innerHTML += contentHtml;
    });
  });
};

myPosts();
