import Player from '@vimeo/player';
import throttle from 'lodash.throttle';

const iframe = document.querySelector('iframe');
const player = new Player(iframe);
const CURRENT_TIME_STORAGE_KEY = "videoplayer-current-time";
const currentTime = localStorage.getItem(CURRENT_TIME_STORAGE_KEY)
    ? localStorage.getItem(CURRENT_TIME_STORAGE_KEY)
    : 0;
  
const onSaveCurrentPlayTime = function (data) {
    localStorage.setItem(CURRENT_TIME_STORAGE_KEY, data.seconds);
};

player.setCurrentTime(currentTime);

player.on('timeupdate', throttle(onSaveCurrentPlayTime, 1000));

