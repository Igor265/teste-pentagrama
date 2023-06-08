import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/20/solid'

const items = [
    { id: 1, title: 'Back End Developer', department: 'Engineering', type: 'Full-time', location: 'Remote' },
    { id: 2, title: 'Front End Developer', department: 'Engineering', type: 'Full-time', location: 'Remote' },
    { id: 3, title: 'User Interface Designer', department: 'Design', type: 'Full-time', location: 'Remote' },
]

export default function PaginationLinks({ meta, onPageClick }) {

    function onClick(e, link) {
        e.preventDefault();
        if (!link.url) {
            return;
        }
        onPageClick(link)
    }

    return (
        <div className="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6 shadow-md mt-4">
            <div className="flex flex-1 justify-between sm:hidden">
                <a
                    href="#"
                    onClick={e => onClick(e, meta.links[0])}
                    className="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
                >
                    Previous
                </a>
                <a
                    href="#"
                    onClick={e => onClick(e, meta.links[meta.links.length - 1])}
                    className="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
                >
                    Next
                </a>
            </div>
            <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
                <div>
                    <p className="text-sm text-gray-700">
                        Exibindo <span className="font-medium">{meta.from}</span> de <span className="font-medium">{meta.to}</span> de{' '}
                        <span className="font-medium">{meta.total}</span> resultados
                    </p>
                </div>
                <div>
                    <nav className="isolate inline-flex -space-x-px rounded-md shadow-sm" aria-label="Pagination">
                        {/* Current: "z-10 bg-indigo-600 text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600", Default: "text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:outline-offset-0" */}
                        {meta.links && meta.links.map((link, index) => (
                            <a href="#"
                               key={index + 1}
                               onClick={e => onClick(e, link)}
                               aria-current="page"
                               className={`relative  inline-flex items-center px-4 py-2 text-sm
                                   font-semibold focus:z-20
                                   ${index === 0 ? 'rounded-1-md ' : ''} ${link.active ? 'bg-indigo-600 text-white z-10 '
                                   : 'text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:outline-offset-0 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 '}
                                   `}
                               dangerouslySetInnerHTML={{ __html: link.label }}
                            >
                            </a>
                        ))}
                    </nav>
                </div>
            </div>
        </div>
    )
}
