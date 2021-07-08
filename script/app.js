'use strict';

let imgArr = ['bag.jpg', 'banana.jpg', 'bathroom.jpg', 'boots.jpg', 'breakfast.jpg', 'bubblegum.jpg', 'chair.jpg', 'cthulhu.jpg', 'dog-duck.jpg', 'dragon.jpg', 'pen.jpg', 'pet-sweep.jpg', 'scissors.jpg', 'shark.jpg', 'sweep.png', 'tauntaun.jpg', 'unicorn.jpg', 'usb.gif', 'water-can.jpg', 'wine-glass.jpg'];

let allIndices = []; // holds all the indices, it will be used as a reference for other two arrays or maybe one in order to remove the indices selected before
for (let i = 0; i < imgArr.length; i++ ) {
  allIndices.push(i);
}
let clearSection = document.getElementById('clear');
clearSection.style.display = 'none';
let emptyArr  = [];
let temporary = [];
let storedArr = [];
let ALLliteral = [];
let ALL = [];
let all = [];
let limit = 5;
let roundlimit = document.getElementById('number');
let lastIter = []; ///////////////////////////////////////////////// keeping track of lastIter
let arrOfRand = [];

let imgSection = document.getElementById('imgSection');
let message = document.getElementById('message');

let img1Div = document.getElementById('img1');
let img2Div = document.getElementById('img2');
let img3Div = document.getElementById('img3');

img1Div.style.border = 'none';
img2Div.style.border = 'none';
img3Div.style.border = 'none';


function begin() { // main body ///////////////////main body ///////////////////main body ///////////////////main body ///////////////////main body ///////////////

  let toBeUsedArr = [];
  toBeUsedArr.push(...allIndices);

  message.style.display = 'none';

  if (Number(roundlimit.value) == 0) {
    limit = 25;
  } else {
    limit = Number(roundlimit.value);
  }

  imgSection.style.filter = 'none';

  let iteration = -1;

  let leftRnds = document.getElementById('leftRnds');
  leftRnds.textContent = limit - iteration - 1;

  imgSection.style.background = 'none';
  img1Div.style.border = '#B3C7D6FF solid 2px';
  img2Div.style.border = '#B3C7D6FF solid 2px';
  img3Div.style.border = '#B3C7D6FF solid 2px';

  let pos1 = document.createElement('img');
  let pos2 = document.createElement('img');
  let pos3 = document.createElement('img');

  img1Div.appendChild(pos1);
  img2Div.appendChild(pos2);
  img3Div.appendChild(pos3);

  let viewRes = document.getElementById('viewRes');

  let min = 0;
  let max = imgArr.length - 1;

  /////////////////////////////////////////////////////////////////////////
  function ImgObj(name, path,clicked,shown) {// the cionstructor
    this.name = name;
    this.path = path;
    this.clicked = clicked;
    this.shown = shown;
    ImgObj.allImg.push(this);
  }
  ImgObj.allImg = [];

  /////////////////////////////////////////////////////////////////////////
  function getRand(min, max) { // returns an array containing 3 random unique numbers, and updates an array holding the numbers used in the last or mosr recent iteration (still thinking what should I do with it) //

    max = imgArr.length - 1;
    let tempArr = allIndices.slice(0);
    let c = 0;
    for (let i = 0; i < allIndices.length; i++) {
      let randind = Math.floor(Math.random() * (max - min + 1) + min);
      max--;
      let rand = tempArr[randind];
      if (lastIter.includes(rand) && arrOfRand.includes(rand)) {
        continue;
      } else {
        if (c < 3) {
          arrOfRand[c] = rand;
          c++;
          tempArr.splice(tempArr.indexOf(rand),1);
        } else {
          break;
        }
      }
    }

    lastIter = arrOfRand; // the array holding the numbers used in the latest iteration
    return arrOfRand;
  }


  for (let i = 0; i < imgArr.length; i++) {
    new ImgObj(imgArr[i].split('.')[0], imgArr[i],0,0);
  }

  render();
  /////////////////////////////////////////////////////////////////////////
  function render() {

    let [rand1, rand2, rand3] = getRand(min, max);

    pos1.setAttribute('src', `./img/${ImgObj.allImg[rand1].path}`);
    pos2.setAttribute('src', `./img/${ImgObj.allImg[rand2].path}`);
    pos3.setAttribute('src', `./img/${ImgObj.allImg[rand3].path}`);

    for(let i = 0; i < ImgObj.allImg.length; i++ ) {
      switch(ImgObj.allImg[i].path) {
      case pos1.src.split('/')[4]:
        ImgObj.allImg[i].shown++;
        if (iteration == limit - 1) ImgObj.allImg[i].shown--;
        break;
      case pos2.src.split('/')[4]:
        ImgObj.allImg[i].shown++;
        if (iteration == limit -1 ) ImgObj.allImg[i].shown--;
        break;
      case pos3.src.split('/')[4]:
        ImgObj.allImg[i].shown++;
        if (iteration == limit -1) ImgObj.allImg[i].shown--;
        break;
      }
    }
    iteration++;

    if (iteration >= limit ) {
      imgSection.removeEventListener('click', check);
      viewRes.disabled = false;
      viewRes.style.background = 'green';
      viewRes.style.color = 'white';
      all = ImgObj.allImg;
      ALL = ImgObj.allImg.slice(0);

      for (let i = 0; i < ALL.length; i++) { // transforming ALL from an array of constructor objects to an array of literal objects every time ALL gets reassigned
        if (ALL) {
          let {name, path, clicked, shown} = ALL[i];
          ALLliteral.push({name: name , path: path, clicked: clicked, shown: shown });
          // destructuring to assign values which is a bit faster, and thus we get the array holding literal objects
          emptyArr.push({name: name, path: path, clicked: 0, shown: 0});
          // an empty array to initialize the array temporary because we will have null or the array is still not in the locallStorage for the very first time you start the application
        }
      }
      return;
    }
  }

  imgSection.addEventListener('click', check);

  /////////////////////////////////////////////////////////////////////////
  function check(e) { //assign paths or set src attributes for images
    let pth = e.target.src.split('/')[4];

    for (let i = 0; i < ImgObj.allImg.length; i++ ) {

      if (pth == pos1.src.split('/')[4] && ImgObj.allImg[i].path == pos1.src.split('/')[4]) {
        ImgObj.allImg[i].clicked++;
        break;
      } else if (pth == pos2.src.split('/')[4] && ImgObj.allImg[i].path == pos2.src.split('/')[4]) {
        ImgObj.allImg[i].clicked++;
        break;
      } else if (pth == pos3.src.split('/')[4] && ImgObj.allImg[i].path == pos3.src.split('/')[4]) {
        ImgObj.allImg[i].clicked++;
        break;
      }
    }
    leftRnds.textContent = Number(leftRnds.textContent) - 1;
    render();
  }
} // end of main body////////////// end of main body////////////// end of main body////////////// end of main body////////////// end of main body//////////////////

