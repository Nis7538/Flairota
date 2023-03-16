export const initialState = {
    searchedtext: '',
};
const reducer = (state, action) => {
    //console.log(action);
    switch (action.type) {
        case 'SET_searchedtext':
            return {
                ...state,
                searchedtext: action.searchedtext,
            };

        default:
            return state;
    }
};

export default reducer;
