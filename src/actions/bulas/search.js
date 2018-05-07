import db from "../../config";

export const SET_SEARCH_KEY = 'SET_SEARCH_KEY';
export const GET_RESULT_SEARCH = 'GET_RESULT_SEARCH';

export const setSearchKey = (param) => ({
  type: SET_SEARCH_KEY,
  payload: param
});

export const getSearchResult = (param) => ({
  type: GET_RESULT_SEARCH,
  payload: param
});

//********************************************* */
//********************************************* */

export const querySearch = (text) => {

 return (dispatch, getState) => {
  
    console.log('query', text);

    db.transaction((tx) => {
    tx.executeSql("SELECT bula.id, bula.title FROM bula WHERE bula.title LIKE '%"+text+"%' LIMIT 4", [], (tx, results) => {

            console.log('tx', tx);
            console.log('results', results);
            let rows = results.rows.raw();

            console.log(rows);
            dispatch(getSearchResult(rows));
        });
    });
}}

