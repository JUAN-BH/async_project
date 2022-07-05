const API = `https://youtube-v31.p.rapidapi.com/search?channelId=UCv1xjGi8KibuoOK8StRFCWg&part=snippet%2Cid&order=date&maxResults=10`;
const APISpotify = `https://spotify23.p.rapidapi.com/user_profile/?id=juanmita_bh&playlistLimit=10&artistLimit=10`;

const content = null || document.getElementById("content");
const contentSpotify = null || document.getElementById("contentSpotify");

const options = {
  method: "GET",
  headers: {
    "X-RapidAPI-Key": "57be9319ebmsh663cc9b4c17c821p1f1099jsneea5309eaf01", //se supone que debemos de tenr cuidado con esta key
    "X-RapidAPI-Host": "youtube-v31.p.rapidapi.com",
  },
};

const optionsSpotify = {
  method: "GET",
  headers: {
    "X-RapidAPI-Key": "57be9319ebmsh663cc9b4c17c821p1f1099jsneea5309eaf01",
    "X-RapidAPI-Host": "spotify23.p.rapidapi.com",
  },
};

async function fetchData(urlApi, optionsInfo) {
  const response = await fetch(urlApi, optionsInfo);
  const data = await response.json();
  return data;
}

(async () => {
  try {
    const videos = await fetchData(API, options);
    let view = `
    ${videos.items
      .map(
        (video) => `
    <div class="group relative">
            <div
              class="w-full bg-gray-200 aspect-w-1 aspect-h-1 rounded-md overflow-hidden group-hover:opacity-75 lg:aspect-none"
            >
              <img src="${video.snippet.thumbnails.high.url}" alt="${video.snippet.description}" class="w-full" />
            </div>
            <div class="mt-4 flex justify-between">
              <h3 class="text-sm text-gray-700">
                <span aria-hidden="true" class="absolute inset-0"></span>
                ${video.snippet.title}
              </h3>
            </div>
    </div>
    `
      )
      .slice(0, 4)
      .join("")}`;
    content.innerHTML = view;

    const playlists = await fetchData(APISpotify, optionsSpotify);
    console.log(playlists.public_playlists);
    let viewSpotify = `
    ${playlists.public_playlists
      .map(
        (playlist) =>
          `
        <div class="flex flex-col items-center">
        <a href="${playlist.uri}">
            <div
              class="w-44 h-44 rounded-full flex justify-center items-center m-2 shadow-md  hover:shadow-lg hover:shadow-green-300  
              bg-green-500 bg-[url('/src/assets/img/play.png')] bg-center bg-cover bg-[length:100px_100px] bg-no-repeat"
            >
            
            </div>
        </a>
            <h3 class="text-xl font-bold text-gray-700"> ${playlist.name} </h3>
        </div>
        `
      )
      .join("")}`;
    contentSpotify.innerHTML = viewSpotify;
  } catch (error) {
    console.log(error);
  }
})();
