const url = window.location.href;
const parts = url.split('/');
const lastPart = parts[parts.length - 1];
console.log(lastPart);

document.querySelector('#btn-edit-submit').addEventListener('click', async () => {
  console.log('찍는중');

  const title = document.querySelector('#edit-post-title').value;
  const content = document.querySelector('#edit-post-content').value;
  const profilePictureFile = document.querySelector('#edit-post-img').files[0];

  console.log(profilePictureFile);

  const formData = new FormData();
  formData.append('profilePicture', profilePictureFile);
  formData.append('title', title);
  formData.append('content', content);
  console.log(formData);
  try {
    const response = await fetch(`/api/posts/${lastPart}`, {
      method: 'PUT',
      body: formData,
    });

    const data = await response.json();

    if (response.ok) {
      alert('수정되었습니다');
      window.location.href = `/api/posts/${lastPart}`;
    } else {
      const { errorMessage } = data;
      alert(errorMessage);
    }
  } catch (error) {
    alert('수정에 실패했습니다. 다시 시도해주세요.');
  }
});
