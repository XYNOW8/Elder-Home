<template>
  <div class="admin-home">
    <h1>Welcome to the Admin Dashboard</h1>
    
    <div class="admin-content">
      <div class="admin-option">
        <router-link to="/user-management" class="option-card">
          <h2>Manage Users</h2>
          <p>View and manage user accounts.</p>
        </router-link>
      </div>
      
      <div class="admin-option">
        <router-link to="/reports" class="option-card">
          <h2>View Reports</h2>
          <p>Analyze reports and insights.</p>
        </router-link>
      </div>
      
      <div class="admin-option">
        <router-link to="/settings" class="option-card">
          <h2>Settings</h2>
          <p>Adjust application settings.</p>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "AdminHomeView",
};
</script>

<style scoped>
.admin-home {
  text-align: center;
  background-color: #f4f4f9;
  padding: 50px 0;
  min-height: 100vh;
}

h1 {
  font-size: 2.5em;
  color: #333;
  margin-bottom: 30px;
}

.admin-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
}

.admin-option {
  width: 100%;
  max-width: 300px;
}

.option-card {
  display: block;
  padding: 20px;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  text-decoration: none;
  color: #333;
  transition: background-color 0.3s, transform 0.3s;
}

.option-card:hover {
  background-color: #e0e0e0;
  transform: translateY(-5px);
}

.option-card h2 {
  font-size: 1.5em;
  margin: 0;
}

.option-card p {
  margin: 10px 0 0;
  color: #666;
}
</style>
