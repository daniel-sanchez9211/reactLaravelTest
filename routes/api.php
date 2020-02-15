<?php

use Illuminate\Http\Request;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

// Route::middleware('auth:api')->get('/user', function (Request $request) {
//     return $request->user();
// });

Route::get('users', 'MainController@index');
Route::post('users', 'MainController@store');
Route::put('users', 'MainController@update');
Route::delete('users', 'MainController@destroy');

Route::get('users/detalhe/', 'MainController@show');
