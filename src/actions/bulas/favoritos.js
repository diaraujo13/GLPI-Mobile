import db from "../../config";

export const getFavoritesButcher = () => (
    (dispatch, getState)=> {
        
        db.transaction((tx) => {
            tx.executeSql('SELECT bula.id, bula.title FROM historico JOIN bula WHERE historico.bulaId = bula.id GROUP BY historico.bulaId ORDER BY historico.id DESC', [], (tx, results) => {

                let rows = results.rows.raw();


                dispatch(setBulas(rows));
            });
        });
    }
)

export const getFavorites = (favorite_rows) => ({
  type: 'GET_FAV',
  payloads: favorite_rows
});
