export const createVideoCard = item => {
  const card = `
    <div class='video-card' id='${item.id.videoId}'>

      <div class='video-img' id='${item.id.videoId}'>
        <img src='${item.snippet.thumbnails.medium.url}' id='${item.id.videoId}'>
      </div>

      <div class='video-details' id='${item.id.videoId}'>
        <h3>${item.snippet.title}</h3>
        <p>${item.snippet.description}</p>
      </div>

      <div class='modal' id='${item.id.videoId}-modal'>
        <div class='modal-content-video'>
          <iframe class='video-player' src='https://www.youtube.com/embed/${item.id.videoId}' />
        </div>
      </div>
      
    </div>
  `;

  return card;
};
