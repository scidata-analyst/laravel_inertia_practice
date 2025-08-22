import { Head, useForm, usePage, Link } from '@inertiajs/react'
import { route } from 'ziggy-js'
import { Ziggy } from '@/ziggy'
import Layout from '../Layout'

export default function Update({ product }) {
    const { flash } = usePage().props
    const { data, setData, post, processing, errors, reset } = useForm({
        name: product.name,
        price: product.price,
        quantity: product.quantity,
        image: null,
        category: product.category,
        description: product.description,
    })

    function handleSubmit(e) {
        e.preventDefault()
        post(route('product.update', product.id, undefined, Ziggy), {
            forceFormData: true,
            onSuccess: () => reset(),
        })
    }

    return (
        <Layout>
            <Head title="Update Product" />
            <div className="mt-10 p-6 bg-white shadow rounded">
                <h1 className="text-3xl font-bold text-center mb-6">Update Product</h1>

                {flash?.success && (
                    <div className="bg-green-100 text-green-800 p-2 mb-4 rounded">
                        {flash.success}
                    </div>
                )}

                <form onSubmit={handleSubmit} encType="multipart/form-data" className="grid grid-cols-1 gap-4">
                    <div>
                        <input
                            type="text"
                            name="name"
                            value={data.name}
                            onChange={e => setData('name', e.target.value)}
                            placeholder="Product Name"
                            className="w-full border rounded p-2"
                        />
                        {errors.name && <p className="text-red-600">{errors.name}</p>}
                    </div>

                    <div>
                        <input
                            type="number"
                            name="price"
                            value={data.price}
                            onChange={e => setData('price', e.target.value)}
                            placeholder="Price"
                            className="w-full border rounded p-2"
                        />
                        {errors.price && <p className="text-red-600">{errors.price}</p>}
                    </div>

                    <div>
                        <input
                            type="number"
                            name="quantity"
                            value={data.quantity}
                            onChange={e => setData('quantity', e.target.value)}
                            placeholder="Quantity"
                            className="w-full border rounded p-2"
                        />
                        {errors.quantity && <p className="text-red-600">{errors.quantity}</p>}
                    </div>

                    <div>
                        <input
                            type="file"
                            name="image"
                            onChange={e => setData('image', e.target.files[0])}
                            className="w-full border rounded p-2"
                        />
                        {errors.image && <p className="text-red-600">{errors.image}</p>}
                    </div>

                    <div>
                        <input
                            type="text"
                            name="category"
                            value={data.category}
                            onChange={e => setData('category', e.target.value)}
                            placeholder="Category"
                            className="w-full border rounded p-2"
                        />
                        {errors.category && <p className="text-red-600">{errors.category}</p>}
                    </div>

                    <div>
                        <textarea
                            name="description"
                            value={data.description}
                            onChange={e => setData('description', e.target.value)}
                            placeholder="Description"
                            className="w-full border rounded p-2"
                        />
                        {errors.description && <p className="text-red-600">{errors.description}</p>}
                    </div>

                    <button
                        type="submit"
                        disabled={processing}
                        className="bg-blue-600 text-white font-medium rounded p-2 mt-2 hover:bg-blue-700"
                    >
                        {processing ? 'Submitting...' : 'Submit'}
                    </button>
                </form>
            </div>

            <div className="flex justify-center mt-6">
                <Link
                    href={route('product.index', undefined, undefined, Ziggy)}
                    className="bg-blue-500 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded shadow"
                >
                    Back to Products
                </Link>
            </div>
        </Layout>
    )
}
