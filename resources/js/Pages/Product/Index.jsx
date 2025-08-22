import { Head } from '@inertiajs/react'
import { Inertia } from '@inertiajs/inertia'
import { route } from 'ziggy-js'
import { Ziggy } from '@/ziggy'

export default function Index({ products }) {
    // Determine if products is paginated (has .data) or a plain array
    const productList = products?.data || products || []

    const links = products?.links || []

    return (
        <>
            <Head title="Products" />

            <div className="max-w-6xl mx-auto mt-10 px-4">
                <h1 className="text-3xl font-bold text-center">Products</h1>
                <p className="text-center text-gray-600 mt-2">
                    Manage your products below
                </p>

                <div className="flex justify-center mt-6">
                    <a
                        href={route('product.create', undefined, undefined, Ziggy)}
                        className="bg-blue-500 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded shadow"
                    >
                        Create Product
                    </a>
                </div>

                <div className="overflow-x-auto mt-8">
                    <table className="min-w-full border border-gray-200 divide-y divide-gray-200">
                        <thead className="bg-gray-100">
                            <tr>
                                <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">ID</th>
                                <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Name</th>
                                <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Price</th>
                                <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Quantity</th>
                                <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Actions</th>
                            </tr>
                        </thead>

                        <tbody className="bg-white divide-y divide-gray-200">
                            {productList.map(product => (
                                <tr key={product.id} className="hover:bg-gray-50">
                                    <td className="px-4 py-2 text-sm text-gray-800">{product.id}</td>
                                    <td className="px-4 py-2 text-sm text-gray-800">{product.name}</td>
                                    <td className="px-4 py-2 text-sm text-gray-800">{product.price}</td>
                                    <td className="px-4 py-2 text-sm text-gray-800">{product.quantity}</td>
                                    <td className="px-4 py-2 text-sm text-gray-800 space-x-2">
                                        <a
                                            href={route('product.view', product.id, undefined, Ziggy)}
                                            className="bg-green-500 hover:bg-green-700 text-white py-1 px-3 rounded text-xs"
                                        >
                                            View
                                        </a>
                                        <a
                                            href={route('product.edit', product.id, undefined, Ziggy)}
                                            className="bg-yellow-500 hover:bg-yellow-700 text-white py-1 px-3 rounded text-xs"
                                        >
                                            Edit
                                        </a>
                                        <a
                                            href={route('product.delete', product.id, undefined, Ziggy)}
                                            className="bg-red-500 hover:bg-red-700 text-white py-1 px-3 rounded text-xs"
                                            onClick={(e) => {
                                                e.preventDefault()
                                                if (confirm('Are you sure you want to delete this product?')) {
                                                    Inertia.delete(route('product.delete', product.id, undefined, Ziggy))
                                                }
                                            }}
                                        >
                                            Delete
                                        </a>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Pagination (if paginated) */}
                {links.length > 0 && (
                    <div className="flex justify-center mt-4 space-x-2">
                        {links.map((link, index) => (
                            <button
                                key={index}
                                disabled={!link.url}
                                className={`px-3 py-1 rounded ${link.active
                                    ? 'bg-blue-500 text-white'
                                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                                    }`}
                                onClick={() => {
                                    if (link.url) {
                                        const relativeUrl = link.url.replace(window.location.origin, '')
                                        Inertia.get(relativeUrl)
                                    }
                                }}
                                dangerouslySetInnerHTML={{ __html: link.label }}
                            />
                        ))}
                    </div>
                )}
            </div>
        </>
    )
}
