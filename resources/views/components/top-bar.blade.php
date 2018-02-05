{{--
    TOP BAR

    @param string $user_name
    @param string $user_img
    @param string $breadcrumbs
--}}

<nav class="top-nav">
    <div class="top-nav_left">
        <svg width="54"
             height="54"
             viewBox="0 0 54 54"
             xmlns="http://www.w3.org/2000/svg"
             class="fill-current h-8 w-8 mr-2"
        ><path d="M13.5 22.1c1.8-7.2 6.3-10.8 13.5-10.8 10.8 0 12.15 8.1 17.55 9.45 3.6.9 6.75-.45 9.45-4.05-1.8 7.2-6.3 10.8-13.5 10.8-10.8 0-12.15-8.1-17.55-9.45-3.6-.9-6.75.45-9.45 4.05zM0 38.3c1.8-7.2 6.3-10.8 13.5-10.8 10.8 0 12.15 8.1 17.55 9.45 3.6.9 6.75-.45 9.45-4.05-1.8 7.2-6.3 10.8-13.5 10.8-10.8 0-12.15-8.1-17.55-9.45-3.6-.9-6.75.45-9.45 4.05z"></path
        ></svg
        ><a title="{{ __('kcms.menu.dashboard') }}" href="/admin/dashboard"
         ><span class="font-narrow font-semibold text-xl tracking-tight">{{ config('app.name') }}</span></a
        >
    </div>

    <div class="top-nav_right sm:flex sm:items-center sm:w-auto">
        <div class="top-nav_right_left sm:flex-grow auth-info">{!! $breadcrumbs !!}</div>

        <div class="top-nav_right_right sm:mt-0">
            <div class="text-white">
                <span
                ><img class="inline-block h-8 w-8 rounded-full"
                      src="https://www.gravatar.com/avatar/478a629fe56bc9f45332245d86e469da?d=mm&amp;s=256"
                      alt="{{ $user_name }}"></span
                ><span class="ml-2">{{ $user_name }}</span
                ><span class="ml-2"
                ><form class="appearance-none inline"
                       method="POST"
                       action="{{ route('admin.logout') }}"
                >{{ csrf_field() }}<button class="logout hover:text-red"
                                           title="{{ __('auth.logout') }}"
                                           type="submit"
                                   ><svg class="fill-current"
                                         width="14"
                                         height="14"
                                         viewBox="0 0 20 20"
                                         xmlns="http://www.w3.org/2000/svg"
                                    ><path d="M4.16 4.16l1.42 1.42A6.99 6.99 0 0 0 10 18a7 7 0 0 0 4.42-12.42l1.42-1.42a9 9 0 1 1-11.69 0zM9 0h2v8H9V0z"
                                           fill-rule="even-odd"
                                    ></path></svg></button></form></span
                >
            </div>
        </div>
    </div>
</nav>
