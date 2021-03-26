const search = document.getElementById('search');
const image = document.getElementById('image');
const video = document.getElementById('video');
const description = document.getElementById('description');
const results = document.getElementById('results');
const title = document.getElementById('title');

const toggleButton = document.getElementById('toggle-button');
const sliderText = document.getElementById('slider-text');
const range = document.getElementById('range');

const menuImg = document.getElementById('menuImg');
const menubtn = document.getElementById('menubtn');
const menu = document.getElementById('menu');
const menuClose = document.getElementById('menu-close');

const screenToggle = document.getElementById('screenToggle');
const slideshowToggle = document.getElementById('slideshow-toggle-button');
// slideshowToggle.checked = false;

const welcome = document.getElementById('welcome');

let subsInfo = [['itookapicture', '']];
let counter = 0;
let errorCounter = 0;

let reset = false;

const basicSubreddits = `
<div class="result">
<img src="https://styles.redditmedia.com/t5_2r1tc/styles/communityIcon_p1gzakhq6y201.png" style="width: 1.5rem; height: 1.5rem; margin-right: 0.5rem;">/r/itookapicture/</div>
<div class="result">
<img src="https://styles.redditmedia.com/t5_2qh1o/styles/communityIcon_6fzlk8ukx6s51.jpg" style="width: 1.5rem; height: 1.5rem; margin-right: 0.5rem;">/r/aww/</div>
<div class="result">
<img src="https://b.thumbs.redditmedia.com/VoZlOfOxgNGkqayUrmGI96XuSOGKVT-MVI4WK-CXP3o.png" style="width: 1.5rem; height: 1.5rem; margin-right: 0.5rem;">/r/art/</div>
<div class="result">
<img src="https://b.thumbs.redditmedia.com/8cMVsK9DKU-HJSM2WEG9mAGHIgd8-cEsnpJNJlB5NPw.png" style="width: 1.5rem; height: 1.5rem; margin-right: 0.5rem;">/r/cozyplaces/</div>
<div class="result">
<img src="https://a.thumbs.redditmedia.com/bDWcvO6mkX1TIcTnrO-N-5QJPUaWaq6nnQFel3kywD8.png" style="width: 1.5rem; height: 1.5rem; margin-right: 0.5rem;">/r/food/</div>
`;

results.innerHTML = basicSubreddits;

function openMenu() {
  window.removeEventListener('click', clickHandler);
  menubtn.children[0].src =
    'https://www.flaticon.com/svg/static/icons/svg/57/57165.svg';
  menu.style.right = 0;
  menuClose.style.left = 0;
}

function closeMenu() {
  window.addEventListener('click', clickHandler);
  menubtn.children[0].src = './icon.png';
  menu.style.right = '-80vw';
  menuClose.style.left = '-20vw';
}

function toggleMenu() {
  menu.style.right === '0px' ? closeMenu() : openMenu();
}

menubtn.addEventListener('click', toggleMenu);
menuClose.addEventListener('click', closeMenu);

function toggleNightMode() {
  if (toggleButton.checked) {
    image.style.filter = `brightness(${range.value / 100})`;
    video.style.filter = `brightness(${range.value / 100})`;
    search.style.opacity = range.value / 100;
    description.style.opacity = range.value / 100;
    menuImg.style.opacity = range.value / 100 + 0.12;
    range.classList.toggle('hidden');
    sliderText.classList.toggle('hidden');
  } else {
    image.style.filter = 'brightness(1)';
    video.style.filter = 'brightness(1)';
    search.style.opacity = 1;
    description.style.opacity = 1;
    menuImg.style.opacity = 1;
    range.classList.toggle('hidden');
    sliderText.classList.toggle('hidden');
  }
}

function toggleSlideShow() {
  if (slideshowToggle.checked) {
    // // console.log('start slide show');
    try {
      if (slideshow !== null) {
        clearInterval(slideshow);
      }
    } catch (e) {}
    slideshow = setInterval(function () {
      downloadNextPost(url);
    }, 5000);
  } else {
    // // console.log('stop slide show');
    clearInterval(slideshow);
  }
}

slideshowToggle.addEventListener('click', toggleSlideShow);

