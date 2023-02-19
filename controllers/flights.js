const Flight = require('../models/flight');

module.exports = {
    index, 
    show, 
    new: newFlight,
    create,
    addDestination,
}

function index(req, res) {
    Flight.find({}, function(err, flights) {
        console.log(flights)
        res.render('flights/index', { title: 'All Flights', flights});
    });
}

function show(req, res) {
    Flight.findById(req.params.id, function(err, flight){
        if (err) return res.redirect('/flights');
        res.render('flights/show', {title: 'Flight Details', flight});
    });
}

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
