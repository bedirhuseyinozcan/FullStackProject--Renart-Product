<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;

class ProductController extends Controller
{
    public function index()
    {
        
        $json = file_get_contents(storage_path('app/products.json'));
        $products = json_decode($json, true);

        // GoldAPI'den altın fiyatını aldık env dosyasına ekledik
        $response = Http::withHeaders([
            'x-access-token' => env('GOLDAPI_KEY'),
            'Content-Type' => 'application/json'
        ])->get('https://www.goldapi.io/api/XAU/USD');

        if ($response->successful()) {
            $data = $response->json();

            // GoldAPI ons fiyatını verir (ounce başına USD)
            // 1 ons = 31.103 gram
            $goldPrice = $data['price'] / 31.103;
        } else {
            // fallback: çalışmazsa o an sabit fiyat
            $goldPrice = 125;
        }

        
        foreach ($products as &$product) {
            $product['price'] = round(
                ($product['popularityScore'] + 1) * $product['weight'] * $goldPrice,
                2
            );
        }

        return response()->json($products);
    }
}


