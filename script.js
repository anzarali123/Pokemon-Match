const playerLives = document.querySelector('.player-lives');
const container = document.querySelector('section')
const modalcontainer = document.querySelector('.modal-container');
const modal = document.querySelector('.modal ')
let totalLives = 10;
console.log(modal,modalcontainer)
playerLives.textContent = `Lives: ${totalLives}`
// -------------getting the images----------------
const getData = () => {
  return  [
     {imgSrc:'./images/pokemon1.png' ,name:'pokemon1',id: 1},
     {imgSrc:'./images/pokemon2.jpeg',name:'pokemon2',id: 2},
     {imgSrc:'./images/pokemon3.png' ,name:'pokemon3',id: 3},
     {imgSrc:'./images/pokemon4.jpeg',name:'pokemon4',id: 4},
     {imgSrc:'./images/pokemon5.png' ,name:'pokemon5',id: 5},
     {imgSrc:'./images/pokemon6.png' ,name:'pokemon6',id: 6},
     {imgSrc:'./images/pokemon7.jpeg',name:'pokemon7',id: 7},
     {imgSrc:"./images/pokemon8.png" ,name:'pokemon8',id: 8},
     {imgSrc:'./images/pokemon1.png' ,name:'pokemon1',id: 9},
     {imgSrc:'./images/pokemon2.jpeg',name:'pokemon2',id: 10},
     {imgSrc:'./images/pokemon3.png' ,name:'pokemon3',id: 11},
     {imgSrc:'./images/pokemon4.jpeg',name:'pokemon4',id: 12},
     {imgSrc:'./images/pokemon5.png' ,name:'pokemon5',id: 13},
     {imgSrc:'./images/pokemon6.png' ,name:'pokemon6',id: 14},
     {imgSrc:'./images/pokemon7.jpeg',name:'pokemon7',id: 15},
     {imgSrc:"./images/pokemon8.png" ,name:'pokemon8',id: 16},
    ]
}
//  -------------------back image-----------------------
  const coverImage =  {imgSrc:'./images/Ash and Pikachu from Pokemon.jpeg',name:'backImage',id:17}



//   ---------------Randomizing an array--------------
let randomize = () => {
    const cardData = getData();
    cardData.sort((a,b) => Math.random() - 0.5);
    return cardData;
}

// --------------------adding images to the page-----------
renderImages = () => {
   const cardData = randomize();
   cardData.forEach((item) => {

    //    creating elements-----------
       const card = document.createElement('div');
       const frontImage = document.createElement('img');
       frontImage.src = item.imgSrc;
       const backImage = document.createElement('img');
       backImage.src = coverImage.imgSrc;

       //    adding classes -------------------------
       frontImage.className = 'frontImage';
       backImage.className = 'backImage';
       card.classList.add('card');
       card.setAttribute('name',item.name)
    //    appending the created elements----------------
       card.appendChild(frontImage);
       card.appendChild(backImage);
       container.appendChild(card);

       card.addEventListener('click',(e) => {
       e.target.classList.toggle('toggleCard');
         checkCards(e);
      })
      
    });
  }
  renderImages();
  
  let correctCard = 0;
  const checkCards = (e) => {
    const clickedCard = e.target;
    clickedCard.classList.toggle('flipped');
    const flippedCards = document.querySelectorAll('.flipped');

    // logic---------------------------------------------------------------

      if(flippedCards.length === 2) {
      if(flippedCards[0].getAttribute('name') === flippedCards[1].getAttribute('name')) {
        flippedCards.forEach((card) => {
          card.classList.remove('flipped');
          card.style.pointerEvents = 'none';
        });
        correctCard++;
        if(correctCard == 8) {
          setTimeout(() => {restart()},1000)
          setTimeout(() => {gameOver(result = 'You Won!')},1000)
        };
      } 
      

      else {
        flippedCards.forEach(card => {
          card.classList.remove('flipped');
        setTimeout(() => { card.classList.remove('toggleCard');},1000)
      });

      setTimeout(() => {
        totalLives--;
        playerLives.textContent = `Lives: ${totalLives}`
        if(totalLives ===0) {
         restart()
        setTimeout(() => {gameOver(result = 'You Lost!')},1000)}
      },1000);
    
  }
  }
  }

const restart = () => {
let cardData = randomize();
let faces = document.querySelectorAll('.frontImage');
let cards = document.querySelectorAll('.card');
 container.style.pointerEvents = 'none';
cardData.forEach((item,index) => {
  cards[index].classList.remove('toggleCard');

  setTimeout(() => {
    cards[index].style.pointerEvents = 'all';
    faces[index].src = item.imgSrc;
    cards[index].setAttribute('name',item.name);
    container.style.pointerEvents = 'all';
  },1000)
 
})
totalLives = 10;
playerLives.textContent = `Lives: ${totalLives}`;
}


let gameOver = (result) => {
  modal.firstElementChild.textContent = result;
  correctCard = 0;
  modalcontainer.style.display = 'flex';
  modal.lastElementChild.addEventListener('click',() => {
  modalcontainer.style.display = 'none';
  })
}
