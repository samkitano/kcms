@extends('layouts.admin-master')

@section('title', __t('menu.articles'))

@section('content')
    @component('components.create_button', [
            'href' => "/admin/articles/create",
            'text' => __t("articles.create"),
            'condition' => true
        ])@endcomponent

    @if(count($articles) > 10)
        @component('components.dt-filter')@endcomponent
    @endif
    <table class="table table-striped table-hover" data-dt>
        <thead>
        <tr>
            <th>{{ __t('articles.title') }}</th>
            <th>{{ __t('articles.blocks') }}</th>
            <th>{{ __t('articles.tags') }}</th>
            <th>{{ __t('articles.order') }}</th>
            <th>{{ __t('articles.status') }}</th>
        </tr>
        </thead>
        <tbody>
        @foreach($articles as $article)
            <tr>
                <td><a title="Edit" href="/articles/{{ $article->id }}/edit">{{ $article->title }}</a></td>

                {{--<td class="text-center">@if(is_null($article->parent_id))---@else<a title="{{ App\Article::find($article->parent_id)->title }}" href="/articles/{{ $article->parent_id }}/edit">{{ $article->parent_id }}</a>@endif</td>--}}
                <td class="text-center">{{ $article->children()->count() }}</td>

                @php
                    $tags = implode(', ', $article->tags->toArray());
                @endphp

                <td class="text-center"><a href="#" title="{{ $tags }}">{{ count($article->tags) }}</a></td>

                <td class="text-center">@component('components.reorder', [
                    'order' => $article->priority,
                    'maxOrder' => App\Article::maxOrder($article->parent_id),
                    'controller' => 'Admin\ArticlesController',
                    'rid' => $article->id,
                ])@endcomponent</td>

                <td>@if($article->draft){{ __t('articles.draft') }}@else<span class="text-sm">{{ $article->published }}</span>@endif</td>
            </tr>
        @endforeach
        </tbody>
    </table>
@endsection
