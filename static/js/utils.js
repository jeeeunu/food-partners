function fetchData(url, options) {
  return fetch(url, options)
    .then((response) => {
      if (!response.ok) {
        return response.json().then((data) => {
          throw new Error(data.errorMessage);
        });
      }
      return response.json();
    })
    .catch((error) => {
      console.error(error);
    });
}

export { fetchData };
