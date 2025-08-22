<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Product;
use Inertia\Inertia;

class ProductController extends Controller
{
    /* display all product */
    public function index()
    {
        $products = Product::paginate(5);

        return Inertia::render('Product/Index', [
            'products' => $products
        ]);
    }


    /* display create product page */
    public function create()
    {
        return Inertia::render('Product/Create');
    }

    /* store product code */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
            'price' => 'required|numeric|min:0',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif,webp|max:2048',
            'category' => 'required|string|max:255',
            'quantity' => 'required|integer|min:0',
        ]);

        $product = new Product();
        $product->name = $validated['name'];
        $product->description = $validated['description'] ?? null;
        $product->price = $validated['price'];
        $product->category = $validated['category'];
        $product->quantity = $validated['quantity'];

        if ($request->hasFile('image')) {
            $path = $request->file('image')->store('products', 'public');
            $product->image = $path;
        }

        $product->save();

        return redirect()->route('product.create')->with('success', 'Product created successfully!');
    }


    /* display specific product */
    public function view($id)
    {
        $product = Product::find($id);

        return Inertia::render('Product/View', [
            'product' => $product
        ]);
    }

    /* display update product page */
    public function edit($id)
    {
        $product = Product::find($id);

        return Inertia::render('Product/Update', [
            'product' => $product
        ]);
    }

    /* update specific product code */
    public function update(Request $request, $id)
    {
        $product                = Product::find($id);
        $product->name          = $request->name;
        $product->description   = $request->description;
        $product->price         = $request->price;
        $product->image         = $request->image;
        $product->category      = $request->category;
        $product->quantity      = $request->quantity;
        $product->save();
    }

    /* delete specific product */
    public function delete($id)
    {
        $product = Product::find($id);
        $product->delete();
    }
}
