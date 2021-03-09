<template>
    <div class="gradient text-white min-h-screen flex items-center">
        <div class="container mx-auto p-4 flex flex-wrap items-center">
            <div class="w-full md:w-5/12 text-center p-4">
                <img
                    src="@/assets/img/human-image.png?raw=true"
                    alt="Not Found"
                >
            </div>
            <div class="w-full md:w-7/12 text-center md:text-left p-12">
                <div class="text-6xl font-medium">
                    404
                </div>
                <div class="text-xl md:text-3xl font-medium mb-4">
                    Oops. Parece que a página que você está procurando não existe mais.
                </div>
                <div class="text-lg mb-8">
                    Você pode ter digitado incorretamente o endereço ou a página pode ter sido movida.
                </div>
                <RouterLink
                    to="/"
                    class="border border-white rounded p-4"
                >
                    Voltar ao Sistema
                </RouterLink>
            </div>
        </div>
    </div>
</template>
<script>
    export default {
        name: 'P404',
    };
</script>
<style>
  .gradient {
    background-image: linear-gradient(135deg, #5e5d5f 35%, #9e9fa1 100%);
  }
</style>