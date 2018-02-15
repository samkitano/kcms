@extends('layouts.admin-master')

@section('title', __t('menu.tags'))

@section('content')
    @component('components.create_button', [
        'href' => "/admin/tags/create",
        'text' => __t("tags.create"),
        'condition' => true
    ])@endcomponent

    @if(count($tags) > 10)
        @component('components.dt-filter')@endcomponent
    @endif
    <table class="table table-striped table-hover" data-dt>
        <thead>
        <tr>
            <th>{{ __t('tags.id') }}</th>
            <th>{{ __t('tags.name') }}</th>
            <th>{{ __t('tags.slug') }}</th>
        </tr>
        </thead>
        <tbody>
            @foreach($tags as $tag)
                <tr>
                    <td>{{ $tag->tag_id }}</td>
                    <td>{{ $tag->name }}</td>
                    <td>{{ $tag->slug }}</td>
                </tr>
            @endforeach
        </tbody>
    </table>
@endsection
