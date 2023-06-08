import PageComponent from "../components/PageComponent.jsx";
import CityListItem from "../components/CityListItem.jsx";
import TButton from "../components/core/TButton.jsx";
import { PlusCircleIcon } from "@heroicons/react/24/outline/index.js";
import { useEffect, useState } from "react";
import axiosClient from "../axios.js";
import PaginationLinks from "../components/PaginationLinks.jsx";
import router from "../router.jsx";

export default function DashBoard() {
    const [citys, setCitys] = useState([]);
    const [meta, setMeta] = useState({});
    const [loading, setLoading] = useState(false);
    const onDeleteClick = (id) => {
        if (window.confirm('Deseja mesmo apagar o registro?')) {
            axiosClient.delete(`/cidade/${id}`).then(() => {
                router.navigate('/relatorio');
            });
        }
    }

    const onPageClick = (link) => {
        getCitys(link.url);
    }

    const getCitys = (url) => {
        url = url || '/cidade';
        setLoading(true);
        axiosClient.get(url).then(({data}) => {
            setCitys(data.data);
            setMeta(data.meta);
            setLoading(false);
        })
    }

    useEffect(() => {
        getCitys();
    }, []);

    const applyFilters = (filtersData) => {
        if (!isObjEmpty(filtersData)) {
            setLoading(true);
            axiosClient.get('/cidade', {
                params: {
                    cidade: filtersData.cidade,
                    bairro: filtersData.bairro,
                    dataInicio: filtersData.dataInicio,
                    dataFim: filtersData.dataFim
                }
            }).then(({ data }) => {
                setCitys(data.data);
                setMeta(data.meta);
                setLoading(false);
            });
        } else {
            getCitys();
        }
    }

    function isObjEmpty(objeto) {
        return Object.values(objeto).every((valor) => valor === '');
    }

    return(
        <PageComponent title='Relatório' filters={true}
            applyFilters={applyFilters}
            buttons={
            <div className="flex items-center">
                <TButton color="green" to="/cadastro/cidade" mr={true}>
                    <PlusCircleIcon className="h-5 w-5 mr-2" />
                    Nova cidade
                </TButton>
                <TButton color="green" to="/cadastro/bairro">
                    <PlusCircleIcon className="h-5 w-5 mr-2" />
                    Novo bairro
                </TButton>
            </div>
            }
        >
            {loading && <div className="text-center text-lg">Carregando...</div>}
            {!loading && <div>
                <div className='grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3'>
                    {citys.map(city => (
                        <CityListItem city={city} key={city.id} onDeleteClick={onDeleteClick} />
                    ))}
                </div>

                <PaginationLinks meta={meta} onPageClick={onPageClick} />
            </div>}
        </PageComponent>
    )
}
