<template>
  <div class="table-container">
    <h1>Create Table and Export to CSV</h1>

    <!-- Step 1: Define the number of columns -->
    <form @submit.prevent="setColumns">
      <label for="numColumns">Enter number of columns:</label>
      <input v-model.number="numColumns" type="number" id="numColumns" min="1" required />
      <button type="submit">Set Columns</button>
    </form>

    <!-- Step 2: Define column headers if columns are set -->
    <div v-if="columns.length">
      <h2>Enter Column Headers</h2>
      <form @submit.prevent="setHeaders">
        <div v-for="(index) in columns" :key="index">
          <input v-model="columns[index]" :placeholder="'Enter header for column ' + (index + 1)" required />
        </div>
        <button type="submit">Set Headers</button>
      </form>
    </div>

    <!-- Step 3: Create rows for data entry -->
    <div v-if="headers.length">
      <h2>Enter Table Data</h2>
      <form @submit.prevent="addRow">
        <div v-for="(header, index) in headers" :key="index">
          <input v-model="newRow[index]" :placeholder="'Enter ' + header" required />
        </div>
        <button type="submit">Add Row</button>
      </form>
    </div>

    <!-- Display the table with headers and rows -->
    <table v-if="rows.length">
      <thead>
      <tr>
        <th v-for="header in headers" :key="header">{{ header }}</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="(row, rowIndex) in rows" :key="rowIndex">
        <td v-for="(cell, cellIndex) in row" :key="cellIndex">{{ cell }}</td>
      </tr>
      </tbody>
    </table>

    <!-- Export to CSV button -->
    <button @click="exportToCSV" v-if="rows.length">Export to CSV</button>
  </div>
</template>

<script setup>
import { ref } from 'vue';

// State variables
const numColumns = ref(0);
const columns = ref([]);
const headers = ref([]);
const rows = ref([]);
const newRow = ref([]);

// Step 1: Set the number of columns and initialize the column headers array
const setColumns = () => {
  columns.value = Array(numColumns.value).fill('');
  newRow.value = Array(numColumns.value).fill('');
};

// Step 2: Set the headers for the table based on user input
const setHeaders = () => {
  headers.value = [...columns.value];
};

// Step 3: Add a new row to the table
const addRow = () => {
  rows.value.push([...newRow.value]);
  newRow.value = Array(numColumns.value).fill('');
};

// Step 4: Export the table data to CSV
const exportToCSV = () => {
  let csvContent = 'data:text/csv;charset=utf-8,';

  // Add headers
  csvContent += headers.value.join(',') + '\n';

  // Add row data
  rows.value.forEach(row => {
    csvContent += row.join(',') + '\n';
  });

  // Create a link to download the CSV file
  const encodedUri = encodeURI(csvContent);
  const link = document.createElement('a');
  link.setAttribute('href', encodedUri);
  link.setAttribute('download', 'table_data.csv');
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};
</script>

<style scoped>
.table-container {
  max-width: 600px;
  margin: auto;
  text-align: center;
}

form {
  margin-bottom: 20px;
}

input {
  margin: 5px;
  padding: 10px;
  font-size: 16px;
}

button {
  padding: 10px 20px;
  margin-top: 10px;
  background-color: #007bff;
  color: white;
  border: none;
  cursor: pointer;
}

button:hover {
  background-color: #0056b3;
}

table {
  width: 100%;
  margin-bottom: 20px;
  border-collapse: collapse;
}

th, td {
  padding: 12px;
  border: 1px solid #ddd;
}
</style>
