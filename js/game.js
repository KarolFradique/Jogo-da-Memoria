const grid = document.querySelector('.grid')
const spanPlayer = document.querySelector('.player')
const timer = document.querySelector('.timer')
const refresh = document.querySelector('.refresh')

refresh.addEventListener('click', ()=>{
    location.reload()
})

const caracters = [
  'beth',
  'jerry',
  'jessica',
  'morty',
  'pessoa-passaro',
  'pickle-rick',
  'rick',
  'summer',
  'meeseeks',
  'scroopy',
]

const createElement = (tag, className) =>{
    const element = document.createElement(tag);
    element.className = className;
    return element

}
let firstCard = '';
let secondCard = '';

const checkEndGame = () =>{
    const disabledCard  = document.querySelectorAll('.disabled-card')

    if(disabledCard.length === 20){
        clearInterval (this.loop)
        alert(`Parabens, ${spanPlayer.innerHTML}, seu tempo foi: ${timer.innerHTML}`)
    }
}

const checkCards = () =>{
    const firstCarater = firstCard.getAttribute('data-caracter')
    const secondCaracter = secondCard.getAttribute('data-caracter')

    if (firstCarater === secondCaracter){
        firstCard.firstChild.classList.add('disabled-card')
        secondCard.firstChild.classList.add('disabled-card')

        firstCard = ''
        secondCard= ''

        checkEndGame()
    } else {
        setTimeout(()=>{
            firstCard.classList.remove('reveal-card')
            secondCard.classList.remove('reveal-card')
            

            firstCard = ''
            secondCard= ''
        }, 500)
        
    }
}

const revealCard = ({ target }) => {
    if (target.parentNode.className.includes('reveal-card')){
        return
    }
    if (firstCard === ''){
        target.parentNode.classList.add('reveal-card')
        firstCard = target.parentNode
    } else if (secondCard === ''){
        target.parentNode.classList.add('reveal-card')
        secondCard = target.parentNode

        checkCards()
    }
    }
   

const createCard = (caracter) => {

    const card = createElement('div', 'card')
    const front = createElement('div', 'face front')
    const back = createElement('div', 'face back')
    
    front.style.backgroundImage = `url('../images/${caracter}.png')`


    card.appendChild(front);
    card.appendChild(back);

    card.addEventListener('click', revealCard)
    card.setAttribute('data-caracter', caracter)
   
    return card;
}
const loadGame = () =>{
    
    const duplicate = [...caracters, ...caracters ]

    const shuffleadArrey = duplicate.sort(()=> Math.random() - 0.5)

    shuffleadArrey.forEach((caracter) =>{

        const card = createCard(caracter)
        grid.appendChild(card)
    })
}
const startTime = () =>{
    this.loop = setInterval(()=>{
        const currentTime = +timer.innerHTML;
        timer.innerHTML = currentTime + 1
    },1000)
}

window.onload = () =>{
    
    spanPlayer.innerHTML = localStorage.getItem('player')
    startTime()
    loadGame()
}