range.oninput = function () {
  // // console.log(`brightness(${range.value / 100})`);
  image.style.filter = `brightness(${range.value / 100})`;
  video.style.filter = `brightness(${range.value / 100})`;
  search.style.opacity = range.value / 100;
  description.style.opacity = range.value / 100;
  menuImg.style.opacity = range.value / 100 + 0.12;
};

toggleButton.addEventListener('click', toggleNightMode);

image.classList.remove('hidden');

const startUrl = `https://www.reddit.com/r/itookapicture/hot.json?`;
let posts = [];
let preloadURLs = [];
let preloading;

let url = startUrl;
(function () {
  downloadNextPost(startUrl);
})();

function closeWelcomeScreen() {
  welcome.style.display = 'none';
  search.classList.remove('hidden');
  image.classList.remove('blurred');
  description.classList.remove('hidden');
  menubtn.classList.remove('hidden');

  setTimeout(() => {
    downloadNextPosts(startUrl);
  }, 1000);
}

function downloadNextPost(url, after = subsInfo[subsInfo.length - 1][1]) {
  // title.innerText = new Array(title.innerText.length + 1).join('\u2060');
  // title.innerText = '----->';

  fetch(`${url}&limit=1&after=${after}`)
    .then((response) => response.json())
    .then((data) => {
      data = data.data;
      after = data.after;
      subsInfo[subsInfo.length - 1][1] = after;
      // console.log(subsInfo);

      let post = data.children[0].data;

      if (
        post.preview.images[0] != null ||
        post.domain.includes('imgur') ||
        post.url.includes('jpg')
      ) {
        if (!post.url.includes('youtu')) {
          posts.push(post);
          // showPost(post);

          if (posts.length > 1) {
            console.log(posts.length);
            image.classList.add('loading');
            video.classList.add('loading');
          }
          showPost(post);
        } else {
          // console.log('next');
          downloadNextPost(url);
        }
      }
    })
    .catch((e) => {
      errorCounter++;
      console.log(e);
      if (errorCounter < 10) {
        // console.log(url);
        downloadNextPost(url);
      } else {
        errorCounter = 0;
        subsInfo.pop();
        downloadNextPost(url);
        reset = true;
        // alert('Please, try another subreddit!');
        // reset = true;
        // console.log('else', urls);
      }
    });
}

let afterDownloadNextPosts = '';
const limit = 35;
let nextURLS = [];
let index = 0;

function downloadNextPosts(url) {
  // // console.log(url);
  nextURLS = [];
  let nextPosts = new XMLHttpRequest();
  nextPosts.open(
    'GET',
    `${url}&limit=${limit}&after=${afterDownloadNextPosts}`
  );
  nextPosts.responseType = 'json';
  nextPosts.send();
  nextPosts.onerror = function (e) {
    // // console.log(e);
  };
  nextPosts.onload = function (data) {
    // debugger;
    if (
      data.currentTarget.readyState === 4 &&
      data.currentTarget.status === 200
    ) {
      let nextPostsData = nextPosts.response.data.children;
      // // console.log(nextPostsData.response);
      afterDownloadNextPosts = nextPosts.response.data.after;
      nextPostsData.forEach((p) => {
        try {
          nextURLS.push(
            p.data.preview.images[0].resolutions[
              p.data.preview.images[0].resolutions.length - 1
            ].url.replace(/amp;/gi, '')
          );
        } catch (e) {
          // console.log('skip');
        }
      });
      index = 0;
      function preload() {
        // // console.log('preloading!');
        let cachedImg = new Image();
        try {
          // // console.log('try', index);
          cachedImg.src = nextURLS[index];
          index++;
        } catch (e) {
          console.log(e);
        }
        if (index !== 0 && index % 25 === 0) {
          clearInterval(preloading);
        }
      }
      if (nextURLS.length) {
        // // console.log(nextURLS.length);
        preloading = setInterval(preload, 1000);
      } else {
        clearInterval(preloading);
        downloadNextPosts(url);
      }
    } else {
      clearInterval(preloading);
      downloadNextPosts(url);
    }
  };
}

