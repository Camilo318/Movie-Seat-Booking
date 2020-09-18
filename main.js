document.addEventListener('DOMContentLoaded', openCinema)

function openCinema() {
    const seats = document.querySelectorAll('.row .seat')
    const movies = []

    const buyBtn = document.querySelector('.confirm-btn')
    const deleteBtn = document.querySelector('.erase-btn')

    const movieSelect = document.getElementById('movie')
    for (let i = 0; i < movieSelect.length; i++) {
        movies.push(new Movie(movieSelect[i].dataset.name,
        movieSelect[i].value))
    }

    const cinema = new Cinema(movies, seats)
    const container = document.querySelector('.container')
    let ticketPrice = +movieSelect.value

    //Detects clicks on the seats
    container.addEventListener('click', e => {
        if (e.target.classList.contains('seat') && !e.target.classList.contains('occupied')) {
            cinema.selectSeat(e.target, movieSelect.selectedIndex)
            cinema.updateSelection(ticketPrice)
        }
    })
    //Movie select event
    movieSelect.addEventListener('change', (e) => {
        ticketPrice = e.target.value
        cinema.updateSelection(ticketPrice)
        cinema.showSeats(movieSelect.selectedIndex)
    })

    //SWAL- Buying option

    buyBtn.addEventListener('click', () => {
        const movieTitle = movieSelect[movieSelect.selectedIndex].dataset.name
        const selectedSeats = document.querySelectorAll('.row .seat.selected')
        const spots = selectedSeats.length
        cinema.buyTickets(movieTitle, selectedSeats, spots, ticketPrice)
        
    })
    
}
