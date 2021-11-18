const initialState = {
	allCharacters: [],
	allCharactersCopy: [],
	occupations: [],
	details: []
};

function rootReducer(state = initialState, action) {
	switch (action.type) {
		case 'GET_CHARACTERS':
			return {
				...state,
				allCharacters: action.payload,
				allCharactersCopy: action.payload
			};
		case 'FILTER_BY_STATUS':
			const allCharacters = state.allCharactersCopy;
			const charactersFiltered =
				action.payload === 'All'
					? allCharacters
					: allCharacters.filter((c) => c.status === action.payload);
			return {
				...state,
				allCharacters: charactersFiltered
			};
		case 'FILTER_BY_CREATION':
			const createdFilter =
				action.payload === 'Created'
					? state.allCharactersCopy.filter((c) => c.createdInDb)
					: state.allCharactersCopy.filter((c) => !c.createdInDb);
			return {
				...state,
				allCharacters: createdFilter
			};
		case 'ORDER_BY_NAME':
			const sortedArr =
				action.payload === 'Ascendent'
					? state.allCharacters.sort(function (a, b) {
							if (a.name > b.name) {
								return 1;
							}
							if (b.name > a.name) {
								return -1;
							}
							return 0;
					  })
					: state.allCharacters.sort(function (a, b) {
							if (a.name > b.name) {
								return -1;
							}
							if (b.name > a.name) {
								return 1;
							}
							return 0;
					  });
			return {
				...state,
				allCharacters: sortedArr
			};
		case 'GET_NAME_CHARACTERS':
			return {
				...state,
				allCharacters: action.payload
			};
		case 'GET_OCCUPATIONS':
			return {
				...state,
				occupations: action.payload
			};
		case 'POST_CHARACTER':
			return {
				...state
			};
		case 'GET_DETAILS':
			return {
				...state,
				details: action.payload
			};
		default:
			return state;
	}
}

export default rootReducer;
