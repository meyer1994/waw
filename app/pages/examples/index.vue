<template>
  <div class="p-8 bg-gray-50 min-h-screen font-sans text-gray-900">
    <header class="mb-12 max-w-4xl mx-auto text-center">
      <h1 class="text-4xl font-extrabold text-gray-900 mb-4">
        Interface Examples
      </h1>
      <p class="text-lg text-gray-600">
        Explore a set of brainstormed interface concepts for deputy profiles,
        focusing on transparency and networking.
      </p>
    </header>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
      <!-- Connection Network -->
      <NuxtLink
        to="/examples/deputy-network"
        class="group bg-white p-6 rounded-2xl shadow-sm border border-gray-200 hover:border-blue-500 hover:shadow-md transition-all"
      >
        <div class="w-12 h-12 bg-purple-100 text-purple-600 rounded-lg flex items-center justify-center mb-4 group-hover:bg-purple-600 group-hover:text-white transition-colors">
          <span class="font-bold text-xl">🕸️</span>
        </div>
        <h3 class="text-xl font-bold mb-2">Connection Network</h3>
        <p class="text-gray-500 text-sm mb-4">Analysis of co-authorship and ideological clusters.</p>
        <span class="text-purple-600 text-sm font-semibold inline-flex items-center group-hover:translate-x-1 transition-transform">
          View Interface →
        </span>
      </NuxtLink>

      <!-- Expense Analysis -->
      <NuxtLink
        to="/examples/deputy-expenses"
        class="group bg-white p-6 rounded-2xl shadow-sm border border-gray-200 hover:border-blue-500 hover:shadow-md transition-all"
      >
        <div class="w-12 h-12 bg-red-100 text-red-600 rounded-lg flex items-center justify-center mb-4 group-hover:bg-red-600 group-hover:text-white transition-colors">
          <span class="font-bold text-xl">💰</span>
        </div>
        <h3 class="text-xl font-bold mb-2">Expense Analysis</h3>
        <p class="text-gray-500 text-sm mb-4">Financial transparency and transaction history.</p>
        <span class="text-red-600 text-sm font-semibold inline-flex items-center group-hover:translate-x-1 transition-transform">
          View Interface →
        </span>
      </NuxtLink>
    </div>
  </div>
</template>
