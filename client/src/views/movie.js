const display = (data) => {
  const movie = data.movies[0];
  return `<div class="container-fluid">
    <div class="row">
      <div class="col-md-4">
        <img src="./img/${movie.MovieTitle.split(' ').join('').toLowerCase()}.jpg" style="width: 100%">
      </div>
      <div class="col-md-8" style="background-color: rgba(30, 61, 89, 0.7);">
        <h1>${movie.MovieTitle}</h1>
        <p><a href="#genre/${movie.GenreId}">${movie.GenreName}</a></p>
        <p>Made in ${movie.Country} by <a href="#studio/${movie.StudioId}">${movie.StudioTitle}</a></p>
        <p>Directed by <a href="#director/${movie.DirectorId}">${movie.DirectorName}</a></p>
        <p>You can watch it on <a href="#distributor/${movie.DistributorId}">${movie.DistributorTitle}</a></p>

        <hr>

        <p>Average rate: ${movie.Rate}</p>
        <form id="rate-form">
          <h2>Login</h2>
          <div class="form-group has-success">
            <input type="text" placeholder="Your login" class="form-control" id="login" required>
          </div>
      
          <h2>Password</h2>
          <div class="form-group has-success">
            <input type="text" placeholder="Your password" class="form-control" id="password" required="">
          </div>
          
          <h2>Rate</h2>
          <div class="form-group has-success">
            <input type="text" placeholder="Your rate" class="form-control" id="rate" required="">
          </div>
          
            <button type="submit" class="rate-btn btn btn-primary" id="${movie.id}">Rate</button>
        </form>
        <hr>
      </div>
    </div>
  </div>`;
};


export default display;
