class Cinema {
    constructor(movies, seats) {
        this.movies = movies
        this.seats = [...seats]
        this.count = document.querySelector('#count')
        this.total = document.querySelector('#price')
        this.selectedSeat = []
    }

    selectSeat(seat, index) {
        const seatIndex = this.seats.indexOf(seat)
        //Check if the clicked seat is already within the selected seats
        if (this.movies[index].seats.includes(seatIndex)) {
            const indexPos = this.movies[index].seats.indexOf(seatIndex)
            this.movies[index].seats.splice(indexPos, 1)
        } 
        else {
            this.movies[index].seats.push(seatIndex)
        }
        this.showSeats(index)
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
        console.clear()
        console.log(this.movies[index].seats)
        // console.log(this.movies[index].occupiedSeats)
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
                    //Add purchased seats to the array of occupied seats and then remove then from the selected seats array
                    this.movies[index].occupiedSeats.push(...seats)
                    this.movies[index].seats = []
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