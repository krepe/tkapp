<template>
    <div id="krepe">
        <NprogressContainer />
        <!-- breadcrumb -->
        <nav
            class="text-sm font-semibold mb-6"
            aria-label="Breadcrumb"
        >
            <ol class="list-none p-0 inline-flex">
                <li class="flex items-center text-blue-500">
                    <a
                        href="#"
                        class="text-gray-700"
                    >CT-e</a>
                    <svg
                        class="fill-current w-3 h-3 mx-3"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 320 512"
                    ><path d="M285.476 272.971L91.132 467.314c-9.373 9.373-24.569 9.373-33.941 0l-22.667-22.667c-9.357-9.357-9.375-24.522-.04-33.901L188.505 256 34.484 101.255c-9.335-9.379-9.317-24.544.04-33.901l22.667-22.667c9.373-9.373 24.569-9.373 33.941 0L285.475 239.03c9.373 9.372 9.373 24.568.001 33.941z" /></svg>
                </li>
                <li class="flex items-center">
                    <a
                        href="#"
                        class="text-gray-600"
                    >Emissão</a>
                </li>
            </ol>
        </nav>
        <!-- breadcrumb end -->

        <div class="lg:flex justify-between items-center mb-6">
            <p class="text-2xl font-semibold mb-2 lg:mb-0">
                Good afternoon, Krepe!
            </p>
        </div>

        <div class="card">
            <div class="lg:flex">
                <div class="lg:w-2/6 p-8">
                    <p><strong class="headings-color">Default Forms</strong></p>
                    <p class="text-gray-dark">
                        TailStack supports tailwind custom form plugin/library from https://tailwindcss-custom-forms.netlify.app/.
                    </p>
                </div>
                <div class="lg:w-4/6 card-dark p-8">
                    <label class="block">
                        <span class="form-label">Name</span>
                        <input
                            class="form-input mt-1 block w-full placeholder-muted"
                            placeholder="Jane Doe"
                        >
                    </label>

                    <div class="mt-8">
                        <span class="form-label">Account Type</span>
                        <div class="mt-2">
                            <label class="inline-flex items-center">
                                <input
                                    type="radio"
                                    class="form-radio"
                                    name="accountType"
                                    value="personal"
                                    checked=""
                                >
                                <span class="ml-2">Personal</span>
                            </label>
                            <label class="inline-flex items-center ml-6">
                                <input
                                    type="radio"
                                    class="form-radio"
                                    name="accountType"
                                    value="busines"
                                >
                                <span class="ml-2">Business</span>
                            </label>
                        </div>
                    </div>

                    <label class="block mt-8">
                        <span class="form-label">Requested Limit</span>
                        <select class="form-select mt-1 block w-full">
                            <option>$1,100</option>
                            <option>$5,000</option>
                            <option>$10,000</option>
                            <option>$25,000</option>
                        </select>
                    </label>

                    <div class="flex mt-8">
                        <label class="flex items-center">
                            <input
                                type="checkbox"
                                class="form-checkbox"
                            >
                            <span class="ml-2">I agree to the <span class="underline">privacy policy</span></span>
                        </label>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import NprogressContainer from 'vue-nprogress/src/NprogressContainer';

    export default {
        name: 'Emissao',
        components: {
            NprogressContainer,
        },
    };
</script>