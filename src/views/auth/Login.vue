<template>
    <!-- component -->
    <div class="bg-gray-400 h-screen w-screen">
        <NprogressContainer />
        <div class="flex flex-col items-center flex-1 h-full justify-center px-4 sm:px-0">
            <div
                class="flex rounded-lg shadow-lg w-full sm:w-3/4 lg:w-1/2 bg-white sm:mx-0"
                style="height: 500px"
            >
                <div class="flex flex-col w-full md:w-1/2 p-4">
                    <div class="flex flex-col flex-1 justify-center mb-8">
                        <div
                            v-if="response.message"
                            :class="`rounded-sm bg-${response.color}-100 p-4 mb-4`"
                        >
                            <h3 :class="`text-sm leading-5 font-medium text-${response.color}-800`">
                                {{ response.message }}
                            </h3>
                        </div> 

                        <div class="flex items-center justify-center  w-full h-20px-4 items-center mb-4">
                            <img
                                :src="imgLogo"
                                class="w-12 h-12"
                            >
                            <p class="font-semibold text-3xl text-blue-400 pl-4">
                                TransPoo
                            </p>
                        </div>
                        <h1 class="text-2xl text-center font-semibold mb-6">
                            Bem vindo de volta
                        </h1>
                        <div class="w-full mt-4">
                            <div class="w-3/4 mx-auto">    
                                <ValidationObserver
                                    ref="loginForm"
                                    tag="form"
                                    @submit.stop.prevent="login()"
                                >
                                    <div class="flex flex-col mt-4">
                                        <ValidationProvider
                                            v-slot="{ errors }"
                                            rules="required"
                                            name="Usuário"
                                        >
                                            <input
                                                v-model="name"
                                                type="text"
                                                class="flex-grow h-8 px-2 rounded border border-blue-400 focus:outline-none focus:border-blue-600 rounded-sm py-3 px-4 block w-full appearance-none leading-normal"
                                                name="name"
                                                value=""
                                                placeholder="Usuário"
                                                autofocus
                                            >
                                            <div
                                                v-if="!!errors[0]"
                                                class="text-red-500 text-sm mb-2"
                                            >
                                                {{ errors[0] }}
                                            </div>
                                        </ValidationProvider>
                                    </div>
                                    <div class="flex flex-col mt-4">
                                        <ValidationProvider
                                            v-slot="{ errors }"
                                            rules="required"
                                            name="Senha"
                                        >
                                            <input
                                                v-model="password"
                                                type="password"
                                                class="flex-grow h-8 px-2 rounded border border-blue-400 focus:outline-none focus:border-blue-800 rounded-sm py-3 px-4 block w-full appearance-none leading-normal"
                                                name="password"
                                                placeholder="Senha"
                                            >
                                            <div
                                                v-if="!!errors[0]"
                                                class="text-red-500 text-sm mb-2"
                                            >
                                                {{ errors[0] }}
                                            </div>
                                        </ValidationProvider>
                                    </div>
                                    <div class="flex items-center mt-4">
                                        <input
                                            type="checkbox"
                                            name="remember"
                                            id="remember"
                                            class="mr-2"
                                        > <label
                                            for="remember"
                                            class="text-sm text-grey-dark"
                                        >Lembre de mim</label>
                                    </div>
                                    <div class="flex flex-col mt-8">
                                        <button
                                            type="submit"
                                            :disabled="spinner.login"
                                            class="flex items-center justify-center bg-blue-400 text-white font-semibold text-sm focus:outline-none rounded-sm py-3 px-4 block w-full appearance-none leading-normal"
                                        >
                                            <img
                                                v-if="spinner.login"
                                                src="@/assets/img/spinner.svg"
                                                class="w-5 h-5"
                                            >
                                            Entrar
                                        </button>
                                    </div>
                                </ValidationObserver>
                            </div>
                            <div class="text-center mt-4">
                                <RouterLink
                                    :to="{ name: 'ForgotPassword' }"
                                    class="no-underline hover:underline text-blue-dark text-xs"
                                >
                                    Esqueci minha senha
                                </RouterLink>
                            </div>
                        </div>
                    </div>
                </div>
                <div
                    class="hidden md:block md:w-1/2 rounded-r-lg"
                    style="background: url('https://images.unsplash.com/photo-1476067897447-d0c5df27b5df?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80); background-size: cover; background-position: center center;"
                />
            </div>
        </div>
    </div>
</template>
<script>
    import NprogressContainer from 'vue-nprogress/src/NprogressContainer';
    import Cookie from '@/service/cookie';
    import { ValidationObserver, ValidationProvider } from 'vee-validate';
    import messages from '@/utils/messages';

    export default {
        name: 'Login',
        components: {
            NprogressContainer,
            ValidationObserver,
            ValidationProvider,
        },
        props: {        
            imgLogo: {
                type: String,
                default: require('@/assets/logo.svg'),
            },
        },
        data() {
            return {
                name: '',
                password: '',
                response: {
                    color: '',
                    message: '',
                },
                spinner: {
                    login: false,
                },
            };
        },
        methods: {
            async login() {
                const validator = await this.$refs.loginForm.validate();
                if (!validator) { return; }
                const payload = {
                    name: this.name,
                    password: this.password,
                };
                this.resetResponse();
                this.spinner.login =true;
                this.$axios.post('login', payload).then((response) => {
                    const token = `${response.data.token_type} ${response.data.access_token}`;
                    Cookie.setToken(token);
                    this.$store.commit('user/STORE_USER', response.data.data);
                    this.$router.push({ name: 'Dashboard' });
                }).catch((e) => {
                    const msgError = e?.response?.data?.error || 'Ops! Alguma coisa deu errado.';
                    this.response.color = 'red';
                    this.response.message = messages[msgError];
                }).finally(() => {
                    this.spinner.login =false;
                });
            },
            resetResponse() {
                this.response.color = '';
                this.response.message = '';
            },
        },        
    };
</script>