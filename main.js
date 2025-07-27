// Tab switching for registration
function showTab(tab) {
    document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
    document.querySelectorAll('.tab-content').forEach(form => form.style.display = 'none');
    document.querySelector(`[onclick="showTab('${tab}')"]`).classList.add('active');
    document.getElementById(tab + 'Form').style.display = 'block';
  }
  
  // Registration logic
  if (document.getElementById('patientForm')) {
    document.getElementById('patientForm').onsubmit = function(e) {
      e.preventDefault();
      const data = Object.fromEntries(new FormData(this));
      let users = JSON.parse(localStorage.getItem('patients') || '[]');
      users.push(data);
      localStorage.setItem('patients', JSON.stringify(users));
      alert('Patient registered! You can now log in.');
      window.location.href = 'index.html';
    };
  }
  if (document.getElementById('doctorForm')) {
    document.getElementById('doctorForm').onsubmit = function(e) {
      e.preventDefault();
      const data = Object.fromEntries(new FormData(this));
      let users = JSON.parse(localStorage.getItem('doctors') || '[]');
      users.push(data);
      localStorage.setItem('doctors', JSON.stringify(users));
      alert('Doctor registered! You can now log in.');
      window.location.href = 'index.html';
    };
  }
  if (document.getElementById('adminForm')) {
    document.getElementById('adminForm').onsubmit = function(e) {
      e.preventDefault();
      const data = Object.fromEntries(new FormData(this));
      let users = JSON.parse(localStorage.getItem('admins') || '[]');
      users.push(data);
      localStorage.setItem('admins', JSON.stringify(users));
      alert('Admin registered! You can now log in.');
      window.location.href = 'index.html';
    };
  }
  
  // Login logic
  if (document.getElementById('loginForm')) {
    document.getElementById('loginForm').onsubmit = function(e) {
      e.preventDefault();
      const role = document.getElementById('loginRole').value;
      const username = document.getElementById('loginUsername').value;
      const password = document.getElementById('loginPassword').value;
      let users = JSON.parse(localStorage.getItem(role + 's') || '[]');
      let user;
      if (role === 'admin') {
        user = users.find(u => (u.adminid === username || u.email === username) && u.password === password);
      } else {
        user = users.find(u => (u.email === username || u.contact === username) && u.password === password);
      }
      if (user) {
        localStorage.setItem('currentUser', JSON.stringify({role, ...user}));
        if (role === 'patient') window.location.href = 'dashboard.html';
        else if (role === 'doctor') window.location.href = 'doctors.html';
        else if (role === 'admin') window.location.href = 'admin-dashboard.html';
      } else {
        alert('Invalid credentials!');
      }
    };
  }
  
  // Forgot password logic
  if (document.getElementById('forgotForm')) {
    document.getElementById('forgotForm').onsubmit = function(e) {
      e.preventDefault();
      const email = this.email.value;
      const newpassword = this.newpassword.value;
      let found = false;
      ['patients', 'doctors', 'admins'].forEach(role => {
        let users = JSON.parse(localStorage.getItem(role) || '[]');
        let user = users.find(u => u.email === email);
        if (user) {
          user.password = newpassword;
          localStorage.setItem(role, JSON.stringify(users));
          found = true;
        }
      });
      if (found) {
        alert('Password reset! You can now log in.');
        window.location.href = 'index.html';
      } else {
        alert('No user found with that email.');
      }
    };
  }