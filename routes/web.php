<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ProductController;

/* product controller */
Route::get('product/index', [ProductController::class, 'index'])->name('product.index');
Route::get('product/create', [ProductController::class, 'create'])->name('product.create');
Route::post('product/store', [ProductController::class, 'store'])->name('product.store');
Route::get('product/view/{id}', [ProductController::class, 'view'])->name('product.view');
Route::get('product/edit/{id}', [ProductController::class, 'edit'])->name('product.edit');
Route::post('product/update/{id}', [ProductController::class, 'update'])->name('product.update');
Route::get('product/delete/{id}', [ProductController::class, 'delete'])->name('product.delete');

Route::get('/', function () {
    return view('welcome');
});
