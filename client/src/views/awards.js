const display = (data) => {
  return `
  <h1>Awards</h1>
  <table class="table table-hover">
  <thead>
    <tr>
      <th scope="col">Id</th>
      <th scope="col">Movie</th>
      <th scope="col">Ceremony</th>
      <th scope="col">Nomination</th>
      <th scope="col">Year</th>
      <th scope="col">Type of award</th>
    </tr>
  </thead>
  <tbody>
    ${data.map(award => `
    <tr class="table-active">
      <th scope="row">${award.AwardId}</th>
      <td>${award.MovieTitle}</td>
      <td>${award.AwardTitle}</td>
      <td>${award.NominationName}</td>
      <td>${award.AwardYear}</td>
      <td>${award.AwardType}</td>
    </tr>`).join('\n')}
   </tbody>
   </table>
   <input type="number" id="page-size" value="${window.location.hash.split('/').pop().split('-')[0]}" style="width: 50px">
   <button class="page-size-change btn btn-primary">Apply</button>   
   <button class="prev-page btn btn-primary">Previous</button>
   <button class="next-page btn btn-primary">Next</button>
   
  `;
};

export default display;
