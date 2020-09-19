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
        : this.movies[movieIndex].seats.splice(seatIndex, 0, seatIndex)
    }

    selectSeat(seat , movieIndex) {
        this.setSeats(seat, movieIndex)
        this.showSeats(movieIndex)
    }

    showSeats(index) {
        this.seats.forEach(seat => {
            seat.classList.remove('selected')
            seat.classList.remove('occupied')
        })
        this.movies[index].seats.forEach(spot => {
            this.seats[spot].classList.add('selected')
        })
        this.movies[index].occupiedSeats.forEach(spot => {
            this.seats[spot].className = 'seat occupied'
        })
        this.updateSelection(this.movies[index].price)
        
        console.log(this.movies[index])
    }

    updateSelection(price) {
        this.selectedSeats = document.querySelectorAll('.row .seat.selected')
        this.count.innerText = this.selectedSeats.length
        this.total.innerText = '$' + this.selectedSeats.length * price
    }

    buyTickets(index) {
        const {name, price, seats} = this.movies[index]
        const spots = seats.length
        if (spots > 0) {
            swal({
                title: 'Confirm Movie And Payment',
                text: `${name}
                Spots: ${spots}
                Total Payment: ${spots*price}`,
                icon: 'warning',
                buttons: true
            })
            .then(value => {
                if (value) {
                    swal('Tickets Purchased!',
                    'Enjoy the movie 😃🍿',
                    'success')
                    this.movies[index].occupiedSeats.push(...seats)
                    this.showSeats(index)
                }
            })
        }
        else {
            swal('No seats selected',
            'Please select some seats',
            'error')
        }
    }

    deleteSeats(index) {
        this.movies[index].occupiedSeats = []
        this.movies[index].seats = []
        this.showSeats(index)
    }
}