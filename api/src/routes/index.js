const e = require('express');
const { Router } = require('express');
const { CHARACTERS_URL } = require('../consts');
const axios = require('axios');
const { Occupation, Character } = require('../db');

// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

const getApiInfo = async () => {
	const apiUrl = await axios.get(CHARACTERS_URL);
	const apiInfo = await apiUrl.data.map((c) => {
		return {
			id: c.char_id,
			name: c.name,
			nickname: c.nickname,
			birthday: c.birthday,
			status: c.status,
			img: c.img,
			occupation: c.occupation.map((o) => o)
			//appearance: c.appearance.map((a) => a)
		};
	});
	return apiInfo;
};

const getDbInfo = async () => {
	return await Character.findAll({
		include: {
			model: Occupation,
			attributes: ['name'],
			through: { attributes: [] }
		}
	});
};

const getAllCharacters = async () => {
	const apiInfo = await getApiInfo();
	const dbInfo = await getDbInfo();
	const allInfo = apiInfo.concat(dbInfo);
	return allInfo;
};

router.get('/characters', async (req, res) => {
	//http://localhost/3001/characters?name=name
	const name = req.query.name;
	const allCharacters = await getAllCharacters();
	if (name) {
		const characterByName = await allCharacters.filter((c) =>
			c.name.toLowerCase().includes(name.toLocaleLowerCase())
		);
		if (characterByName.length) res.status(200).send(characterByName);
		else res.status(404).send('Character not found');
	} else {
		res.status(200).json(allCharacters);
	}
});

router.get('/occupations', async (req, res) => {
	const occupationsApi = await axios.get(CHARACTERS_URL);
	const occupations = occupationsApi.data.map((c) => c.occupation);
	const occEach = occupations.map((o) => {
		for (let i = 0; i < o.length; i++) return o[i];
	});
	occEach.forEach((o) => {
		Occupation.findOrCreate({
			where: { name: o }
		});
	});
	const allOccupations = await Occupation.findAll();
	const allOccupationsOrdered = allOccupations.sort((a, b) => {
		if (a.name > b.name) return 1;
		if (a.name < b.name) return -1;
		return 0;
	});
	res.send(allOccupationsOrdered);
});

router.post('/characters', async (req, res) => {
	const { name, nickname, birthday, img, status, createdInDb, occupation } =
		req.body;
	const charactedCreated = await Character.create({
		name,
		nickname,
		birthday,
		img,
		status,
		createdInDb
	});
	const occupationDb = await Occupation.findAll({
		where: { name: occupation }
	});
	charactedCreated.addOccupation(occupationDb);
	res.send('Character created');
});

router.get('/characters/:id', async (req, res) => {
	const { id } = req.params;
	const AllCharacters = await getAllCharacters();
	if (id) {
		const characterId = await AllCharacters.filter((c) => c.id == id);
		if (characterId.length) res.status(200).json(characterId);
		else res.status(404).send('Character not found');
	}
});

module.exports = router;
