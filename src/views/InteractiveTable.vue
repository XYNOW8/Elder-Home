<template>
  <v-container>
    <h1>Interactive Tables</h1>

    <!-- Users Table -->
    <v-card>
      <v-card-title>
        Users Table
        <v-btn @click="exportUsersToCSV" class="ml-auto" color="primary">
          Export Users to CSV
        </v-btn>
      </v-card-title>
      <v-data-table
        :headers="userHeaders"
        :items="users"
        :items-per-page="10"
        :search="searchUsers"
        class="elevation-1"
        :loading="loadingUsers"
      >
        <template v-slot:top>
          <v-text-field
            v-model="searchUsers"
            label="Search Users"
            class="mx-4"
            append-icon="mdi-magnify"
          ></v-text-field>
        </template>
      </v-data-table>
    </v-card>

    <!-- Products Table -->
    <v-card class="mt-4">
      <v-card-title>
        Products Table
        <v-btn @click="exportProductsToCSV" class="ml-auto" color="primary">
          Export Products to CSV
        </v-btn>
      </v-card-title>
      <v-data-table
        :headers="productHeaders"
        :items="products"
        :items-per-page="10"
        :search="searchProducts"
        class="elevation-1"
        :loading="loadingProducts"
      >
        <template v-slot:top>
          <v-text-field
            v-model="searchProducts"
            label="Search Products"
            class="mx-4"
            append-icon="mdi-magnify"
          ></v-text-field>
        </template>
      </v-data-table>
    </v-card>
  </v-container>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import { getFunctions, httpsCallable } from 'firebase/functions'
import csvDownload from 'json-to-csv-export' // If using a CSV library

// Table headers for Users
const userHeaders = [
  { text: 'ID', value: 'id', sortable: true },
  { text: 'Name', value: 'name', sortable: true },
  { text: 'Email', value: 'email', sortable: true },
  { text: 'Gender', value: 'gender', sortable: true },
]

// Table headers for Products
const productHeaders = [
  { text: 'ID', value: 'id', sortable: true },
  { text: 'Product Name', value: 'product_name', sortable: true },
  { text: 'Category', value: 'category', sortable: true },
  { text: 'Release Year', value: 'release_year', sortable: true },
]

// State variables
const searchUsers = ref('')
const searchProducts = ref('')
const users = ref([])
const products = ref([])
const loadingUsers = ref(false)
const loadingProducts = ref(false)

// Firebase Cloud Functions reference
const functionsInstance = getFunctions()

// Fetch users from Firebase Cloud Function
const fetchUsers = async () => {
  loadingUsers.value = true
  try {
    const getUsers = httpsCallable(functionsInstance, 'getUsers')
    const result = await getUsers()
    users.value = result.data // Set users data from Cloud Function
  } catch (error) {
    console.error('Error fetching users:', error)
  } finally {
    loadingUsers.value = false
  }
}

// Fetch products from Firebase Cloud Function
const fetchProducts = async () => {
  loadingProducts.value = true
  try {
    const getProducts = httpsCallable(functionsInstance, 'getProducts')
    const result = await getProducts()
    products.value = result.data
  } catch (error) {
    console.error('Error fetching products:', error)
  } finally {
    loadingProducts.value = false
  }
}

// Fetch data on component mount
onMounted(() => {
  fetchUsers()
  fetchProducts()
})

// Export Users to CSV
const exportUsersToCSV = () => {
  csvDownload({
    data: users.value,
    filename: 'users.csv',
    headers: [
      { label: 'ID', key: 'id' },
      { label: 'Name', key: 'name' },
      { label: 'Email', key: 'email' },
      { label: 'Age', key: 'age' }
    ]
  })
}

// Export Products to CSV
const exportProductsToCSV = () => {
  csvDownload({
    data: products.value,
    filename: 'products.csv',
    headers: [
      { label: 'ID', key: 'id' },
      { label: 'Product Name', key: 'product_name' },
      { label: 'Category', key: 'category' },
      { label: 'Release Year', key: 'release_year' }
    ]
  })
}
</script>
