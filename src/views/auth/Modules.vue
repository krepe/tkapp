<template>
    <div
        class="leading-normal tracking-normal"
        id="main-body"
    >
        <div class="flex flex-wrap">
            <div
                class="w-full bg-gray-100 pl-0"
                id="main-content"
            >
                <Navbar />
            </div>

            <div class="bg-gray-200 h-screen w-screen">
                <div class="w-full justify-center h-5 flex items-center mt-10">
                    <img
                        :src="require('@/assets/logo.svg')"
                        class="w-12 h-12"
                    >
                    <p class="font-semibold text-3xl text-blue-500 pl-4">
                        TransPoo
                    </p>
                </div>

                <div 
                    v-for="itens in modulesUser"
                    :key="itens.id"
                    class="p-24 flex flex-wrap items-center justify-center"
                >
                    <CardModules
                        :card-title="itens.title"
                        :card-subtitle="itens.subtitle"
                        :card-color="itens.color"
                        :card-img="require('@/assets/img/modules/'+itens.title+'.png')"
                        :card-link="itens.link"
                    />
                </div>        
            </div>
            <Footer />
        </div>
    </div>
</template>
<script>
    import { mapState } from 'vuex';
    import Navbar from '@/components/Navbar';
    import Footer from '@/components/Footer';
    import CardModules from '@/components/CardModules';

    export default {
        name: 'Modules',
        computed: {
            ...mapState(['sideBarOpen']),
        },
        components: {
            Navbar,
            Footer,
            CardModules,
        },
        data() {
            return {
                modulesUser: [{
                    title: '',
                    subtitle: '',
                    color: '',
                    link: '',
                }],
            };
        },
    };
</script>