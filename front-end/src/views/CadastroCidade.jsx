import PageComponent from "../components/PageComponent.jsx";
import { useEffect, useState } from "react";
import TButton from "../components/core/TButton.jsx";
import axiosClient from "../axios.js";
import { useLocation, useNavigate, useParams } from "react-router-dom";

export default function CadastroCidade() {
    const location = useLocation();
    const navigate = useNavigate();
    const { id } = useParams();
    const [city, setCity] = useState({
        nome: "",
        estado: "",
        bairro: [],
        dt_fundacao: ""
    });
    const [loading, setLoading] = useState(false);
    const [neighborhood, setNeighborhood] = useState({
        bairro: []
    });

    const onSubmit = (e) => {
        e.preventDefault();
        let res = null
        if (id) {
            res = axiosClient.put(`/cidade/${id}`, {
                ...city
            });
        } else {
            res = axiosClient.post('/cidade', {
                ...city
            });
        }
        res.then(res => {
            navigate('/relatorio');
        });
    }

    const limparCampos = () => {
        setCity({
            nome: "",
            estado: "",
            bairro: [],
            dt_fundacao: ""
        });
        setNeighborhood({
            bairro: []
        });
    };


    useEffect(() => {
        if (id) {
            setLoading(true);
            axiosClient.get(`/cidade/${id}`).then(({ data }) => {
                setCity(data.city[0]);
                setNeighborhood(data.neighborhoods);
                setLoading(false);
            });
        }
    }, []);

    useEffect(() => {
        limparCampos();
    }, [location]);

    function criarData(dataString) {
        if (dataString.includes('/')) {
            const partes = dataString.split('/');
            const dia = partes[0];
            const mes = partes[1];
            const ano = partes[2];
            return `${ano}-${mes.toString().padStart(2, '0')}-${dia.toString().padStart(2, '0')}`;
        }
        return dataString;
    }



    return(
        <PageComponent title={!id ? "Cadastro cidade" : "Alterar cidade"} >
            {loading && <div className="text-center text-lg">Carregando...</div>}
            {!loading && (
                <form action="#" method="POST" onSubmit={onSubmit}>
                    <div className="shadow sm:overflow-hidden sm:rounded-md">
                        <div className="space-y-6 bg-white px-4 py-5 sm:p-6">
                            <div className="col-span-6 sm:col-span-3">
                                <label htmlFor="nome" className="block text-sm font-medium text-gray-700">
                                    Cidade
                                </label>
                                <input
                                    type="text"
                                    name="nome"
                                    id="nome"
                                    value={city.nome}
                                    onChange={(e) => setCity({...city, nome: e.target.value})}
                                    placeholder="Belo Horizonte"
                                    required
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm
                                focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                />
                            </div>
                            <div className="col-span-6 sm:col-span-3">
                                <label htmlFor="estado" className="block text-sm font-medium text-gray-700">
                                    Estado
                                </label>
                                <input
                                    type="text"
                                    name="estado"
                                    id="estado"
                                    value={city.estado}
                                    onChange={(e) => setCity({...city, estado: e.target.value})}
                                    placeholder="MG"
                                    required
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm
                                focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                />
                            </div>
                            <div className="col-span-6 sm:col-span-3">
                                <label htmlFor="dt_fundacao" className="block text-sm font-medium text-gray-700">
                                    Data da fundação
                                </label>
                                <input
                                    type="date"
                                    name="dt_fundacao"
                                    id="dt_fundacao"
                                    required
                                    value={criarData(city.dt_fundacao)}
                                    onChange={(e) => setCity({...city, dt_fundacao: e.target.value})}
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm
                                focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                />
                            </div>
                            {neighborhood && neighborhood.length > 0 && (
                                <div className="col-span-6 sm:col-span-3">
                                    <label htmlFor="bairro" className="block text-sm font-medium text-gray-700">
                                        Bairro
                                    </label>
                                    <input
                                        type="text"
                                        id="estado"
                                        value={neighborhood.length > 1 ? neighborhood.join(', ') : neighborhood[0]}
                                        required
                                        disabled
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm bg-gray-100
                                    focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm cursor-not-allowed"
                                    />
                                </div>
                            )}
                        </div>
                        <div className="bg-gray-50 px-4 py-3 text-right sm:px-6">
                            <TButton color="green">
                                Salvar
                            </TButton>
                        </div>
                    </div>
                </form>
            )}
        </PageComponent>
    )
}
