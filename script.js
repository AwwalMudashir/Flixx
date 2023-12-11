// console.log(window.location.pathname)

const global = {
  currentPage: window.location.pathname,
  search: {
      term: '',
      type: '',
      page: 1,
      totalPages: 1,
      totalResults: 0,
  },
  api:{
      apiKey : "cf6cec46637de8da83f897899254309c",
      apiUrl : 'https://api.themoviedb.org/3/',
  },
};



// display popular movies
async function displayPopularMovies(){
  const {results} = await fetchAPIData('movie/popular');
  console.log(results)

  results.forEach((movie) => {
      const div = document.createElement('div');
      div.classList.add('card');
      div.innerHTML = `
      <a href="movie-details.html?id=${movie.id}">
      <img
        src="https://image.tmdb.org/t/p/w500/${movie.poster_path}"
        class="card-img-top"
        alt="${movie.title}"
      />
    </a>
    <div class="card-body">
      <h5 class="card-title">${movie.title}</h5>
      <p class="card-text">
        <small class="text-muted">Release: ${movie.release_date}</small>
      </p>
    </div>
      `;

      document.querySelector("#popular-movies").appendChild(div);
  });

}

async function displayTvShows(){
  const {results} = await fetchAPIData('tv/popular');
  console.log(results)

  results.forEach((tv) => {
      const div = document.createElement('div');
      div.classList.add('card');
      div.innerHTML = `
      <a href="tv-details.html?id=1" class="card-img-top">
        <img
          src="https://image.tmdb.org/t/p/w500/${tv.poster_path}"
          class="card-img-top"
          alt="Show Title"
        />
      </a>
      <div class="card-body">
        <h5 class="card-title">${tv.title}</h5>
        <p class="card-text">
          <small class="text-muted">${tv.first_air_date}</small>
        </p>
      </div>
      `;

      document.querySelector("#popular-movies").appendChild(div);
})};
// display popular movies
async function displayPopularShows(){
  const {results} = await fetchAPIData('tv/popular');
  console.log(results)

  results.forEach((show) => {
      const div = document.createElement('div');
      div.classList.add('card');
      div.innerHTML = `
      <a href="movie-details.html?id=${show.id}">
      <img
        src="https://image.tmdb.org/t/p/w500/${show.poster_path}"
        class="card-img-top"
        alt="${show.name}"
      />
    </a>
    <div class="card-body">
      <h5 class="card-title">${show.name}</h5>
      <p class="card-text">
        <small class="text-muted">Release: ${show.first_air_date}</small>
      </p>
    </div>
      `;

      document.querySelector("#popular-shows").appendChild(div);
  });

}

// display movie details
async function displayMovieDetails(){
  // console.log(window.location.search)
  const movieId = window.location.search.split("=")[1]

  const movie = await fetchAPIData(`movie/${movieId}`);
  console.log(movie);

  // overlay for background image
  displayBackgroundImage('movie',movie.backdrop_path);
  
  const div = document.createElement('div');
  div.innerHTML = `
  <div class="details-top">
  <div>
  ${movie.poster_path ? ` <img
  src="https://image.tmdb.org/t/p/w500/${movie.poster_path}"
  class="card-img-top"
  alt="${movie.title}"
  />`: `<div class="part">${movie.title}</div>`}
 
  </div>
  <div class="overview">
  <h2>"${movie.title}"</h2>
    <p>
      <i class="fas fa-star text-primary"></i>
      ${movie.vote_average.toFixed(1)}/10
    </p>
    <p class="text-muted">Release Date: ${movie.release_date}</p>
    <p>
    ${movie.overview}
    </p>
    <h5>Genres</h5>
    <ul class="list-group">
    ${movie.genres.map((genre) => `<li>${genre.name}</li>`).join("")}
    </ul>
    <a href="${movie.homepage}" target="_blank" class="btn">Visit Movie Homepage</a>
    </div>
    </div>
<div class="details-bottom">
<h2>Movie Info</h2>
<ul>
<li><span class="text-secondary">Budget:</span> ${movie.budget}</li>
<li><span class="text-secondary">Revenue:</span> ${movie.revenue}</li>
<li><span class="text-secondary">Runtime:</span>${movie.runtime} minutes</li>
<li><span class="text-secondary">Status:</span> ${movie.status}</li>
</ul>
<h4>Production Companies</h4>
<div class="list-group">${movie.production_companies.map((comp)=>` ${comp.name},`).join("")}</div>
</div>
`;
document.querySelector('#movie-details').appendChild(div);
}

  async function displayShowDetails() {
    const showId = window.location.search.split('=')[1];
  
    const show = await fetchAPIData(`tv/${showId}`);
  
        //overlay for background image
        displayBackgroundImage('show', show.backdrop_path)
  
    const div = document.createElement('div');
  
    div.innerHTML = `
    <div class="details-top">
    <div>
    ${
      show.poster_path
        ? `<img
      src="https://image.tmdb.org/t/p/w500${show.poster_path}"
      class="card-img-top"
      alt="${show.name}"
    />`
        : ` <div class="part">${show.name}</div>
  />`
    }
    </div>
    <div>
      <h2>${show.name}</h2>
      <p>
        <i class="fas fa-star text-primary"></i>
        ${show.vote_average.toFixed(1)} / 10
      </p>
      <p class="text-muted">Last Air Date: ${show.last_air_date}</p>
      <p>
        ${show.overview}
      </p>
      <h5>Genres</h5>
      <ul class="list-group">
        ${show.genres.map((genre) => `<li>${genre.name}</li>`).join('')}
      </ul>
      <a href="${
        show.homepage
      }" target="_blank" class="btn">Visit show Homepage</a>
    </div>
  </div>
  <div class="details-bottom">
    <h2>Show Info</h2>
    <ul>
      <li><span class="text-secondary">Number of Episodes:</span> ${
        show.number_of_episodes
      }</li>
      <li><span class="text-secondary">Last Episode To Air:</span> ${
        show.last_episode_to_air.name
      }</li>
      <li><span class="text-secondary">Status:</span> ${show.status}</li>
    </ul>
    <h4>Production Companies</h4>
    <div class="list-group">
      ${show.production_companies
        .map((company) => `<span>${company.name}</span>`)
        .join(', ')}
    </div>
  </div>
    `;
  
    document.querySelector('#show-details').appendChild(div);
  }
  

