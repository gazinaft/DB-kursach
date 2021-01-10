import listRender from './listRender.js';

const display = (data) => {
  if (data === null || Object.entries(data).length === 0) return '';
  return `
  <div class="container" style="height: 30vw; overflow: hidden; min-height: 270px">
    <div class="pic-ctn">${data.ethernalClassic.map(slide => `
      <img src="./img/${slide.MovieTitle.split(' ').join('').toLowerCase()}Alter.jpg" alt="" id="movie/${slide.MovieId}" class="hashbtn pic">`).join('')}
    </div>
  </div>
  ${listRender(data)}`;
};

export default display;
