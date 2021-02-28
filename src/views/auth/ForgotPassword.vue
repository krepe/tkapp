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

                        <div class="flex items-center justify-center  w-full h-20px-4 items-center mb-10">
                            <img
                                :src="imgLogo"
                                class="w-12 h-12"
                            >
                            <p class="font-semibold text-3xl text-blue-400 pl-4">
                                TransPoo
                            </p>
                        </div>
                        <h1 class="text-2xl text-center font-semibold mt-5 mb-4">
                            Redefinição de senha
                        </h1>
                        <h4 class="text-1xl text-center font-semibold mt-2">
                            Informe o e-mail do usuário
                        </h4>
                        <div class="w-full mt-4">
                            <div class="w-3/4 mx-auto">    
                                <ValidationObserver
                                    ref="forgotPasswordForm"
                                    tag="form"
                                    @submit.stop.prevent="forgotPassword()"
                                >
                                    <div class="flex flex-col mt-4">
                                        <ValidationProvider
                                            v-slot="{ errors }"
                                            rules="required|email"
                                            name="E-mail"
                                        >
                                            <input
                                                v-model="email"
                                                type="email"
                                                class="flex-grow h-8 px-2 rounded border border-blue-400 focus:outline-none focus:border-blue-600 rounded-sm py-3 px-4 block w-full appearance-none leading-normal"
                                                name="email"
                                                value=""
                                                placeholder="E-mail"
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
                                            Redefinir Senha
                                        </button>
                                    </div>
                                </ValidationObserver>
                            </div>
                            <div class="text-center mt-4">
                                <RouterLink
                                    :to="{ name: 'Login' }"
                                    class="no-underline hover:underline text-blue-dark text-xs"
                                >
                                    Fazer Login
                                </RouterLink>
                            </div>
                        </div>
                    </div>
                </div>
                <div
                    class="hidden md:block md:w-1/2 rounded-r-lg"
                    style="background: url('https://images.unsplash.com/photo-1608835175091-947efa60fd88?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80); background-size: cover; background-position: center center;"
                />
            </div>
        </div>
    </div>
</template>
<script>
    import NprogressContainer from 'vue-nprogress/src/NprogressContainer';
    import { ValidationObserver, ValidationProvider } from 'vee-validate';
    import messages from '@/utils/messages';

    export default {
        name: 'ForgotPassword',
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
                email: '',
                response: {
                    color: '',
                    message: '',
                },
                spinner: {
                    forgotPassword: false,
                },
            };
        },
        methods: {
            async forgotPassword() {
                const validator = await this.$refs.forgotPasswordForm.validate();
                if (!validator) { return; }

                this.resetResponse();

                const payload = {
                    email: this.email,
                };

                this.spinner.forgot_password = true;

                this.$axios.post('forgot-password', payload).then(() => {
                    this.response.color = 'green';
                    this.response.message = 'Enviamos um e-mail com instruções de recuperação de senha.';

                    this.resetForm();
                }).catch((e) => {
                    const errorCode = e?.response?.data?.error || 'ServerError';
                    this.response.color = 'red';
                    this.response.message = messages[errorCode];
                }).finally(() => {
                    this.spinner.forgot_password = false;
                });
            },

            resetResponse() {
                this.response.color = '';
                this.response.message = '';
            },

            resetForm() {
                this.$refs.forgotPasswordForm.reset();
                this.email = '';
            },
        },        
    };
</script>