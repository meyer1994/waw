<template>
  <div class="p-8 bg-gray-50 min-h-screen font-sans text-gray-900">
    <header class="mb-8">
      <h1 class="text-3xl font-bold text-gray-900">
        Detailed Expense Analysis
      </h1>
      <p class="text-gray-600">
        Breakdown of public funds utilization
      </p>
    </header>

    <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <!-- Total Spending Summary -->
      <div class="lg:col-span-1 space-y-6">
        <div class="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div class="text-sm font-medium text-gray-500 uppercase mb-1">
            Total Annual Spending
          </div>
          <div class="text-4xl font-bold text-gray-900">
            R$ 142.500,00
          </div>
          <div class="mt-4 flex items-center text-sm text-red-600">
            <span class="font-bold">↑ 12%</span>
            <span class="text-gray-400 ml-2">compared to previous year</span>
          </div>
        </div>

        <div class="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <h3 class="font-bold mb-4 text-gray-700">
            Spending Distribution
          </h3>
          <div class="space-y-4">
            <div class="space-y-1">
              <div class="flex justify-between text-sm">
                <span class="text-gray-600">Office Rent</span>
                <span class="font-bold">R$ 45.000</span>
              </div>
              <div class="w-full bg-gray-100 h-2 rounded-full overflow-hidden">
                <div
                  class="bg-indigo-500 h-full"
                  style="width: 60%"
                />
              </div>
            </div>
            <div class="space-y-1">
              <div class="flex justify-between text-sm">
                <span class="text-gray-600">Travel & Transport</span>
                <span class="font-bold">R$ 32.000</span>
              </div>
              <div class="w-full bg-gray-100 h-2 rounded-full overflow-hidden">
                <div
                  class="bg-indigo-400 h-full"
                  style="width: 40%"
                />
              </div>
            </div>
            <div class="space-y-1">
              <div class="flex justify-between text-sm">
                <span class="text-gray-600">Staff Salaries</span>
                <span class="font-bold">R$ 50.000</span>
              </div>
              <div class="w-full bg-gray-100 h-2 rounded-full overflow-hidden">
                <div
                  class="bg-indigo-300 h-full"
                  style="width: 50%"
                />
              </div>
            </div>
            <div class="space-y-1">
              <div class="flex justify-between text-sm">
                <span class="text-gray-600">Other Supplies</span>
                <span class="font-bold">R$ 15.500</span>
              </div>
              <div class="w-full bg-gray-100 h-2 rounded-full overflow-hidden">
                <div
                  class="bg-indigo-200 h-full"
                  style="width: 20%"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Transaction Table -->
      <div class="lg:col-span-2 bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div class="p-6 border-b border-gray-200 flex justify-between items-center">
          <h3 class="font-bold text-gray-700">
            Recent Transactions
          </h3>
          <button class="text-sm text-blue-600 font-medium hover:underline">
            Export CSV
          </button>
        </div>
        <div class="overflow-x-auto">
          <table class="w-full text-left">
            <thead class="bg-gray-50 text-gray-500 text-xs uppercase font-bold">
              <tr>
                <th class="px-6 py-3">
                  Date
                </th>
                <th class="px-6 py-3">
                  Description
                </th>
                <th class="px-6 py-3">
                  Category
                </th>
                <th class="px-6 py-3 text-right">
                  Amount
                </th>
              </tr>
            </thead>
            <tbody class="divide-y divide-gray-100 text-sm">
              <tr>
                <td class="px-6 py-4 text-gray-500">
                  Oct 01, 2023
                </td>
                <td class="px-6 py-4 font-medium">
                  Airfare to Brasília
                </td>
                <td class="px-6 py-4">
                  Travel
                </td>
                <td class="px-6 py-4 text-right font-bold">
                  R$ 1.200,00
                </td>
              </tr>
              <tr>
                <td class="px-6 py-4 text-gray-500">
                  Sep 25, 2023
                </td>
                <td class="px-6 py-4 font-medium">
                  Office Supplies - Toner
                </td>
                <td class="px-6 py-4">
                  Supplies
                </td>
                <td class="px-6 py-4 text-right font-bold">
                  R$ 450,00
                </td>
              </tr>
              <tr>
                <td class="px-6 py-4 text-gray-500">
                  Sep 20, 2023
                </td>
                <td class="px-6 py-4 font-medium">
                  Monthly Rent - Office X
                </td>
                <td class="px-6 py-4">
                  Rent
                </td>
                <td class="px-6 py-4 text-right font-bold">
                  R$ 3.800,00
                </td>
              </tr>
              <tr>
                <td class="px-6 py-4 text-gray-500">
                  Sep 15, 2023
                </td>
                <td class="px-6 py-4 font-medium">
                  Assistant Salary - Sept
                </td>
                <td class="px-6 py-4">
                  Staff
                </td>
                <td class="px-6 py-4 text-right font-bold">
                  R$ 4.200,00
                </td>
              </tr>
              <tr>
                <td class="px-6 py-4 text-gray-500">
                  Sep 10, 2023
                </td>
                <td class="px-6 py-4 font-medium">
                  Fuel Reimbursement
                </td>
                <td class="px-6 py-4">
                  Travel
                </td>
                <td class="px-6 py-4 text-right font-bold">
                  R$ 120,00
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>
