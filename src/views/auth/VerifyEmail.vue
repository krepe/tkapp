<template>
    <div class="bg-gray-400 h-screen w-screen">
        <div class="flex flex-col items-center flex-1 h-full justify-center px-4 sm:px-0">
            <div
                class="flex rounded-lg shadow-lg w-full sm:w-3/4 lg:w-1/2 bg-white sm:mx-0"
                style="height: 500px"
            >
                <div class="flex flex-col w-full md:w-1/2 p-4">
                    <div class="flex flex-col flex-1 justify-center mb-8">
                        <div class="flex items-center justify-center  w-full h-20px-4 items-center mb-10 mt-10">
                            <img
                                :src="imgLogo"
                                class="w-12 h-12"
                            >
                            <p class="font-semibold text-3xl text-blue-400 pl-4">
                                TransPoo
                            </p>
                        </div>
                        <h1 class="text-2xl text-center font-semibold mt-5 mb-4">
                            Verificação de E-mail
                        </h1>
                        <div
                            v-if="response.message"
                            :class="`rounded-sm bg-${response.color}-100 p-4 mb-12`"
                        >
                            <h3 :class="`text-sm leading-5 font-medium text-${response.color}-800`">
                                {{ response.message }}
                            </h3>
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
    import messages from '@/utils/messages';

    export default {
        name: 'VerifyEmail',

        data() {
            return {
                token: '',
                response: {
                    color: '',
                    message: '',
                },
                spinner: {
                    verify_email: false,
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
            this.spinner.verify_email = true;
            this.verifyEmail();
        },

        methods: {
            verifyEmail() {
                this.$axios.post('verify-email', { token: this.token }).then(() => {
                    this.response.color = 'green';
                    this.response.message = 'E-mail verificado com sucesso!';
                }).catch((e) => {
                    const errorCode = e?.response?.data?.error || 'ServerError';
                    this.response.color = 'red';
                    this.response.message = messages[errorCode];
                });
            },
        },
    };
</script>
