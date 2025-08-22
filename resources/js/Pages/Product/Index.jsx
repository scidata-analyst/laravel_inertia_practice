import { Head, Link } from '@inertiajs/react'
import { Inertia } from '@inertiajs/inertia'
import { route } from 'ziggy-js'
import { Ziggy } from '@/ziggy'
import { useAuth } from '../../context/AuthContext'
import Layout from '../Layout'
import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from '@headlessui/react'
import { ExclamationTriangleIcon } from '@heroicons/react/24/outline'
import { useState } from 'react'

export default function Index({ products }) {
    const productList = products?.data || products || []
    const links = products?.links || []
    const { user } = useAuth()
    const [open, setOpen] = useState(false)

    return (
        <Layout>
            <Head title="Products" />

            <div className="mt-10 px-4">
                <h1 className="text-3xl font-bold text-center">Products</h1>
                <p className="text-center text-gray-600 mt-2">
                    Manage your products below, {user}
                </p>

                <div className="flex justify-center mt-6">
                    <Link
                        href={route('product.create', undefined, undefined, Ziggy)}
                        className="bg-blue-500 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded shadow"
                    >
                        Create Product
                    </Link>
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
                                        <Link
                                            href={route('product.view', product.id, undefined, Ziggy)}
                                            className="bg-green-500 hover:bg-green-700 text-white py-1 px-3 rounded text-xs"
                                        >
                                            View
                                        </Link>
                                        <Link
                                            href={route('product.edit', product.id, undefined, Ziggy)}
                                            className="bg-yellow-500 hover:bg-yellow-700 text-white py-1 px-3 rounded text-xs"
                                        >
                                            Edit
                                        </Link>
                                        <button
                                            className="bg-red-500 hover:bg-red-700 text-white py-1 px-3 rounded text-xs"
                                            onClick={() => {
                                                setOpen(true)
                                            }}
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

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

            <Dialog open={open} onClose={setOpen} className="relative z-10">
                <DialogBackdrop
                    transition
                    className="fixed inset-0 bg-gray-500/75 transition-opacity data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in"
                />

                <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                    <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                        <DialogPanel
                            transition
                            className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all data-closed:translate-y-4 data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in sm:my-8 sm:w-full sm:max-w-lg data-closed:sm:translate-y-0 data-closed:sm:scale-95"
                        >
                            <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                                <div className="sm:flex sm:items-start">
                                    <div className="mx-auto flex size-12 shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:size-10">
                                        <ExclamationTriangleIcon aria-hidden="true" className="size-6 text-red-600" />
                                    </div>
                                    <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                                        <DialogTitle as="h3" className="text-base font-semibold text-gray-900">
                                            Are you sure?
                                        </DialogTitle>
                                        <div className="mt-2">
                                            <p className="text-sm text-gray-500">
                                                Do you really want to deactivate your account? All of your data will be permanently removed. This action cannot be undone.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                                <button
                                    type="button"
                                    onClick={() => setOpen(false)}
                                    className="inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-xs hover:bg-red-500 sm:ml-3 sm:w-auto"
                                >
                                    Delete
                                </button>
                                <button
                                    type="button"
                                    data-autofocus
                                    onClick={() => setOpen(false)}
                                    className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-xs inset-ring inset-ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                                >
                                    Go Back
                                </button>
                            </div>
                        </DialogPanel>
                    </div>
                </div>
            </Dialog>
        </Layout>
    )
}
