import { PencilIcon, TrashIcon } from "@heroicons/react/24/outline/index.js";
import TButton from "./core/TButton.jsx";

export default function CityListItem({ city, onDeleteClick }) {
    return(
        <div className="flex flex-col py-2 px-3 shadow-md bg-white hover:bg-gray-50">
            <h4 className="text-lg font-bold">Cidade: { city.nome }</h4>
            <h4 className="text-lg font-bold">Estado: { city.estado }</h4>
            <h4 className="text-lg font-bold">Data da fundação: { city.dt_fundacao }</h4>
            <h4 className="text-lg font-bold">Bairro:
                {city.city_neighborhood.length > 1 ? city.city_neighborhood.map((item, index) => {
                    if (index === city.city_neighborhood.length - 1) {
                        return ` ${item.neighborhood.bairro}`;
                    }
                     return ` ${item.neighborhood.bairro},`;
                }) : city.city_neighborhood.length === 0 ? ' Sem bairros cadastrados' :  ' ' + city.city_neighborhood[0].neighborhood.bairro }
            </h4>

            <div className="flex justify-between items-end mt-3 h-full">
                <TButton to={`/cidade/${city.id}`}>
                    <PencilIcon className="w-5 h-5 mr-2" />
                    Editar
                </TButton>
                {city.id && (
                    <TButton onClick={e => onDeleteClick(city.id)} circle link color="red">
                        <TrashIcon className="w-5 h-5" />
                    </TButton>
                )}
            </div>
        </div>
    )
}
