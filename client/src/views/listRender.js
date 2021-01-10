const listRender = (data, startIndex = 0, endIndex = data.movies.length) =>
  `
  <div style="height: 50px"></div>
  <h1>${data.title}</h1>
  <div class="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 row-cols-xl-5 style="max-width: 100%">
    ${data.movies.slice(startIndex, endIndex).map(movie => `<div class="card" style="min-width: 100px">
      <img class="card-img-top" src="./img/${movie.MovieTitle.split(' ').join('').toLowerCase()}.jpg" alt="Card image cap">
      <div class="card-body">
        <a href="#movie/${movie.MovieId}"><h5 class="card-title">${movie.MovieTitle}</h5></a>
        <h6><strong>${movie.Rate ? `Average rate: ${movie.Rate}` : 'Is not rated yet'}</strong></h6>
        <button type="button" class="hashbtn btn btn-primary" id="movie/${movie.MovieId}">Rate</button>
      </div>
      <div class="card-footer">
        <small class="text-muted">${movie.GenreName}</small>
      </div>
    </div>`).join('\n')}
  </div>`;

export default listRender;
