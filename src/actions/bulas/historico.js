import db from "../../config";



export const addHistory = () => {
    return (dispatch, getState) => {
        let selected = getState().bulas.selected || '';

        db.transaction((tx) => {
            tx.executeSql('INSERT INTO historico (bulaId) VALUES (' + selected + ')', [], (tx, results) => {
            });
        });

    };
};


export const selectHistorico = () => (
  (dispatch, getState) => {

    db.transaction((tx) => {
        tx.executeSql('SELECT bula.id, bula.title FROM historico JOIN bula WHERE historico.bulaId = bula.id GROUP BY historico.bulaId ORDER BY historico.id DESC LIMIT 10', [], (tx, results) => {
            let rows = results.rows.raw();
            dispatch(getHistorico(rows));
        });
    });

  }
)

export const getHistorico = (rows) => ({
  type: 'GET_HISTORICO',
  payload: rows
})