function showPost(post) {
  try {
    image.classList.remove('hidden');
    image.src = post.preview.images[0].resolutions[
      post.preview.images[0].resolutions.length - 1
    ].url.replace(/amp;/gi, '');
    video.classList.add('hidden');

    image.onload = function () {
      video.classList.remove('loading');
      image.classList.remove('loading');
      title.innerText = post['title'].trim();
      a.href = `https://www.reddit.com${post['permalink']}`;
    };

    if (post.crosspost_parent != null) {
      post = post.crosspost_parent_list[0];

      if (post.url.includes('gfycat')) {
        image.src = post.secure_media.oembed.thumbnail_url;
      } else if (post.url.includes('redgif')) {
        image.classList.add('hidden');
        video.src = post.preview.reddit_video_preview.fallback_url;
        video.classList.remove('hidden');
      } else if (post.url.includes('redd') && post.url.includes('.gif')) {
        image.src = post.url;
      } else {
        if (post.url.includes('.gifv') && !post.url.includes('redd')) {
          image.classList.add('hidden');
          video.src = post.url.replace('gifv', 'mp4');
          video.classList.remove('hidden');
        } else if (post.url.includes('.gif') && !post.url.includes('redd')) {
          image.classList.add('hidden');
          video.src = post.url.replace('gif', 'mp4');
          video.classList.remove('hidden');
        } else {
          if (post.media.reddit_video != null) {
            image.classList.add('hidden');
            video.src = post.media.reddit_video.fallback_url;
            video.classList.remove('hidden');
          } else {
            video.classList.add('hidden');
          }
        }
      }
    } else {
      if (post.url.includes('gfycat')) {
        image.src = post.secure_media.oembed.thumbnail_url;
      } else if (post.url.includes('redgif')) {
        image.classList.add('hidden');
        video.src = post.preview.reddit_video_preview.fallback_url;
        video.classList.remove('hidden');
      } else if (post.url.includes('redd') && post.url.includes('.gif')) {
        image.src = post.url;
      } else {
        if (post.url.includes('.gifv') && !post.url.includes('redd')) {
          image.classList.add('hidden');
          video.src = post.url.replace('gifv', 'mp4');
          video.classList.remove('hidden');
        } else if (post.url.includes('.gif') && !post.url.includes('redd')) {
          image.classList.add('hidden');
          video.src = post.url.replace('gif', 'mp4');
          video.classList.remove('hidden');
        } else {
          if (post.media.reddit_video != null) {
            image.classList.add('hidden');
            video.src = post.media.reddit_video.fallback_url;
            video.classList.remove('hidden');
          } else {
            video.classList.add('hidden');
          }
        }
      }
    }
  } catch (e) {
    // console.log('next');
  }
  // showPost(post);
}

// function showPost(post) {
//   try {
//     image.src = post.preview.images[0].resolutions[
//       post.preview.images[0].resolutions.length - 1
//     ].url.replace(/amp;/gi, '');
//     video.classList.add('hidden');

//     if (post.crosspost_parent != null) {
//       // // console.log("post.crosspost_parent")
//       post = post.crosspost_parent_list[0];

//       if (post.url.includes('gfycat')) {
//         // // console.log(post.secure_media.oembed.thumbnail_url)
//         image.src = post.secure_media.oembed.thumbnail_url;
//       } else if (post.url.includes('redgif')) {
//         video.src = post.preview.reddit_video_preview.fallback_url;
//         video.classList.remove('hidden');
//       } else if (post.url.includes('redd') && post.url.includes('.gif')) {
//         image.src = post.url;
//         // video.classList.remove('hidden');
//       } else {
//         if (post.url.includes('.gifv') && !post.url.includes('redd')) {
//           video.src = post.url.replace('gifv', 'mp4');
//           video.classList.remove('hidden');
//         } else if (post.url.includes('.gif') && !post.url.includes('redd')) {
//           video.src = post.url.replace('gif', 'mp4');
//           video.classList.remove('hidden');
//         } else {
//           if (post.media.reddit_video != null) {
//             video.src = post.media.reddit_video.fallback_url;
//             video.classList.remove('hidden');
//           } else {
//             video.classList.add('hidden');
//           }
//         }
//       }
//     } else {
//       if (post.url.includes('gfycat')) {
//         // // console.log(post.secure_media.oembed.thumbnail_url)
//         image.src = post.secure_media.oembed.thumbnail_url;
//       } else if (post.url.includes('redgif')) {
//         video.src = post.preview.reddit_video_preview.fallback_url;
//         video.classList.remove('hidden');
//       } else if (post.url.includes('redd') && post.url.includes('.gif')) {
//         image.src = post.url;
//       } else {
//         if (post.url.includes('.gifv') && !post.url.includes('redd')) {
//           video.src = post.url.replace('gifv', 'mp4');
//           video.classList.remove('hidden');
//         } else if (post.url.includes('.gif') && !post.url.includes('redd')) {
//           video.src = post.url.replace('gif', 'mp4');
//           video.classList.remove('hidden');
//         } else {
//           if (post.media.reddit_video != null) {
//             video.src = post.media.reddit_video.fallback_url;
//             video.classList.remove('hidden');
//           } else {
//             video.classList.add('hidden');
//           }
//         }
//       }
//     }
//   } catch (e) {
//     // console.log('next');
//   }

