class Movie {
    constructor(name, price) {
        this.name = name;
        this.price = price;
        this.seats = []
    }
}

document.addEventListener('DOMContentLoaded', openCinema)

function openCinema() {
    const movies = []
    const movieSelect = document.getElementById('movie')
    for (let i = 0; i < movieSelect.length; i++) {
        movies.push(new Movie(movieSelect[i].dataset.name, movieSelect[i].value))
    }

    console.log(movies)


    const container = document.querySelector('.container')
    const seats = document.querySelectorAll('.row .seat')
    const count = document.getElementById('count')
    const total = document.getElementById('price')
    const buyBtn = document.querySelector('.confirm-btn')
    const deleteBtn = document.querySelector('.erase-btn')

    let ticketPrice = +movieSelect.value


    //update total and count
    function updateSelection() {
        const selectedSeats = document.querySelectorAll('.row .seat.selected')
        count.innerText = selectedSeats.length
        total.innerText = selectedSeats.length * ticketPrice + '$'
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


    //SWAL- Buying option

    buyBtn.addEventListener('click', () => {
        //Getting the movie title
        const movieTitle = movieSelect[movieSelect.selectedIndex].dataset.name
        //Getting the selected seats
        const selectedSeats = document.querySelectorAll('.row .seat.selected')
        const spots = selectedSeats.length
        if (spots > 0) {
            swal({
                title: 'Confirm Movie And Payment',
                text: `${movieTitle}
                Spots: ${spots}
                Total Payment: ${spots*ticketPrice}`,
                icon: 'warning',
                buttons: true
            }).then(value => { //If the tickets were purchased
                if (value) {
                    swal('Tickets Purchased!', 'Enjoy the movie 😃🍿', 'success')
                    //Removing the selected class
                    selectedSeats.forEach(seat => seat.className = 'seat occupied')
                    //Reseting the info
                    updateSelection()
                }
            })   
        } else {
            swal('No seats selected', 'Please select some seats', 'error')
        }
    })
}
