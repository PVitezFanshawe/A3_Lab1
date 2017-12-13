var video = {
  //variables at the top as usual
  videoPlayer : document.querySelector('video'),
  vidThumbs : document.querySelector('.vid-thumb'),
  volumeIndecator : document.querySelector('.vol-indicator'),

  volOn(){
    video.videoPlayer.muted = false;
    video.volumeIndecator.classList.replace('fa-volume-off', 'fa-volume-up');
  },

  volOff(){
    video.videoPlayer.muted = true;
    video.volumeIndecator.classList.replace('fa-volume-up', 'fa-volume-off');
  },

  popOverlay(){
    let overlay = document.querySelector('.vid-overlay');
    overlay.classList.add('show-overlay');
    overlay.querySelector('i').addEventListener('click', video.replayVideo);
  },
  replayVideo(){
    video.videoPlayer.currentTime = 0;
    video.videoPlayer.play();

    let overlay = document.querySelector('.vid-overlay');
    overlay.classList.remove('show-overlay');
  },
fetchVideoThumbs(){
  //do a DB call with the fetch api
  let url = "./includes/functions.php?getVideos=true";

  fetch(url) //use the fetch api
  .then((resp) => resp.json())//resp comes back as json, convert into plain object
  .then((data) => {
    video.loadVideoThumbs(data);
    })
  .catch(function(error){
    console.log(error);
  });
},

  loadVideoThumbs(data){
  //make sure this works
  // debugger;
  let thumbHolder = document.querySelector('.video-thumbs');

  data.forEach(thumb => {
    let docFrag =
    `<li class="vid-thumb" role="button" data-videopath="${thumb.path}">
      <img src="images/${thumb.placeholder}" alt="mini commercial" class="responsive">
    </li>`;

    thumbHolder.innerHTML += docFrag;
  });

  thumbHolder.querySelectorAll('li').forEach((thumb) => thumb.addEventListener('click', video.loadNewVideo));
},

loadNewVideo(){
  let videoPath = "video/" + this.dataset.videopath;

  video.videoPlayer.src = videoPath;
  video.videoplayer.load();
  video.videoPlayer.play();

  video.volOn();

  let overlay = document.querySelector('.vid-overlay');
  overlay.classList.remove('show-overlay');
},

  init(){
    console.log('added a video module');
    video.videoPlayer.addEventListener('mouseover', video.volOn);
    video.videoPlayer.addEventListener('mouseout', video.volOff);
    video.videoPlayer.addEventListener('ended', video.popOverlay);0

    video.fetchVideoThumbs();
  }
}

video.init();