//   setTimeout(function () {
//     title.innerText = post['title'].trim();
//   }, 20);
//   a.href = `https://www.reddit.com${post['permalink']}`;
// }

async function checkIfSubredditExists(subreddit) {
  // // console.log('check', `https://www.reddit.com/r/${subreddit}/hot.json`);
  let exists = false;
  await fetch(`https://www.reddit.com/r/${subreddit}/hot.json`)
    .then((data) => data.json())
    .then((data) => {
      for (let i = 1; i < 10; i++) {
        try {
          // console.log(data.data.children[i].data.preview.images[0]);
          if (data.data.children[i].data.preview.images[0].resolutions) {
            exists = true;
            break;
          }
        } catch (e) {
          console.log(e);
        }
      }
      if (exists === false) {
        alert('Please, choose another subreddit');
      }
    })
    .catch((e) => {
      // console.log(`${subreddit} doesn't exist!`);
      alert('Please, choose another subreddit');
      exists = false;
    });
  return exists;
}

function searchSubreddits(s) {
  let listOfSubreddits = new XMLHttpRequest();
  listOfSubreddits.open(
    'GET',
    `https://www.reddit.com/api/subreddit_autocomplete_v2.json?query=${s}&raw_json=1&gilding_detail=1`
  );

  listOfSubreddits.responseType = 'json';
  listOfSubreddits.send();

  listOfSubreddits.onerror = function (e) {
    // // console.log(e);
  };

  listOfSubreddits.onload = function () {
    results.innerHTML = '';

    let list = listOfSubreddits.response.data.children;

    list.forEach(function (element) {
      let imageSource = element.data.community_icon
        ? element.data.community_icon
        : element.data.icon_img ||
          `https://b.thumbs.redditmedia.com/8cMVsK9DKU-HJSM2WEG9mAGHIgd8-cEsnpJNJlB5NPw.png`;

      // // console.log(element.data);
      element.data.url == null
        ? null
        : (results.innerHTML += `<div class="result">
        <img src="${imageSource}" style="width: 1.5rem; height: 1.5rem; margin-right: 0.5rem;">
        ${element.data.url} - ${new Intl.NumberFormat().format(
            element.data.subscribers
          )} subscribers</div>`);
    });
  };
}

let y = [];
// let x = [];
let previousTouch = 0;

//  function touchStartHandlerX(e) {

//   previousTouch = e.timeStamp

//   if (e.target.className === 'search') {
//     search.focus();
//     if (results.innerHTML.trim() == '') {
//       results.innerHTML = basicSubreddits;
//     }
//     results.classList.remove('hidden');
//   }

//   if (e.target.className === 'image') {
//     // e.preventDefault();
//     x.push(e.targetTouches[0].clientX);
//     results.classList.add('hidden');
//     // // console.log(url);
//     // if(counter = 0) {  downloadNextPost(url)};
//   }

//   if (e.target.className === 'result') {
//     let sub = e.target.innerText;
//     counter = 0;
//     posts = [];
//     after = '';
//     search.value = '';
//     results.classList.add('hidden');
//     url = `https://www.reddit.com${sub.trim()}hot.json?`;
//     results.innerHTML = '';
//     downloadNextPost(url);
//   }

//   if (e.target.className === 'menubtn') {
//     document.location.reload();
//   }
// }

// function touchMoveHandlerX(e) {
//   x.push(e.targetTouches[0].clientX);

//   // image.style.transform = `translateX(${(x[x.length - 1] - x[0])/5}px)`;
// }

