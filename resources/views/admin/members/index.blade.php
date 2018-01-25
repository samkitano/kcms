{{--
    Resource Index

    @param array  $items
    @param array  $fields
    @param string $resource
--}}

@extends('layouts.admin-master')

@section('title', __("kcms.menu.{$resource}"))

@section('content')
    @component('components.page_title', [
        'title' => __("kcms.menu.{$resource}"),
        'badge' => count($items)
    ])@endcomponent

    @component('components.create_button', [
                'href' => "/admin/{$resource}/create",
                'text' => __("kcms.{$resource}.create")
    ])@endcomponent

    @if(count($items) > 10)
        @component('components.dt-filter')@endcomponent
    @endif

    <table class="table table-striped table-hover" data-dt>
        <thead>
        <tr>
            @foreach($fields as $field)
                <th>{{ $field['label'] }}</th>
            @endforeach
        </tr>
        </thead>
        <tbody>
        @foreach($items as $row => $columns)
            <tr>
                @foreach($columns as $column)
                    @if(is_array($column) && isset($column['name']))
                        <td>{!! $column['image'] !!}
                            <a href="{{ $column['url'] }}"><span
                               class="hover:text-teal-dark text-teal ml-2">{{ $column['name'] }}</span></a></td>
                    @else
                        <td>{!! $column !!}</td>
                    @endif
                @endforeach
            </tr>
        @endforeach
        </tbody>
    </table>
@endsection
