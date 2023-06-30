import { fetchData } from './utils.js';

//  내 작성글 조회
const myPosts = () => {
  fetchData('/api/myPost', { method: 'GET' }).then((response) => {
    const { data } = response;
    const thumbnail = data;
    console.log(thumbnail);
    const postList = document.querySelector('.card-container');
    postList.innerHTML = '';

    data.forEach((content) => {
      // 이미지
      let profileImage = '';
      if (content.thumbnail) {
        profileImage = `<img src="/${content.thumbnail.replace(/\\/g, '/')}" alt="프로필 이미지">`;
      } else {
        profileImage = `<img src="../images/default_post_img.png" alt="기본 프로필 이미지" style="display: block; width: 40%; object-fit: contain; margin: 0 auto">`;
      }
      const contentHtml = `
        <div class="card-item">
          <a href="">
            <div class="img-wrap">
              ${profileImage}
            </div>
            <div class="text-wrap">
              <strong>${content.title}</strong>
              <p>${content.content}</p>
            </div>
          </a>
        </div>
      `;
      postList.innerHTML += contentHtml;
    });
  });
};

myPosts();
