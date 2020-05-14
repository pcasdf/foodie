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
    const data = JSON.parse(localStorage.getItem(item.id));
    console.log(data);
  } else if (item.className === 'go-next') {
    const state = localStorage.getItem('foodie-state').split(',');
    const next = state[state.indexOf(id) + 1];

    const currentModal = document.getElementById(`${id}-modal`);
    const nextModal = document.getElementById(`${next}-modal`);

    currentModal.style.display = 'none';
    nextModal.style.display = 'block';
  } else if (item.className === 'go-prev') {
    const state = localStorage.getItem('foodie-state').split(',');
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
  const prevData = localStorage.getItem('foodie-bookmarks');

  if (!prevData.includes(id)) {
    localStorage.setItem('foodie-bookmarks', `${prevData},${id}`);
  } else {
    localStorage.setItem(
      'foodie-bookmarks',
      prevData.split(',').filter(item => item !== id)
    );
  }
};
