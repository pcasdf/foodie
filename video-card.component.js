export const createVideoCard = item => {
  const { id, snippet } = item;
  const card = `
    <div class='video-card' id='${id.videoId}'>
      <div class='video-img' id='${id.videoId}'>
        <img src='${snippet.thumbnails.medium.url}' id='${id.videoId}'>
      </div>

      <div class='video-details' id='${id.videoId}'>
        <h3>${snippet.title}</h3>
        <p>${snippet.description}</p>
      </div>

      <div class='modal' id='${id.videoId}-modal'>
        <div class='go-prev' id='${id.videoId}'><</div>
        <div class='go-next' id='${id.videoId}'>></div>

        <div class='modal-content-video'>
          <iframe class='video-player' src='https://www.youtube.com/embed/${id.videoId}' />
        </div>
      </div>
      
    </div>
  `;

  return card;
};
