<template>
    <div class="h-screen font-sans reset bg-cover">
        <NprogressContainer />
        <div class="container mx-auto h-full flex flex-1 justify-center items-center">
            <div class="w-full max-w-lg">
                <div class="leading-loose">
                    <form class="max-w-sm m-4 p-10 bg-white bg-opacity-30 rounded shadow-xl">
                        <ValidationObserver
                            ref="resetPasswordForm"
                            tag="form"
                            @submit.stop.prevent="resetPassword()"
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
                                Recuperar senha
                            </h1>                         
                            <div
                                v-if="response.message"
                                :class="`rounded-sm bg-${response.color}-100 p-4 mb-4 mt-4`"
                            >
                                <h3 :class="`text-sm leading-5 font-medium text-${response.color}-800`">
                                    {{ response.message }}
                                </h3>
                            </div>    
                            <div class="mt-8">
                                <ValidationProvider
                                    v-slot="{ dirty, valid, invalid, errors }"
                                    rules="required|email"
                                    name="E-mail"
                                >
                                    <label
                                        class="block text-sm text-white"
                                        for="email"
                                    >Informe o e-mail do usuário</label>
                                    <input
                                        v-model="email"
                                        type="email"
                                        class="w-full px-5 py-1 text-gray-700 bg-gray-300 rounded focus:outline-none focus:bg-white"
                                        name="email"
                                        value=""
                                        placeholder="Digite o E-mail do Usuário"
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
                                    :rules="{ required: true, min: 8, max: 30, regex: /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d).+$/ }"
                                    v-slot="{ errors }"
                                >
                                    <label class="block  text-sm text-white">Senha</label>
                                    <input
                                        v-model="password"
                                        type="password"
                                        class="w-full px-5 py-1 text-gray-700 bg-gray-300 rounded focus:outline-none focus:bg-white"
                                        id="senha"
                                        name="senha"
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
                            <div class="mt-2">
                                <ValidationProvider
                                    rules="required|confirmed:password"
                                    v-slot="{ errors }"
                                >
                                    <label class="block  text-sm text-white">Confirmar a Senha</label>
                                    <input
                                        v-model="confirmation"
                                        type="password"
                                        class="w-full px-5 py-1 text-gray-700 bg-gray-300 rounded focus:outline-none focus:bg-white"
                                        id="confirmação da senha"
                                        name="confirmação da senha"
                                        placeholder="Repita a sua senha"
                                    >
                                    <div
                                        v-if="!!errors[0]"
                                        class="text-red-800 text-sm mb-2"
                                    >
                                        {{ errors[0] }}
                                    </div>
                                </ValidationProvider>
                            </div>
                            <div
                                class="rounded-sm bg-blue-100 p-4 mb-4 mt-6"
                            >
                                <h3 class="text-xs leading-2 font-medium text-blue-500">
                                    A Senha deve possuir:
                                    <li>Entre 8 e 30 caracteres</li>
                                    <li>Pelo menos 1 letra maíusculae e 1 minúscula</li>
                                </h3>
                            </div>
                            <div class="mt-8 items-center flex justify-between">
                                <button
                                    type="submit"
                                    :disabled="spinner.reset_password"
                                    class="flex items-center justify-center px-8 py-2 text-white font-light tracking-wider bg-blue-600 hover:bg-blue-500 rounded-sm appearance-none leading-normal"
                                >
                                    <img
                                        v-if="spinner.reset_password"
                                        src="@/assets/img/spinner.svg"
                                        class="w-4 h-4"
                                    >
                                    Alterar Senha
                                </button>
                                <RouterLink
                                    :to="{ name: 'Login' }"
                                    class="inline-block right-0 align-baseline font-bold text-sm text-500 text-white hover:text-blue-400"
                                >
                                    Fazer Login
                                </RouterLink>
                            </div>
                        </validationobserver>
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>
<style>
    .reset{
    background: url("https://images.unsplash.com/photo-1566709603547-638aba3dbbc0?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=753&q=80); background-size: cover; background-position: center center;");
    background-repeat: no-repeat;
    background-size: cover;
    }
</style>
<script>
    import NprogressContainer from 'vue-nprogress/src/NprogressContainer';
    import { ValidationObserver, ValidationProvider } from 'vee-validate';
    import messages from '@/utils/messages';

    export default {
        name: 'ResetPassword',

        components: {
            NprogressContainer,
            ValidationObserver,
            ValidationProvider,
        },

        data() {
            return {
                email: '',
                password: '',
                confirmation: '',
                token: '',
                response: {
                    color: '',
                    message: '',
                },
                spinner: {
                    reset_password: false,
                },
            };
        },
        props: {        
            imgLogo: {
                type: String,
                default: require('@/assets/logo.svg'),
            },
        },
        beforeRouteEnter(to, from, next) {
            if (!to?.query?.token) {
                next({ name: 'Login' });
            }

            next();
        },

        created() {
            this.token = this.$route?.query?.token || '';
        },

        methods: {
            async resetPassword() {
                const validator = await this.$refs.resetPasswordForm.validate();
                if (!validator) { return; }

                this.resetResponse();

                const payload = {
                    email: this.email,
                    password: this.password,
                    token: this.token,
                };

                this.spinner.reset_password = true;

                this.$axios.post('reset-password', payload).then(() => {
                    this.response.color = 'green';
                    this.response.message = 'Senha alterada com sucesso!';
                    this.resetForm();
                }).catch((e) => {
                    const errorCode = e?.response?.data?.error || 'ServerError';
                    this.response.color = 'red';
                    this.response.message = messages[errorCode];
                }).finally(() => {
                    this.spinner.reset_password = false;
                });
            },

            resetResponse() {
                this.response.color = '';
                this.response.message = '';
            },

            resetForm() {
                this.$refs.resetPasswordForm.reset();
                this.email = '';
                this.password = '';
                this.confirmation = '',
                this.token = '';
            },
        },
    };
</script>
