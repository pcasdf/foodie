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
  } else if (id) {
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
