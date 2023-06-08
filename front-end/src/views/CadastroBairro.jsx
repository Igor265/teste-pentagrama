import PageComponent from "../components/PageComponent.jsx";
import { useEffect, useState } from "react";
import TButton from "../components/core/TButton.jsx";
import axiosClient from "../axios.js";
import { useNavigate } from "react-router-dom";

export default function CadastroCidade() {
    const navigate = useNavigate();
    const [neighborhood, setNeighborhood] = useState({
        bairro: "",
        cidade: ""
    });
    const [citys, setCitys] = useState({});

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
