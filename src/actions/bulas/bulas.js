import {
    LIST_ALL_BULAS,
    SET_BULAS,
    SET_CAT,
    ADD_PAGE,
    RESET_PAGE,
    SELECT_BULA,
    DETAILS_BULA
} from "../types";
import {
    setLoading
} from "../util";
import db from '../../config';

export const getBulas = () => {
    return (dispatch, getState) => {


        let category = getState().bulas.category.toUpperCase() || 'A';
        let page = getState().bulas.page || 1;

        db.transaction((tx) => {
            tx.executeSql('SELECT id, title FROM bula WHERE categ=(?)', [category], (tx, results) => {

                let rows = results.rows.raw();


                dispatch(setBulas(rows));
            });
        });

    };
};


export const searchBulas = () => {
    return (dispatch, getState) => {

        let searchKey = getState().bulas.searchKey || '';

        db.transaction((tx) => {
            tx.executeSql('SELECT id, title FROM bula WHERE title LIKE %' + searchKey + '% LIMIT 5', [], (tx, results) => {

                let rows = results.rows.raw();

                dispatch(setBulas(rows));
            });
        });

    };
};



export const bulaDetails = () => {
    return (dispatch, getState) => {

        dispatch(setLoading(true));

        let selected = getState().bulas.selected || '';


        db.transaction((tx) => {
            tx.executeSql('SELECT * FROM bula WHERE id = ' + selected, [], (tx, results) => {
                let rows = results.rows.raw();

                dispatch(setLoading(false));
                dispatch(selectBulaDetails(rows[0]))
            });
        });

    };
};


export const selectBulaDetails = (bula) => {
    return {
        type: DETAILS_BULA,
        payload: bula
    }
}
export const setBulas = (rows) => {

    return {
        type: SET_BULAS,
        bulas: rows
    }
};

export const setCat = (category) => {

    return {
        type: SET_CAT,
        category
    }
};

export const resetPage = () => {

    return {
        type: RESET_PAGE
    }
};


export const nextPage = () => {

    return {
        type: ADD_PAGE
    }
};

export const selectBula = (id) => {
    return {
        type: SELECT_BULA,
        payload: id
    }
}