class Movie {
    constructor(name, price) {
        this.name = name;
        this.price = price;
        this.seats = [], //Arrays containing indexes of the seats (position within the global array of seats)
        this.occupiedSeats = []
    }
}