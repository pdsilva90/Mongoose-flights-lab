const Flight = require('../models/flight');
const Ticket = require('../models/ticket');

module.exports = {
    index, 
    show, 
    new: newFlight,
    create,
    addDestination,
    // new: newTicket,
    addTicket
}

function index(req, res) {
    Flight.find({}, function(err, flights) {
        console.log(flights)
        res.render('flights/index', { title: 'All Flights', flights});
    });
}

function show(req, res, next) {
    Flight.findById(req.params.id, function (err, flight) {
      if (err) return res.redirect('/flights');
      Ticket.find({flight: flight._id}, function(err2, tickets) {
        res.render('flights/show', { flight, tickets });
      });
    });
  };

function newFlight(req, res) {
    res.render('flights/new', {title: 'Add Flight'});
}


function create(req, res) {
    console.log(req.body)
    var flight = new Flight(req.body);
    flight.save(function(err) {
        if (err) return res.render('flights/new');
        res.redirect('/flights');
    })
}

function addDestination(req, res, next) {
    Flight.findById(req.params.id, function(err, flight) {
      flight.destinations.push(req.body);
      flight.save(function(err, flight) {
          res.redirect(`/flights/${flight._id}`);
      });
    });
  }

//   function newTicket(req, res) {
//     res.render('tickets/new', {flightId: req.params.id})
// }

function addTicket(req, res, next) {
    const seat = req.body.seat;
    const price = req.body.price;
    const flight = req.params.id;
    const ticket = new Ticket({seat, price, flight});
    ticket.save(function(err) {
        if (err) return res.render('flights/new');
        res.redirect(`/flights/${req.params.id}`);
    });
  };