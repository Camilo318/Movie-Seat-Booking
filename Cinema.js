class Cinema {
  constructor(movies, seats) {
    this.movies = movies
    this.seats = [...seats]
    this.count = document.querySelector('#count')
    this.total = document.querySelector('#price')
    this.selectedSeats = []
  }

  selectSeat(seat, movieIndex) {
    const seatIndex = this.seats.indexOf(seat)
    //Check if the clicked seat is already within the selected seats
    if (this.movies[movieIndex].seats.includes(seatIndex)) {
      const indexPos =
        this.movies[movieIndex].seats.indexOf(seatIndex)
      this.movies[movieIndex].seats.splice(indexPos, 1)
      this.seats[seatIndex].classList.remove('selected')
    } else {
      this.movies[movieIndex].seats.push(seatIndex)
      this.seats[seatIndex].classList.add('selected')
    }
    // this.showSeats(movieIndex)
    this.updateSelection(this.movies[movieIndex].price)
  }

  // Re-paint all seats when movie changes or tickets were bought
  showSeats(movieIndex) {
    this.seats.forEach(seat => {
      seat.classList.remove('selected')
      seat.classList.remove('occupied')
    })
    this.movies[movieIndex].seats.forEach(spot => {
      this.seats[spot].classList.add('selected')
    })
    this.movies[movieIndex].occupiedSeats.forEach(spot => {
      this.seats[spot].className = 'seat occupied'
    })
    this.updateSelection(this.movies[movieIndex].price)
  }

  updateSelection(price) {
    this.selectedSeats = document.querySelectorAll(
      '.row .seat.selected'
    )
    this.count.innerText = this.selectedSeats.length
    this.total.innerText = '$' + this.selectedSeats.length * price
  }

  async buyTickets(movieIndex) {
    const { name, price, seats } = this.movies[movieIndex]
    const spots = seats.length
    if (spots > 0) {
      const alertResult = await Swal.fire({
        titleText: 'Confirm Movie And Payment',
        html: `<div><strong>Movie:</strong> ${name}</div>
               <div><strong>Seats:</strong> ${spots} X $${price}</div>
               <div><strong>Total Payment:</strong> $${
                 spots * price
               }</div>`,
        icon: 'info',
        showCancelButton: true,
        reverseButtons: true
      })

      if (alertResult.isConfirmed) {
        await Swal.fire({
          titleText: 'Tickets Purchased!',
          text: 'Enjoy the movie 😃🍿',
          icon: 'success'
        })
        this.movies[movieIndex].occupiedSeats.push(...seats)
        this.movies[movieIndex].seats = []
        this.showSeats(movieIndex)
      }
    } else {
      Swal.fire({
        titleText: 'No seats selected',
        text: 'Please select some seats',
        icon: 'error'
      })
    }
  }

  deleteSeats(movieIndex) {
    this.movies[movieIndex].occupiedSeats = []
    this.movies[movieIndex].seats = []
    this.showSeats(movieIndex)
  }
}