// displayPopularMovies()
// fetchAPIData()
async function fetchAPIData(endpoint){
  const API_KEY = global.api.apiKey;
  const API_URL = global.api.apiUrl;
  
  showSpinner();
  const response = await fetch(`${API_URL}${endpoint}?api_key=${API_KEY}`)
  
  const data = await response.json();
  // console.log(data)
  hideSpinner();
  return data;
}


document.addEventListener('DOMContentLoaded', init)
// init()

function displayBackgroundImage(type,backgroundPath){
  const overlayDiv = document.createElement('div');
  overlayDiv.style.backgroundImage = `url(https://image.tmdb.org/t/p/original/${backgroundPath})`;
  overlayDiv.style.backgroundSize = 'cover';
  overlayDiv.style.backgroundPosition = 'center';
  overlayDiv.style.backgroundRepeat = 'no-repeat';
  overlayDiv.style.height = '100vh';
  overlayDiv.style.width = '100vw';
  overlayDiv.style.position = 'absolute';
  overlayDiv.style.top = '0';
  overlayDiv.style.left = '0';
  overlayDiv.style.zIndex = '-1';
  overlayDiv.style.opacity = '0.1';
  
  if(type === 'movie'){
    document.querySelector('#movie-details').appendChild(overlayDiv);
  } else{
    document.querySelector('#show-details').appendChild(overlayDiv)
  }
  
}

// display slider 

async function displaySlider(){
  const {results} = await fetchAPIData('movie/now_playing');
  
  results.forEach((movie)=>{
    const div = document.createElement('div');
    div.classList.add('swiper-slide');
    
    div.innerHTML = `
    <a href='movie-details.html?id=${movie.id}' class="swipes">
    <img src="https://images.tmdb.org/t/p/w500${movie.poster_path}" alt="${movie.title}">
    </a>
    
    <h4 class="swiper-rating">
    <i class="fas fa-star text-secondary"></i> ${movie.vote_average.toFixed(1)} / 10
    </h4>
    `;

    document.querySelector('.swiper-wrapper').appendChild(div)
  })
  
  initSwiper();
  
}

// search movies
async function search(){
  const queryString = window.location.search;
  
  // urlsearchparams allow trivial to manipulate string.
  
  const urlParams = new URLSearchParams(queryString);
  
  global.search.type = urlParams.get('type');
  global.search.term = urlParams.get('search-term');
  
  if(global.search.term !== '' && global.search.term !== null){
    const {results, total_pages, page, total_results} = await searchAPIData();
    console.log(searchAPIData());

    global.search.page = page;
    global.search.totalPages = total_pages;
    global.search.totalResults = total_results;
    
    if(results.length === 0){
      showAlert("No Results Found ");
      return;
    }
    displaySearchResults(results);
    
    document.querySelector("#search-term").value='';
  } else{
    showAlert('Please Enter a Search Term')
  }
}

