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

  buyTickets(movieIndex) {
    const { name, price, seats } = this.movies[movieIndex]
    const spots = seats.length
    if (spots > 0) {
      swal({
        title: 'Confirm Movie And Payment',
        text: `${name}
                Spots: ${spots}
                Total Payment: ${spots * price}`,
        icon: 'warning',
        buttons: true
      }).then(value => {
        if (value) {
          swal(
            'Tickets Purchased!',
            'Enjoy the movie 😃🍿',
            'success'
          )
          //Add purchased seats to the array of occupied seats and then remove then from the selected seats array
          this.movies[movieIndex].occupiedSeats.push(...seats)
          this.movies[movieIndex].seats = []
          this.showSeats(movieIndex)
        }
      })
    } else {
      swal('No seats selected', 'Please select some seats', 'error')
    }
  }

  deleteSeats(movieIndex) {
    this.movies[movieIndex].occupiedSeats = []
    this.movies[movieIndex].seats = []
    this.showSeats(movieIndex)
  }
}
