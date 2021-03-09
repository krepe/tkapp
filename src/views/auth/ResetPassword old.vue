<template>
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
                            Recuperar senha
                        </h1>
                        <div class="w-full mt-4">
                            <div class="w-3/4 mx-auto">
                                <ValidationObserver
                                    ref="resetPasswordForm"
                                    tag="form"
                                    @submit.stop.prevent="resetPassword()"
                                >
                                    <div class="grid gap-2">
                                        <ValidationProvider
                                            v-slot="{ errors }"
                                            rules="required|email"
                                            name="E-mail"
                                        >
                                            <input
                                                v-model="email"
                                                type="email"
                                                placeholder="Digite seu e-mail"
                                                class="flex-grow h-8 px-2 rounded border border-blue-400 focus:outline-none focus:border-blue-600 rounded-sm py-3 px-4 block w-full appearance-none leading-normal"
                                                autofocus
                                            >

                                            <div
                                                v-if="!!errors[0]"
                                                class="text-red-500 text-sm mb-2"
                                            >
                                                {{ errors[0] }}
                                            </div>
                                        </ValidationProvider>

                                        <ValidationProvider
                                            v-slot="{ errors }"
                                            :rules="{ required: true, regex: /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d).+$/ }"
                                            name="Senha"
                                        >
                                            <input
                                                v-model="password"
                                                type="password"
                                                placeholder="Digite sua senha"
                                                class="flex-grow h-8 px-2 rounded border border-blue-400 focus:outline-none focus:border-blue-600 rounded-sm py-3 px-4 block w-full appearance-none leading-normal"
                                            >

                                            <div
                                                v-if="!!errors[0]"
                                                class="text-red-500 text-sm mb-2"
                                            >
                                                {{ errors[0] }}
                                            </div>
                                        </ValidationProvider>

                                        <button
                                            type="submit"
                                            :disabled="spinner.reset_password"
                                            class="flex items-center justify-center bg-blue-400 text-white font-semibold text-sm focus:outline-none rounded-sm py-3 px-4 block w-full appearance-none leading-normal"
                                        >
                                            <img
                                                v-if="spinner.reset_password"
                                                src="@/assets/img/spinner.svg"
                                                alt=""
                                                class="w-5 h-5 mr-2"
                                            >

                                            ALETRAR SENHA
                                        </button>

                                        <div class="my-4 text-center">
                                            <RouterLink
                                                :to="{ name: 'Login' }"
                                                class="text-sm font-light"
                                            >
                                                Login
                                            </RouterLink>
                                        </div>
                                    </div>
                                </ValidationObserver>
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
    import { ValidationObserver, ValidationProvider } from 'vee-validate';
    import messages from '@/utils/messages';

    export default {
        name: 'ResetPassword',

        components: {
            ValidationObserver,
            ValidationProvider,
        },

        data() {
            return {
                email: '',
                password: '',
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
                this.token = '';
            },
        },
    };
</script>