/////////////////////////////////////////////////////////////////////////
function resetAll() { // reload the page

  location.reload();
}
/////////////////////////////////////////////////////////////////////////

let result = document.getElementById('result'); // just to make the div disappear before it gets shown not to ruin paddings and margins
result.style.display = 'none';
function view() { // view results in a list and as a chart

  temporary = JSON.parse(localStorage.getItem('ALL'));
  if (!temporary) {
    temporary = emptyArr.slice(0);
  }
  for (let i = 0; i < ALLliteral.length; i++) {
    temporary[i].clicked += ALLliteral[i].clicked;
    temporary[i].shown += ALLliteral[i].shown;
  }
  localStorage.setItem('ALL', JSON.stringify(temporary));


  console.table([temporary]);
  ALL = temporary.slice(0);


  result.style.display = 'block';
  let resButton = document.querySelector('#viewRes');
  let ul = document.createElement('ul');
  result.appendChild(ul);
  let namesArr = ALL.slice(0);
  let vieweddArr = ALL.slice(0);
  let votedArr = ALL.slice(0);
  namesArr = namesArr.map(item => item.name);
  vieweddArr = vieweddArr.map(item => item.shown);
  votedArr = votedArr.map(item => item.clicked); // all good we have all the arrays needed, these arrays hold the values for a single key per each object

  let ctx = document.getElementById('myChart').getContext('2d');
  let myChart = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: namesArr,
      datasets: [{
        label: 'Viewed', // 1st
        data: vieweddArr,
        backgroundColor: 'coral',
        borderColor: 'coral',
        borderWidth: 1
      },
      {
        label: 'Voted', // 2nd
        data: votedArr,
        backgroundColor: 'rgb(36, 96, 167)',
        borderColor: 'rgb(36, 96, 167)',
        borderWidth: 1
      }]
    },
    plugins: [{ // I am really not sure about this part, I copied from the internet and thankfully it works (just to change the background color)
      beforeDraw: (chart) => {
        // const ctx = chart.canvas.getContext('2d');
        ctx.save();
        ctx.globalCompositeOperation = 'destination-over';
        ctx.fillStyle = 'rgb(179,199,214)';
        ctx.fillRect(0, 0, chart.width, chart.height);
        ctx.restore();
      }
    }],
    options: {
      layout: {
        padding: 20
      },
      scales: {
        y: {
          ticks: {
            beginAtZero:true,
            color: 'rgb(36, 96, 167)'
          },
        },
        x: {
          ticks: {
            color: 'rgb(36, 96, 167)'
          },
        }
      },
      color: 'rgb(36, 96, 167)',
    }
  });

  for (let i = 0; i < ALL.length; i++) { // create li elements and add the necessary values
    let li = document.createElement('li');
    ul.appendChild(li);
    li.textContent = `${ALL[i].name} had ${ALL[i].clicked} votes, and was seen ${ALL[i].shown} times.`;
  }
  clearSection.style.display = 'flex';
  ///////////////////////////////////////////////////////////////////////////////////////////////
  modifyShowResultsButton(resButton);
}
/////////////////////////////////////////////////////////////////////////
function modifyShowResultsButton(resButton) { // just to change the style and the message of the "show results" button

  resButton.disabled = true;
  resButton.style.background = 'initial'; // the view results button will stop showing the results everytime you click it, it will do that only once then it will be disabled
  resButton.textContent = 'Results';
  resButton.style.border = 'none';
}

function clearData() {
  localStorage.clear();
  resetAll();
}
