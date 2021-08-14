document.addEventListener('DOMContentLoaded', openCinema)

function openCinema() {
  const seats = document.querySelectorAll('.row .seat')
  const movies = []

  const buyBtn = document.querySelector('.confirm-btn')
  const deleteBtn = document.querySelector('.erase-btn')

  const movieSelect = document.getElementById('movie')

  // Adding movies
  for (let movie of Array.from(movieSelect.options)) {
    movies.push(new Movie(movie.dataset.name, movie.value))
  }

  const cinema = new Cinema(movies, seats)
  const container = document.querySelector('.container')

  //Detects clicks on the seats
  container.addEventListener('click', e => {
    if (
      e.target.classList.contains('seat') &&
      !e.target.classList.contains('occupied')
    ) {
      cinema.selectSeat(e.target, movieSelect.selectedIndex)
    }
  })
  //Movie select event
  movieSelect.addEventListener('change', e => {
    cinema.showSeats(movieSelect.selectedIndex)
  })

  buyBtn.addEventListener('click', () => {
    cinema.buyTickets(movieSelect.selectedIndex)
  })

  deleteBtn.addEventListener('click', () => {
    cinema.deleteSeats(movieSelect.selectedIndex)
  })
}
