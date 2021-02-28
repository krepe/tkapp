<template>
    <RouterLink
        class="flex-shrink-0 m-4 relative overflow-hidden rounded-lg max-w-xs shadow-lg"
        :class="cardColor"
        active-class="bg-gray-300"
        :to="cardLink"
    >
        <svg
            class="absolute bottom-0 left-0 mb-8"
            viewBox="0 0 375 283"
            fill="none"
            style="transform: scale(1.5); opacity: 0.1;"
        >
            <rect
                x="159.52"
                y="175"
                width="152"
                height="152"
                rx="8"
                transform="rotate(-45 159.52 175)"
                fill="white"
            />
            <rect
                y="107.48"
                width="152"
                height="152"
                rx="8"
                transform="rotate(-45 0 107.48)"
                fill="white"
            />
        </svg>
        <div class="relative pt-6 px-6 flex items-center justify-center">
            <div
                class="block absolute w-48 h-48 bottom-0 left-0 -mb-24 ml-3"
                style="background: radial-gradient(black, transparent 60%); transform: rotate3d(0, 0, 1, 20deg) scale3d(1, 0.6, 1); opacity: 0.2;"
            />
            <img
                class="relative w-40"
                :src="cardImg"
                alt=""
            >
        </div>
        <div class="relative text-white px-5 pb-5 mt-5">
            <span class="block opacity-75 -mb-1">{{ cardSubtitle }}</span>
            <div class="flex justify-between">
                <span class="block font-semibold text-xl"> {{ cardTitle }}</span>
            </div>
        </div>
    </RouterLink>
</template>

<script>
    export default {
        name: 'CardModules',
        props: {
            cardColor: {
                type: String,
                default: 'bg-blue-500',
            },
            cardImg: {
                type: String,
                default: require('@/assets/img/engrane.png'),
            },
            cardTitle: {
                type: String,
                default: 'Title',
            },
            cardSubtitle: {
                type: String,
                default: 'Subtitle',
            },
            cardLink: {
                type: String,
                default: '/',
            },

        },
    };
</script>