class Cinema {
    constructor(movies, seats) {
        this.movies = movies
        this.seats = [...seats]
        this.count = document.querySelector('#count')
        this.total = document.querySelector('#price')
        this.selectedSeat = []
    }

    setSeats(seat, movieIndex) {
        const seatIndex = this.seats.indexOf(seat)
        seatIndex in this.movies[movieIndex].seats
        ? this.movies[movieIndex].seats.splice(seatIndex, 1)
        : this.movies[movieIndex].seats.splice(seatIndex, 0 , seatIndex)
        console.log(this.movies[movieIndex].seats)
    
    }

    selectSeat(seat , movieIndex) {
        seat.classList.toggle('selected')
        this.setSeats(seat, movieIndex)
        this.updateSelection(this.movies[movieIndex].price)
    }

    showSeats(index) {
        console.log(this.movies[index])
        this.seats.forEach(seat => {
            seat.classList.remove('selected')
            seat.classList.remove('occupied')
        })
        this.movies[index].seats.forEach(spot => {
            this.seats[spot].classList.add('selected')
        })
        this.movies[index].occupiedSeats.forEach(spot => {
           spot.className = 'seat occupied'
        })
        this.updateSelection(this.movies[index].price)

    }

    updateSelection(price) {
        this.selectedSeats = document.querySelectorAll('.row .seat.selected')
        this.count.innerText = this.selectedSeats.length
        this.total.innerText = '$' + this.selectedSeats.length * price
    }


    buyTickets(index, selectedSeats, spots) {
        const { name:movieTitle, price:ticketPrice, occupiedSeats } = this.movies[index]
        if (spots > 0) {
            swal({
                title: 'Confirm Movie And Payment',
                text: `${movieTitle}
                Spots: ${spots}
                Total Payment: ${spots*ticketPrice}`,
                icon: 'warning',
                buttons: true
            })
            .then(value => {
                if (value) {
                    swal('Tickets Purchased!',
                    'Enjoy the movie 😃🍿',
                    'success')
                    selectedSeats.forEach(seat => {
                        seat.className = 'seat occupied'
                    })
                    occupiedSeats.push(...selectedSeats)
                    this.updateSelection(ticketPrice)
                }
            })
        } else {
            swal('No seats selected',
            'Please select some seats',
            'error')
        }
    }

    deleteSeats(seats, index) {
        seats.forEach(seat => {
            seat.classList.remove('occupied')
        })

        this.movies[index].occupiedSeats = []
        this.movies[index].seats = []
        this.showSeats(index)
    }
}