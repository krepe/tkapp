<template>
    <div class="h-screen font-sans login bg-cover">
        <NprogressContainer />
        <div class="container mx-auto h-full flex flex-1 justify-center items-center">
            <div class="w-full max-w-lg">
                <div class="leading-loose">
                    <form class="max-w-sm m-4 p-10 bg-white bg-opacity-30 rounded shadow-xl">
                        <ValidationObserver
                            ref="loginForm"
                            tag="form"
                            @submit.stop.prevent="login()"
                        >
                            <div class="flex items-center justify-center  w-full h-20px-4 items-center mb-4">
                                <img
                                    :src="imgLogo"
                                    class="w-12 h-12"
                                >
                                <p class="font-semibold text-3xl text-blue-400 pl-4">
                                    TransPoo
                                </p>
                            </div>
                            <h1 class="text-2xl text-center font-semibold mt-5 mb-4">
                                Login
                            </h1>                         
                            <div
                                v-if="response.message"
                                :class="`rounded-sm bg-${response.color}-100 p-4 mb-4 mt-4`"
                            >
                                <h3 :class="`text-sm leading-5 font-medium text-${response.color}-800`">
                                    {{ response.message }}
                                </h3>
                            </div>         
                            <div class="">
                                <ValidationProvider
                                    v-slot="{ errors }"
                                    rules="required"
                                    name="Usuário"
                                >
                                    <label
                                        class="block text-sm text-white"
                                        for="usuario"
                                    >Usuário</label>
                                    <input
                                        v-model="name"
                                        type="text"
                                        class="w-full px-5 py-1 text-gray-700 bg-gray-300 rounded focus:outline-none focus:bg-white"
                                        name="name"
                                        value=""
                                        placeholder="Digite o Nome do Usuário"
                                        autofocus
                                    >
                                    <div
                                        v-if="!!errors[0]"
                                        class="text-red-800 text-sm mb-2"
                                    >
                                        {{ errors[0] }}
                                    </div>
                                </ValidationProvider>
                            </div>
                            <div class="mt-2">
                                <ValidationProvider
                                    v-slot="{ errors }"
                                    rules="required"
                                    name="Senha"
                                >
                                    <label class="block  text-sm text-white">Senha</label>
                                    <input
                                        v-model="password"
                                        type="password"
                                        class="w-full px-5 py-1 text-gray-700 bg-gray-300 rounded focus:outline-none focus:bg-white"
                                        name="password"
                                        placeholder="Digite a sua senha"
                                    >
                                    <div
                                        v-if="!!errors[0]"
                                        class="text-red-800 text-sm mb-2"
                                    >
                                        {{ errors[0] }}
                                    </div>
                                </ValidationProvider>
                            </div>
                            <div class="mt-8 items-center flex justify-between">
                                <button
                                    type="submit"
                                    :disabled="spinner.login"
                                    class="flex items-center justify-center px-8 py-2 text-white font-light tracking-wider bg-blue-600 hover:bg-blue-500 rounded-sm appearance-none leading-normal"
                                >
                                    <img
                                        v-if="spinner.login"
                                        src="@/assets/img/spinner.svg"
                                        class="w-4 h-4"
                                    >
                                    Entrar
                                </button>
                                <RouterLink
                                    :to="{ name: 'ForgotPassword' }"
                                    class="inline-block right-0 align-baseline font-bold text-sm text-500 text-white hover:text-blue-400"
                                >
                                    Esqueci minha senha
                                </RouterLink>
                            </div>
                        </ValidationObserver>
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>
<style>
  .login{
  /*
    background: url('https://tailwindadmin.netlify.app/dist/images/login-new.jpeg');
  */
  background: url("https://images.unsplash.com/photo-1476067897447-d0c5df27b5df?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80); background-size: cover; background-position: center center;");
  background-repeat: no-repeat;
  background-size: cover;
}
</style>
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
