import TButton from "./TButton.jsx";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline/index.js";
import {useState} from "react";

export default function Filters({ applyFilters }) {
    const [filters, setFilters] = useState({
        cidade: '',
        bairro: '',
        dataInicio: '',
        dataFim: ''
    });

    function onClick(e, filters) {
        e.preventDefault();
        applyFilters(filters);
    }

    return (
        <div className="flex justify-between items-end h-full mb-2">
            <div className="col-span-6 sm:col-span-3">
                <label htmlFor="cidade" className="block text-sm font-medium text-gray-700">
                    Cidade
                </label>
                <input
                    type="text"
                    name="cidade"
                    id="cidade"
                    value={filters.cidade}
                    onChange={(e) => setFilters({...filters, cidade: e.target.value})}
                    placeholder="Belo Horizonte"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm
                            focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                />
            </div>
            <div className="col-span-6 sm:col-span-3">
                <label htmlFor="bairro" className="block text-sm font-medium text-gray-700">
                    Bairro
                </label>
                <input
                    type="text"
                    name="bairro"
                    id="bairro"
                    value={filters.bairro}
                    onChange={(e) => setFilters({...filters, bairro: e.target.value})}
                    placeholder="Centro"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm
                            focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                />
            </div>
            <div className="col-span-6 sm:col-span-3 flex justify-between">
                <div className="mr-2">
                    <label htmlFor="dataInicio" className="block text-sm font-medium text-gray-700">
                        Data início
                    </label>
                    <input
                        type="date"
                        name="dataInicio"
                        id="dataInicio"
                        value={filters.dataInicio}
                        onChange={(e) => setFilters({...filters, dataInicio: e.target.value})}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm
                            focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    />
                </div>
                <div>
                    <label htmlFor="dataFim" className="block text-sm font-medium text-gray-700">
                        Data fim
                    </label>
                    <input
                        type="date"
                        name="dataFim"
                        id="dataFim"
                        value={filters.dataFim}
                        onChange={(e) => setFilters({...filters, dataFim: e.target.value})}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm
                            focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    />
                </div>
            </div>
            <div className="col-span-6 sm:col-span-3">
                <TButton color="green" onClick={e => onClick(e, filters)}>
                    <MagnifyingGlassIcon className="w-5 h-5 mr-2" />
                    Filtrar
                </TButton>
            </div>
        </div>
    );
}
