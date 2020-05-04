const mongoose = require('mongoose');
const EventModel = require('../models/Event');
const UserModel = require('../models/User');

// GET ALL EVENTS LIST
exports.event_list = (req, res, next) => {
    EventModel.find((err, events) => {
        if (err) {
            res.status(500).json(err);
            return next(err);
        }
        res.status(200).json(events);
    })
}

// GET ALL EVENTS LIST BY USER SORT BY DATE
exports.user_event_list = (req, res, next) => {
    const userId = req.params.userId;
    EventModel.find({ user: userId }).sort({ eventEndDate: 1 }).exec(function (err, events) {
        if (err) {
            res.status(500).json(err);
            return next(err);
        }
        res.status(200).json(events);
    });
}

// GET FULL DETAIL OF AN EVENT INCLUDING USER DETAIL
exports.user_event_detail = (req, res, next) => {
    const id = req.params.id;
    EventModel.findById(id, (err, event) => {
        if (err) return next(err);
        UserModel.findById(event.user, (err, user) => {
            if (err) return next(err);
            event.user = user;
            res.json(event);
        });
    });
}

// ADD AN EVENT
exports.event_add = (req, res, next) => {
    const newEvent = req.body;
    EventModel.create(newEvent, (err, event) => {
        if (err) return next(err);
        res.json(event);
    });
}

// UPDATE AN EVENT
exports.event_update = (req, res, next) => {
    const id = req.params.id;
    const updatedEvent = req.body;
    EventModel.findByIdAndUpdate(id, updatedEvent, (err, event) => {
        if (err) return next(err);
        res.json(updatedEvent);
    });
}

// DELETE AN EVENT
exports.event_delete = (req, res, next) => {
    const id = req.params.id;
    EventModel.findByIdAndDelete(id, (err, event) => {
        if (err) return next(err);
        res.json(event);
    });
}