//  function touchEndHandlerX(e) {
//   let delta = x[0] - x[x.length - 1];
//   x = [];

//   if (delta > 0) {
//     getNextPost();
//   } else if (delta < 0) {
//     getPreviousPost();
//   }
// }

async function touchStartHandlerY(e) {
  previousTouch = e.timeStamp;

  if (e.target.className.includes('slider')) {
    return;
  }

  if (e.target.className === 'search') {
    search.focus();
    if (results.innerHTML.trim() == '') {
      results.innerHTML = basicSubreddits;
    }
    results.classList.remove('hidden');
  }

  if (e.target.className === 'image' || e.target.className === 'video') {
    // e.preventDefault();
    y.push(e.targetTouches[0].clientY);
    // x.push(e.targetTouches[0].clientX);
    results.classList.add('hidden');

    // if(counter = 0) {  downloadNextPost(url)};
  }

  // touch
  if (e.target.className === 'result') {
    clearInterval(preloading);
    let sub = e.target.innerText
      .split('-')[0]
      .trim()
      .replace(/[^a-z\d\_\s]+/gi, '')
      .substring(1);

    results.classList.add('hidden');

    try {
      if (slideshow !== null) {
        clearInterval(slideshow);
      }
    } catch (e) {}
    slideshowToggle.checked = false;

    let subredditExists = await checkIfSubredditExists(sub);

    if (subredditExists) {
      results.innerHTML = '';
      search.value = '';
      title.innerText = `loading r/${sub}/`;
      // image.src = './icon.png';
      counter = 0;
      posts = [];
      after = '';

      errorCounter = 0;

      url = `https://www.reddit.com/r/${sub}/hot.json?`;
      subsInfo.push([sub, '']);
      // console.log(subsInfo);

      downloadNextPost(url);
      downloadNextPosts(url);
      postNum = 0;
    }
  }

  if (e.target.className === 'menubtn') {
    // document.location.reload();
  }
}

function touchMoveHandlerY(e) {
  if (e.target.className.includes('slider')) {
    return;
  }

  y.push(e.targetTouches[0].clientY);
}

function touchEndHandlerY(e) {
  let deltaY = y[0] - y[y.length - 1];

  y = [];

  if (deltaY > 0) {
    getNextPost();
  } else if (deltaY < 0) {
    getPreviousPost();
  }
}

let postNum = 0;

function getNextPost() {
  if (counter > 0) {
    counter--;
    showPost(posts[posts.length - counter - 1]);
  } else {
    postNum++;
    // console.log(postNum);
    if (postNum % 25 === 0) {
      downloadNextPosts(url);
    }
    downloadNextPost(url);
  }
}

function getPreviousPost() {
  // image.style.opacity = "0.5";
  counter++;
  if (counter > posts.length - 1) {
    counter = posts.length - 1;
  }
  // console.log(counter)
  showPost(posts[posts.length - counter - 1]);
}

// window.addEventListener('touchstart', touchStartHandlerX);
// window.addEventListener('touchmove', touchMoveHandlerX);
// window.addEventListener('touchend', touchEndHandlerX);

window.addEventListener('touchstart', touchStartHandlerY);
window.addEventListener('touchmove', touchMoveHandlerY);
// window.addEventListener('touchmove', touchMoveHandlerX);
window.addEventListener('touchend', touchEndHandlerY);

welcome.addEventListener('click', closeWelcomeScreen);

// Mouse Wheel Scroll
// window.addEventListener('wheel', wheelScroll);

search.addEventListener('input', function (e) {
  searchSubreddits(e.target.value);
  results.classList.remove('hidden');
});

window.addEventListener('click', clickHandler);

window.addEventListener('keydown', keyboardButtonsHandler);

