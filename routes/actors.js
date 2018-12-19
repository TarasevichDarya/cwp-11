const express = require('express');
const router = express.Router();
let actors = require('../actors.json');
const logger = require('./logs/log.js');

router.get('/readall', (req, res) => {
	logger.log(`${req.url.toString()}\n`);
	res.send(actors.sort((a, b) => { return a.liked - b.liked; }).reverse());    
});

router.get('/read', (req, res) => {

	if (!req.body.id) res.send({'error': '\"id\" arg not found'});
	else {
		let r = actors.find(actors => actors.id == req.body.id);
		if (!r) res.send({});
		else res.send(r);
	}

});

router.post('/create', (req, res) => {
	logger.log(`${req.url.toString()}\n`);
	req = req.body;
	if (!req.name || !req.birth || !req.films || !req.liked || !req.photo)
		res.json({'error': 'one or more args not found'});

	else {
		let isErr = false;
		let obj = {};
		obj.id = Date.now();
		obj.name = req.name;
		obj.birth = req.birth;
		
		obj.films = parseFloat(req.films) < 0 ? isErr = true : req.films;
		obj.liked = parseFloat(req.liked) < 0 ? isErr = true : req.liked;
		obj.photo = req.photo;

		if (isErr) res.json({'error': 'request error'});
		else {
			actors.push(obj);
		}
		res.json(obj);
	}
});

router.post('/update', (req, res) => {
	logger.log(`${req.url.toString()}\n`);
	req = req.body;
	if (!req.id) res.json({'error': '\"id\" arg not found'});
	else {
		let id = parseInt(req.id);
		let actor = actors[actors.findIndex(i => i.id == id)];
		if (!actor) res.json({'error': `item with id: ${id} not found`});
		else {
			let isErr = false;
			if (req.name !== undefined) actor.name = req.name;
			if (req.birth !== undefined) actor.birth = req.birth;//если поля нет , то будет ошибка
			if (req.films !== undefined) actor.films = parseFloat(req.films) < 0 ? isErr = true : req.films;
			if (req.liked !== undefined) actor.liked = parseFloat(req.liked) < 0 ? isErr = true : req.liked;
			if (req.photo !== undefined) actor.photo = req.photo;

			if (isErr) res.json({'error': 'request error'});
			else res.json(actor);
		}
	}
});

router.post('/delete', (req, res) => {
	logger.log(`${req.url.toString()}\n`);
	req = req.body;
	if (!req.id) res.json({'error': '\"id\" arg not found'});
	else {
		let id = parseInt(req.id);
		let actorIndex = actors.findIndex(i => i.id === id);
		if (actorIndex < 0) res.json({'error': `item with id: ${id} not found`});
		else {
			actors.splice(actorIndex, 1);
			res.json(actors);
		}
	}
});

module.exports = router;
