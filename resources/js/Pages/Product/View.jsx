import { Head, Link } from '@inertiajs/react'
import { Inertia } from '@inertiajs/inertia'
import { route } from 'ziggy-js'
import { Ziggy } from '@/ziggy'
import { useAuth } from '../../context/AuthContext'
import Layout from '../Layout'

export default function View({ product }) {
    const { user } = useAuth();

    return (
        <Layout>
            <Head title={`Product: ${product.name}`} />

            <div className="max-w-[1500px] mx-auto mt-10 px-4">
                <h1 className="text-3xl font-bold text-center">Product Details</h1>
                <p className="text-center text-gray-600 mt-2">
                    Viewing details for {product.name} by {user}
                </p>

                <div className="mt-8">
                    <div className="bg-white shadow rounded-lg p-6">
                        <h2 className="text-xl font-semibold mb-4">Product Information</h2>
                        <p><strong>ID:</strong> {product.id}</p>
                        <p><strong>Name:</strong> {product.name}</p>
                        <p><strong>Price:</strong> ${product.price}</p>
                        <p><strong>Quantity:</strong> {product.quantity}</p>
                    </div>
                </div>

                <div className="flex justify-center mt-6">
                    <Link
                        href={route('product.index', undefined, undefined, Ziggy)}
                        className="bg-blue-500 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded shadow"
                    >
                        Back to Products
                    </Link>
                </div>
            </div>
        </Layout>
    );
}
