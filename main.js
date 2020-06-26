const container = document.querySelector('.container')
const seats = document.querySelectorAll('.row .seat')
const count = document.getElementById('count')
const total = document.getElementById('price')
const buyBtn = document.querySelector('.confirm-btn')

//Selection of the movie
const movieSelect = document.getElementById('movie')
updateMovie()
let ticketPrice = parseInt(movieSelect.value)

buyBtn.addEventListener('click', confirmTickets)

function confirmTickets() {
    const selectedSeats = document.querySelectorAll('.row .seat.selected')
    if (selectedSeats.length < 1) {
        swal('No seats selected', 'Please select some seats', 'error')
    } 
    else {
        const totalPrice = movieSelect.value
        const indexToSee = movieSelect.selectedIndex
        swal({
            title: 'Confirm movie and payment',
            text: `${movieSelect[indexToSee].innerHTML}
            Spots: ${selectedSeats.length}\n
            Total cost: $${totalPrice * selectedSeats.length}`,
            icon: 'info',
            buttons: true
        })
        .then(value => {
            if (value) {
                populateUI()
                updateSelections()
                swal('Tickets Purchased!', 'Enjoy the movie 😃🍿', 'success')
            }

        })
    }
}               
//Detects if the movie has changed
movieSelect.addEventListener('input', updatePrice)
//Updates the ticket price according to the selected movie
function updatePrice() {
    ticketPrice = parseInt(this.value)
    setMovieData(this.selectedIndex, this.value)
    updateSelections()
}
//Saves the choosen movie and its price
function setMovieData(movieIndex, moviePrice) {
    localStorage.setItem('selectedMovieIndex', movieIndex)
    localStorage.setItem('selectedMoviePrice', moviePrice)
}

//Each seat is waiting for a click
seats.forEach(seat => {
    seat.addEventListener('click', seatSelect)
})

function seatSelect() {
    if (!this.classList.contains('occupied')) {
        this.classList.toggle('selected')
    } else {
        console.log('Seat already taken')
    }

    updateSelections()
}


//Update count and total
function updateSelections() {
    const selectedSeats = document.querySelectorAll('.row .seat.selected')

    const seatsIndex = [...selectedSeats].map(seat => {
        return [...seats].indexOf(seat)
    })
    //Saves the index of the choosen seats
    localStorage.setItem('selectedSeats', JSON.stringify(seatsIndex))
    count.innerHTML = selectedSeats.length
    total.innerHTML = `$${selectedSeats.length * ticketPrice}`
}

//Get data from local storage and populate UI
function populateUI() {
    const takenSeats = JSON.parse(localStorage.getItem('selectedSeats'))
    takenSeats.forEach(seat => {
        [...seats][seat].className = 'seat occupied'
    })
}

function updateMovie() {
    const storedMovie = localStorage.getItem('selectedMovieIndex')
    if (storedMovie !== null) {
        movieSelect.selectedIndex = storedMovie
    }
}
