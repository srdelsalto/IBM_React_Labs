import { combineReducers } from "redux";

const counter = (state = 0, action) => {
    if (action.type === 'INCREMENT')
        //Esto incrementará el valor del contador por el valor pasado al incremento
        return state + action.inc;

    //Retornamos el estado o el valor actual del contador
    return state;
}

const myReducers = combineReducers({counter});

export default myReducers;