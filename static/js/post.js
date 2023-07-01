// 게시글 작성
const btnPostSubmit = document.querySelector('#create-post-submit');
const btnPostDelete = document.querySelector('#detail-page-delete');
if (btnPostSubmit !== null) {
  btnPostSubmit.addEventListener('click', async () => {
    const postImgFile = document.querySelector('#post-upload-img').files[0];
    const postTitle = document.querySelector('#create-post-title').value;
    const postContent = document.querySelector('#create-post-content').value;

    const formData = new FormData();
    formData.append('profilePicture', postImgFile);
    formData.append('title', postTitle);
    formData.append('content', postContent);

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
      window.location.href = '/';
    } catch (error) {
      alert('게시글 작성에 실패하였습니다.');
    }
  });
}

// 게시물 조회
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

// 게시글 삭제
async function postDelete(postId) {
  const confirmDelete = confirm('정말로 삭제하시겠습니까?');
  if (confirmDelete === true) {
    try {
      const response = await fetch(`/posts/${postId}`, {
        method: 'DELETE',
      });

      const data = await response.json();
      if (response.ok) {
        alert('삭제처리 되었습니다 감사합니다.');
        window.location.href = '/';
      } else {
        const { errorMessage } = data;
        alert(errorMessage);
      }
    } catch (error) {
      alert('삭제에 실패했습니다. 다시 시도해주세요.');
    }
  }
}

exports.renderFunc = postDelete();
