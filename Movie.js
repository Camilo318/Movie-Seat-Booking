class Movie {
  constructor(name, price) {
    this.name = name
    this.price = price
    this.seats = [] //Array containing indexes of the seats (position within the global array of seats)
    this.occupiedSeats = []
  }
}
