class Cinema {
    constructor(movies, seats) {
        this.movies = movies
        this.seats = [...seats]
        this.count = document.querySelector('#count')
        this.total = document.querySelector('#price')
        this.selectedSeat = []
        console.log(this)
    }

    setSeats(seat, movieIndex) {
        const seatIndex = this.seats.indexOf(seat)
        this.movies[movieIndex].seats.push(seatIndex)
        console.log(this.movies[movieIndex].seats)
    
    }

    selectSeat(seat , movieIndex) {
        seat.classList.toggle('selected')
        this.setSeats(seat, movieIndex)
    }

    updateSelection(ticketPrice) {
        this.selectedSeats = document.querySelectorAll('.row .seat.selected')
        this.count.innerText = this.selectedSeats.length
        this.total.innerText = '$' + this.selectedSeats.length * ticketPrice
    }

    buyTickets(movieTitle, selectedSeats, spots, ticketPrice) {
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
                    swal('Tickets Purchased!', 'Enjoy the movie 😃🍿', 'success')
                }

                selectedSeats.forEach(seat => {
                    seat.className = 'seat occupied'
                })
                this.updateSelection(ticketPrice)
            })
        }
    }
}