// Show Alert function
function showAlert(message,className = 'error'){
  const alertEl = document.createElement('div');
  alertEl.classList.add('alert',className);
  alertEl.appendChild(document.createTextNode(message));
  document.querySelector('#alert').appendChild(alertEl);
  
  setTimeout(() => alertEl.remove(), 3000);
}


// make request ot search
async function searchAPIData(){
  console.log("Hello");
  const API_KEY = global.api.apiKey;
  const API_URL = global.api.apiUrl;

  showSpinner();
  
  const response = await fetch(`${API_URL}search/${global.search.type}?api_key=${API_KEY}&language=en-US&query=${global.search.term}&page=${global.search.page}`);
  // console.log(response)
  hideSpinner();
  const data = await response.json();
  console.log(data);
  
  return data;
}

function displaySearchResults(results){
  document.querySelector('#search-results').innerHTML = '';
  document.querySelector('#search-results-heading').innerHTML = '';
  document.querySelector('#pagination').innerHTML = '';
  
  results.forEach((result)=>{
    const div = document.createElement('div');
    div.classList.add('card');
    div.innerHTML = 
    `
    ${result.poster_path ? `<a href="${global.search.type}-details.html?id=${result.id}">
    <img src="https://images.tmdb.org/t/p/w500${global.search.type === 'movie' ? result.poster_path : result.poster_path}" alt="${global.search.type === 'movie' ? result.title: result.name}"/> 
    </a>` :  `<a href="${global.search.type}-details.html?id=${result.id}">
    <div class="part">${global.search.type === 'movie' ? result.title: result.name}</div>
    </a>`}
   
    <div class="card-body">
    <h5 class="card-title">${global.search.type === 'movie' ? result.title : result.name}</h5>
    <p class="card-text">
    <small class="text-muted">
    ${global.search.type === 'movie' ?  result.release_date : result.first_air_date}
    </small>
    </p>
    </div>
    `
    document.querySelector('#search-results').appendChild(div)
  })
  
  document.querySelector('#search-results-heading').innerHTML = `
  <h2>${results.length} OF ${global.search.totalResults}<h2> Results for ${global.search.term}`

  displayPagination();
}

function highlightActiveLink(){
  const links = document.querySelectorAll('.nav-link');

  links.forEach((link)=>{
    if(link.getAttribute('href')===global.currentPage){
      link.classList.add('active');
    }
  })
}

// spinner
function showSpinner(){
  document.querySelector('.spinner').classList.add('show')
}

function hideSpinner(){
  document.querySelector('.spinner').classList.remove('show')
}

function initSwiper(){
  const swiper = new Swiper('.swiper',{
    slidesPerView: 1,
    spaceBetween: 30,
    freeMode: true,
    loop: true,
    autoplay:{
      delay: 4000,
      disableOnInteraction: false,
    },
    breakpoints: {
      500:{
        slidesPerView: 2,
      },
      700: {
        slidesPerView: 3,
      },
      900: {
        slidesPerView : 4
      }
    }
  })
}
function init(){
  switch (global.currentPage){
    case '/':
      case '/index.html':
        displaySlider();
        displayPopularMovies()
          break;
      case '/shows.html':
          displayPopularShows()
          break
          case '/movie-details.html':
          displayMovieDetails()
          break
          case '/tv-details.html':
            console.log(global.currentPage);
            displayShowDetails();
          break
          case '/search.html':
          // console.log(global.currentPage)
          search();
          break
        }
        highlightActiveLink();
      }

  
function displayPagination(){
  const div = document.createElement('div');
  div.classList.add('pagination');
  div.innerHTML = `
  <button class= "btn btn-primary" id="prev">Prev</button>
  <button class= "btn btn-primary" id="next">Next</button>
   <div class="page-counter">Page ${global.search.page} of ${global.search.totalPages}</div>
  `;

  document.querySelector('#pagination').appendChild(div);

  // disable prev button if on the first page

  if(global.search.page === 1){
    document.getElementById('prev').disabled = true;
  };
  
  if(global.search.page === global.search.totalPages){
    document.getElementById('next').disabled = true;
  };

  // next page
  document.getElementById('next').addEventListener('click', async ()=>{
    global.search.page++;
    const {results,totalPages} = await searchAPIData();
    displaySearchResults(results);
  });

  // previous page
  document.getElementById('prev').addEventListener('click', async ()=>{
    global.search.page--;
    const {results,totalPages} = await searchAPIData();
    displaySearchResults(results);
  });
}