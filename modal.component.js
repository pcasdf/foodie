export const toggleModal = e => {
  const id = e.target.id;
  const item = e.target;

  if (item.className === 'modal') {
    item.style.display = 'none';
  } else if (item.className === 'button') {
    handleBookmark(item.id);

    if (item.innerText === 'Add Bookmark') {
      item.innerText = 'Remove Bookmark';
    } else {
      item.innerText = 'Add Bookmark';
    }
  } else if (item.className === 'go-next') {
    const state = JSON.parse(localStorage.getItem('current-state'));
    const next = state[state.indexOf(id) + 1];

    const currentModal = document.getElementById(`${id}-modal`);
    const nextModal = document.getElementById(`${next}-modal`);

    currentModal.style.display = 'none';
    nextModal.style.display = 'block';
  } else if (item.className === 'go-prev') {
    const state = JSON.parse(localStorage.getItem('current-state'));
    const prev = state[state.indexOf(id) - 1];

    const currentModal = document.getElementById(`${id}-modal`);
    const prevModal = document.getElementById(`${prev}-modal`);

    currentModal.style.display = 'none';
    prevModal.style.display = 'block';
  } else if (id) {
    localStorage.setItem('current-modal', id);
    const modal = document.getElementById(`${id}-modal`);

    if (modal) {
      modal.style.display = 'block';
    }
  }
};

const handleBookmark = id => {
  const prevData = localStorage.getItem('bookmarks');
  let newData = [];
  if (prevData) {
    newData = JSON.parse(prevData);
  }
  if (newData.includes(id)) {
    newData = newData.filter(item => item !== id);
  } else {
    newData.push(id);
  }
  localStorage.setItem('bookmarks', JSON.stringify(newData));
};
