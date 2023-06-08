import {createContext, useContext, useState} from "react";

const StateContext = createContext({
    currentUser: {},
    userToken: null,
    citys: [],
    setCurrentUser: () => {},
    setUserToken: () => {}
})

const tmpCitys = [
    {
        id: 1,
        nome: 'BH',
        estado: 'MG',
        dt_fundacao: '02/02/1999',
        bairro: ['Aparecida']
    },
    {
        id: 2,
        nome: 'BH',
        estado: 'MG',
        dt_fundacao: '02/02/1999',
        bairro: ['Aparecida']
    },
    {
        id: 3,
        nome: 'BH',
        estado: 'MG',
        dt_fundacao: '02/02/1999',
        bairro: ['Aparecida']
    }
]

export const ContextProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState({});
    const [userToken, _setUserToken] = useState(localStorage.getItem('TOKEN') || '');
    const [citys, setCitys] = useState(tmpCitys);

    const setUserToken = (token) =>  {
        if (token) {
            localStorage.setItem('TOKEN', token);
        } else {
            localStorage.removeItem('TOKEN');
        }
        _setUserToken(token);
    }

    return (
        <StateContext.Provider value={{
            currentUser,
            setCurrentUser,
            userToken,
            setUserToken,
            citys
        }}>
            { children }
        </StateContext.Provider>
    )
}

export const useStateContext = () => useContext(StateContext)
