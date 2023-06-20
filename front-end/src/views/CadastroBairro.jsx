import PageComponent from "../components/PageComponent.jsx";
import { useEffect, useState } from "react";
import TButton from "../components/core/TButton.jsx";
import axiosClient from "../axios.js";
import { useNavigate } from "react-router-dom";
import {PlusSmallIcon, TrashIcon} from "@heroicons/react/24/outline/index.js";

export default function CadastroCidade() {
    const navigate = useNavigate();
    const [neighborhood, setNeighborhood] = useState({
        bairro: "",
        cidade: "",
        cep: []
    });
    const [citys, setCitys] = useState({});
    const [inputFields, setInputFields] = useState([
        { cep: '' }
    ]);

    useEffect(() => {
        axiosClient.get('/list').then((response) => {
            setCitys(response.data);
        });
    }, []);

    const onSubmit = (e) => {
        e.preventDefault();
        axiosClient.post('/cadastrar/bairro', {
            ...neighborhood
        }).then(res => {
            navigate('/relatorio');
        })
    }

    const addFields = () => {
        let newfield = { cep: '' };
        setInputFields([...inputFields, newfield]);
    }

    const removeFields = (index) => {
        let data = [{ cep: '' }];
        if (index !== 0) {
            data = [...inputFields];
            data.splice(index, 1)
        }
        setInputFields(data);
        setNeighborhood({...neighborhood, cep: [...data]});
    }

    const handleFormChange = (index, e) => {
        const re = /^[0-9\b]+$/;
        let data = [...inputFields];
        if (e.target.value === '' || re.test(e.target.value)) {
            data[index][e.target.name] = e.target.value;
            setInputFields(data);
            setNeighborhood({...neighborhood, cep: [...data]});
        }
    }

    return(
        <PageComponent title='Cadastro bairro' >
            <form action="#" method="POST" onSubmit={onSubmit}>
                <div className="shadow sm:overflow-hidden sm:rounded-md">
                    <div className="space-y-6 bg-white px-4 py-5 sm:p-6">
                        <div className="col-span-6 sm:col-span-3">
                            <label htmlFor="bairro" className="block text-sm font-medium text-gray-700">
                                Bairro
                            </label>
                            <input
                                type="text"
                                name="bairro"
                                id="bairro"
                                required
                                value={neighborhood.bairro}
                                onChange={(e) => setNeighborhood({...neighborhood, bairro: e.target.value})}
                                placeholder="Centro"
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm
                                focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                            />
                        </div>
                        {inputFields.map((input, index) => {
                            return (
                                <div className="col-span-6 sm:col-span-3" key={index}>
                                    <label htmlFor="cep" className="block text-sm font-medium text-gray-700">
                                        CEP
                                    </label>
                                    <div className="flex">
                                        <input
                                            type="text"
                                            name="cep"
                                            id="cep"
                                            value={input.cep}
                                            onChange={(e) => handleFormChange(index, e)}
                                            placeholder="01001000"
                                            maxLength="8"
                                            minLength="8"
                                            required
                                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm
                                    focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                        />
                                        <TButton onClick={() => removeFields(index)} link color="red">
                                            <TrashIcon className="w-5 h-5" />
                                        </TButton>
                                    </div>
                                </div>
                            )
                        })}
                        <TButton onClick={addFields} color="green">
                            Adicionar CEP
                        </TButton>
                        <div className="col-span-6 sm:col-span-3">
                            <label htmlFor="cidade" className="block text-sm font-medium leading-6 text-gray-900">
                                Cidade
                            </label>
                            <select
                                id="cidade"
                                name="cidade"
                                required
                                value={neighborhood.cidade}
                                onChange={(e) => {
                                    setNeighborhood({ ...neighborhood, cidade: e.target.value });
                                }}
                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                            >
                                <option value=''>Selecione uma cidade</option>
                                {citys.length ? citys.map((city) => {
                                    return <option key={city.id} value={city.id}>
                                        {city.nome}
                                    </option>
                                }) : null }
                            </select>
                        </div>
                    </div>
                    <div className="bg-gray-50 px-4 py-3 text-right sm:px-6">
                        <TButton color="green">
                            Salvar
                        </TButton>
                    </div>
                </div>
            </form>
        </PageComponent>
    )
}
