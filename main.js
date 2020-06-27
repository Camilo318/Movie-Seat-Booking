const container = document.querySelector('.container')
const seats = document.querySelectorAll('.row .seat')
const count = document.getElementById('count')
const total = document.getElementById('price')
const buyBtn = document.querySelector('.confirm-btn')
const deleteBtn = document.querySelector('.erase-btn')

const movieSelect = document.getElementById('movie')
let ticketPrice = +movieSelect.value


//update total and count
function updateSelection() {
    const selectedSeats = document.querySelectorAll('.row .seat.selected')
    count.innerText = selectedSeats.length
    total.innerText = selectedSeats.length * ticketPrice
}

//Detects clicks on the seats
container.addEventListener('click', e => {
    if (e.target.classList.contains('seat') && !e.target.classList.contains('occupied')) {
        e.target.classList.toggle('selected')
        updateSelection()
    }
})

//Movie select event
movieSelect.addEventListener('change', (e) => {
    ticketPrice = e.target.value
    updateSelection()
})



