import axios from 'axios';

export function getCharacters() {
	return async function (dispatch) {
		const allCharacters = await axios.get('http://localhost:3001/characters');
		return dispatch({
			type: 'GET_CHARACTERS',
			payload: allCharacters.data
		});
	};
}

export function filterCharacterByStatus(payload) {
	return {
		type: 'FILTER_BY_STATUS',
		payload
	};
}

export function filterCharacterByCreation(payload) {
	return {
		type: 'FILTER_BY_CREATION',
		payload
	};
}

export function orderByName(payload) {
	return {
		type: 'ORDER_BY_NAME',
		payload
	};
}

export function searchByName(payload) {
	return async function (dispatch) {
		try {
			const json = await axios.get(
				`http://localhost:3001/characters?name=${payload}`
			);
			return dispatch({
				type: 'GET_NAME_CHARACTERS',
				payload: json.data
			});
		} catch (error) {
			console.log(error);
		}
	};
}

export function getOccupations() {
	return async function (dispatch) {
		const info = await axios.get('http://localhost:3001/occupations');
		return dispatch({ type: 'GET_OCCUPATIONS', payload: info.data });
	};
}

export function postCharacter(payload) {
	return async function (dispatch) {
		const response = await axios.post(
			'http://localhost:3001/characters',
			payload
		);
		return response;
	};
}

export function getDetails(id) {
	return async function (dispatch) {
		try {
			const json = await axios.get(`http://localhost:3001/characters/${id}`);
			return dispatch({
				type: 'GET_DETAILS',
				payload: json.data
			});
		} catch (error) {
			console.log(error);
		}
	};
}
