export const toggleModal = e => {
  console.log(e.target);
  const id = e.target.id;
  if (e.target.className === 'modal') {
    e.target.style.display = 'none';
  } else if (e.target.className === 'button') {
    handleBookmark(e.target.id);
    if (e.target.innerHTML === 'Add Bookmark') {
      e.target.innerHTML = 'Remove Bookmark';
    } else {
      e.target.innerHTML = 'Add Bookmark';
    }
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
