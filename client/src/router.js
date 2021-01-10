export default class Router {

  getHash() {
    return window.location.hash.split('#')[1];
  }

  changeURL(url) {
    history.pushState({}, null, `#${url}`);
  }

  replace(hash) {
    history.replaceState({}, null, `#${hash}`);
  }
  
  goBack() {
    history.back();
  }

  getShit(midURL, endURL = '') {
    return {
      movie: {viewName: 'movie', endpointName: `movie/${endURL}`},
      register: {viewName: 'register', endpointName: 'register'},
      director: {viewName: 'category', endpointName: `director/${endURL}`},
      genre: {viewName: 'category', endpointName: `genre/${endURL}`},
      studio: {viewName: 'category', endpointName: `studio/${endURL}`},
      distributor: {viewName: 'category', endpointName: `distributor/${endURL}`},
      awards: {viewName: 'awards', endpointName: `awards/${endURL}`}
    }[midURL] || {viewName: 'mainPage', endpointName: 'main'};
  }

  getState() {
    if (!this.getHash()) return {viewName: 'mainPage', endpointName: 'main'};
    if (this.getHash().includes('/')) {
      const list = this.getHash().split('/');
      return this.getShit(list[0], list[1]);
    }
    return this.getShit(this.getHash());
  }
}
