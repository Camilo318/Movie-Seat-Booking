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


    //Detects clicks on the seats
    container.addEventListener('click', e => {
        if (e.target.classList.contains('seat') && !e.target.classList.contains('occupied')) {
            cinema.selectSeat(e.target, movieSelect.selectedIndex)
        }
    })
    //Movie select event
    movieSelect.addEventListener('change', (e) => {
        cinema.showSeats(movieSelect.selectedIndex)
    })

    //SWAL- Buying option

    buyBtn.addEventListener('click', () => {
        const selectedSeats = document.querySelectorAll('.row .seat.selected')
        const spots = selectedSeats.length
        cinema.buyTickets(movieSelect.selectedIndex, selectedSeats, spots)
    })

    deleteBtn.addEventListener('click', () => {
        const occupiedSeats = document.querySelectorAll('.row .seat.occupied')
        cinema.deleteSeats(occupiedSeats)

    })
}
