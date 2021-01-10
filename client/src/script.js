import RenderEngine from './engine.js';
import Router from './router.js';
import Client from './client.js';

const openNav = () => {
  document.getElementById('myNav').style.width = '100%';
};
  
const closeNav = () => {
  document.getElementById('myNav').style.width = '0%';
};


const changeHash = hash => {
  router.changeURL(hash);
  mainF();
};

document.addEventListener('submit', (evt) => {
  if (evt.target.id === 'register-form') {
    const login = document.getElementById('login');
    const password = document.getElementById('password');
    console.log('Posting');
    client.post({login: login.value, password: password.value}, 'createUser')
      .then(data => {
        console.log('Success:', data);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  } else if (evt.target.id === 'rate-form') {
    console.log('Posting');
    const login = document.getElementById('login');
    const password = document.getElementById('password');
    const rate = document.getElementById('rate');
    client.post({login: login.value, password: password.value, rate: rate.value, MovieId: router.getHash().split('/').pop()}, 'review')
      .then(data => {
        console.log('Success:', data);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  } else if (evt.target.id === 'delete-form') {
    const login = document.getElementById('login1');
    const password = document.getElementById('password1');
    console.log('Posting');
    client.post({login: login.value, password: password.value}, 'review')
      .then(data => {
        console.log('Success:', data);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }
});

const getPagesInfo = () => {
  return router.getHash().split('/').pop().split('-');
};

const changePageInfo = (first, second) => {
  const currentHash = router.getHash().split('/');
  currentHash[1] = `${first}-${second}`;
  changeHash(currentHash.join('/'));
};

const changeSize = () => {
  const pageSize = document.getElementById('page-size').value;
  console.log(`Should be ${pageSize} items`);
  changePageInfo(pageSize, 1);
};


document.addEventListener('click', (evt) => {
  switch (evt.target.className.split(' ')[0]) {
  case 'closebt':
  case 'closebtn':
    closeNav();
    break;
  case 'openbtn':
    openNav();
    break;
  case 'hashbtn':
    changeHash(evt.target.id);
    break;
  case 'page-size-change':
    changeSize();
    break;
  case 'prev-page':
    changePageInfo(getPagesInfo()[0], +getPagesInfo()[1] - 1);
    break;
  case 'next-page':
    changePageInfo(getPagesInfo()[0], +getPagesInfo()[1] + 1);
    break;
  default:
    break;
  }
});

const router = new Router();
const client = new Client();
const engine = new RenderEngine();

async function loadMain() {
  try {
    const view = await import('./views/mainPage.js');
    const data = await client.getData('main');
    engine.render(view(data));
  } catch (e) {
    console.log(e);
  }
}

let view;
const mainF = () => {
  const { viewName, endpointName } = router.getState();
  engine.loader();
  import(`./views/${viewName}.js`)
    .then((viewModel) => {
      view = viewModel.default;
      console.log('getting data');
    })
    .then(() => client.getData(endpointName))
    .catch(reason => {
      console.log(reason);
      loadMain();
    })
    .then(data => {
      console.log('begin rendering');
      console.log(data);
      engine.render(view(data, router.getHash()));
    })
    .catch(reason => {
      console.log(reason);
    });

};
mainF();
window.addEventListener('hashchange', mainF);


export {
  openNav,
  closeNav,
  changeHash,
  mainF,
  loadMain,
};