import { ADD_IMAGE, DEL_IMAGE, SET_IMAGE } from "./types";


export const addImage = (param) => ({
    type: ADD_IMAGE,
    payload: param
});

export const delImage = (param) => ({
    type: DEL_IMAGE,
    payload: param
});

/**
 * 
 * @param {Object}
 *       Define a imagem temporária que será exibida no ConfirmPic
 *       e a próxima a ser feita o upload e a próxima a ser adicionada
 *       no `addImage`
 */
export const setImage = (param) => ({
    type: SET_IMAGE,
    payload: param
});
