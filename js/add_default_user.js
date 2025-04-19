// Script to add a default admin user with password to localStorage users array

(function addDefaultUser() {
  const defaultUser = {
    name: "Admin Corona",
    email: "admin@corona.com",
    role: "Administrador",
    password: "admin123"
  };

  let users = JSON.parse(localStorage.getItem('users') || '[]');

  const exists = users.some(user => user.email === defaultUser.email);

  if (!exists) {
    users.push(defaultUser);
    localStorage.setItem('users', JSON.stringify(users));
    console.log("Default admin user added to localStorage.");
  } else {
    console.log("Default admin user already exists in localStorage.");
  }
})();