async function keyboardButtonsHandler(e) {
  if (e.which == 13 || e.keyCode == 13 || e.key === 'Enter') {
    if (search.value.trim()) {
      let res = search.value.trim();
      console.log(res);
      if (res[0] === '/' && res[1] === 'r' && res[2] === '/') {
        res = res.slice(2);
      } else if (res[0] === 'r' && res[1] === '/') {
        res = res.slice(1);
      } else if (res[0] === '/') {
        res = res.slice(0);
      }

      clearInterval(preloading);

      results.classList.add('hidden');

      try {
        if (slideshow !== null) {
          clearInterval(slideshow);
        }
      } catch (e) {}
      slideshowToggle.checked = false;

      let sub = res.replace(/[^a-z\d\_\s\+]+/gi, '');
      let subredditExists = await checkIfSubredditExists(sub);

      if (subredditExists) {
        search.value = '';
        // image.src = './icon.png';

        title.innerText = `loading r/${sub}/`;
        counter = 0;
        posts = [];
        after = '';
        errorCounter = 0;

        url = `https://www.reddit.com/r/${sub}/hot.json?`;
        subsInfo.push([sub, '']);
        // console.log(subsInfo);
        // debugger;

        downloadNextPost(url);
        downloadNextPosts(url);
        postNum = 0;
      }
    }
  } else if (
    e.which == 39 ||
    e.keyCode == 39 ||
    e.key === 'ArrowDown' ||
    e.which == 40 ||
    e.keyCode == 40 ||
    e.key === 'ArrowRight'
  ) {
    if (counter > 0) {
      counter--;
      showPost(posts[posts.length - counter - 1]);
    } else {
      toggleSlideShow();
    }
  } else if (
    e.which == 37 ||
    e.keyCode == 37 ||
    e.key === 'ArrowLeft' ||
    e.which == 38 ||
    e.keyCode == 38 ||
    e.key === 'ArrowUp'
  ) {
    counter++;
    if (counter > posts.length - 1) {
      counter = posts.length - 1;
    }
    // // console.log(counter)
    showPost(posts[posts.length - counter - 1]);
  }
}

async function clickHandler(e) {
  if (e.target.className === 'search') {
    search.focus();
    if (results.innerHTML.trim() == '') {
      results.innerHTML = basicSubreddits;
    }
    results.classList.remove('hidden');
  }

  if (e.target.className === 'image') {
    results.classList.add('hidden');
  }

  // mouse click
  if (e.target.className === 'result') {
    clearInterval(preloading);
    let sub = e.target.innerText
      .split('-')[0]
      .trim()
      .replace(/[^a-z\d\_\s]+/gi, '')
      .substring(1);

    results.classList.add('hidden');
    results.innerHTML = '';
    slideshowToggle.checked = false;

    try {
      if (slideshow !== null) {
        clearInterval(slideshow);
      }
    } catch (e) {}

    let subredditExists = await checkIfSubredditExists(sub);

    if (subredditExists) {
      search.value = '';
      // image.src = './icon.png';
      title.innerText = `loading r/${sub}/`;
      counter = 0;
      posts = [];
      after = '';
      errorCounter = 0;

      url = `https://www.reddit.com/r/${sub}/hot.json?`;
      subsInfo.push([sub, '']);
      // console.log(subsInfo);

      downloadNextPost(url);
      downloadNextPosts(url);
      postNum = 0;
    }
  }
}

function wheelScroll(e) {
  // // console.log(e)
  if (e.deltaY > 0) {
    window.removeEventListener('wheel', wheelScroll);
    setTimeout(function () {
      window.addEventListener('wheel', wheelScroll);
    }, 300);
    getNextPost();
  } else if (e.deltaY < 0) {
    window.removeEventListener('wheel', wheelScroll);
    setTimeout(function () {
      window.addEventListener('wheel', wheelScroll);
    }, 300);
    getPreviousPost();
  }
}

// Mouse Wheel Scroll
window.addEventListener('wheel', wheelScroll);

function scaleChange(e) {
  if (image.style.objectFit != 'contain') {
    image.style.objectFit = 'contain';
    video.style.objectFit = 'contain';
  } else {
    image.style.objectFit = 'cover';
    video.style.objectFit = 'cover';
  }
}

image.addEventListener('dblclick', scaleChange);
video.addEventListener('dblclick', scaleChange);

// image.addEventListener('mousemove', function(e){
//   image.style.objectPosition = `${(((e.clientX/window.innerWidth))*100).toFixed(5)}%`
//   video.style.objectPosition = `${(((e.clientX/window.innerWidth))*100).toFixed(5)}%`
// })

// video.addEventListener('mousemove', function(e){
//   image.style.objectPosition = `${(((e.clientX/window.innerWidth))*100).toFixed(5)}%`
//   video.style.objectPosition = `${(((e.clientX/window.innerWidth))*100).toFixed(5)}%`
// })
