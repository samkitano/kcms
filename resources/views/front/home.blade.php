@extends('layouts.front-master')

@section('title', __('kcms.home'))

@section('content')
    <div class="text-center text-grey-dark">
        <div class="text-huge mb-30px font-hairline">K-CMS</div>

        <div class="text-grey-dark mx-2 mt-4 uppercase no-underline tracking-wider font-bold text-xs">
            <a class="px-2 hover:text-grey-darkest" target="_blank" href="http://samkitano.com">Site</a>
            <a class="px-2 hover:text-grey-darkest" target="_blank" href="https://laravel.com/docs">Documentation</a>
            <a class="px-2 hover:text-grey-darkest" target="_blank" href="https://github.com/samkitano/kcms">GitHub</a>
            <a class="px-2 hover:text-grey-darkest" target="_blank" href="https://laravel.com">Contact</a>
        </div>
    </div>
@endsection
