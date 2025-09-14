document.addEventListener('DOMContentLoaded', () => {
  fetch('/api/admin/statistics')
    .then(res => res.json())
    .then(data => {
      document.getElementById('totalUsers').textContent = data.totalUsers;
      document.getElementById('totalItems').textContent = data.totalItems;
      document.getElementById('totalTransactions').textContent = data.totalTransactions;
      document.getElementById('totalReports').textContent = data.totalReports;
    });

  fetch('/api/admin/users')
    .then(res => res.json())
    .then(users => {
      const tbody = document.getElementById('userTableBody');
      tbody.innerHTML = '';
      users.forEach(user => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
          <td>${user.id}</td>
          <td>${user.name}</td>
          <td>${user.email}</td>
          <td>
            <button data-id="${user.id}" class="delete-user-btn">Delete</button>
          </td>`;
        tbody.appendChild(tr);
      });
      tbody.addEventListener('click', e => {
        if (e.target.classList.contains('delete-user-btn')) {
          const id = e.target.dataset.id;
          fetch('/api/admin/users/' + id, { method: 'DELETE' })
            .then(() => e.target.closest('tr').remove());
        }
      });
    });

  fetch('/api/admin/items')
    .then(res => res.json())
    .then(items => {
      const tbody = document.getElementById('itemTableBody');
      tbody.innerHTML = '';
      items.forEach(item => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
          <td>${item.id}</td>
          <td>${item.name}</td>
          <td>${item.category}</td>
          <td>${item.status}</td>
          <td>
            <button>Edit</button>
            <button class="delete-item-btn" data-id="${item.id}">Delete</button>
          </td>`;
        tbody.appendChild(tr);
      });
      tbody.addEventListener('click', e => {
        if (e.target.classList.contains('delete-item-btn')) {
          const id = e.target.dataset.id;
          fetch('/api/admin/items/' + id, { method: 'DELETE' })
            .then(() => e.target.closest('tr').remove());
        }
      });
    });

  fetch('/api/admin/transactions')
    .then(res => res.json())
    .then(list => {
      const tbody = document.getElementById('transactionTableBody');
      tbody.innerHTML = '';
      list.forEach(tx => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
          <td>${tx.id}</td>
          <td>${tx.username}</td>
          <td>${tx.itemName}</td>
          <td>${tx.date}</td>
          <td>${tx.amount}</td>`;
        tbody.appendChild(tr);
      });
    });

  fetch('/api/admin/reports')
    .then(res => res.json())
    .then(reports => {
      const tbody = document.getElementById('reportTableBody');
      tbody.innerHTML = '';
      reports.forEach(r => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
          <td>${r.id}</td>
          <td>${r.username}</td>
          <td>${r.issue}</td>
          <td>${r.reportDate}</td>
          <td>
            <button class="resolve-report-btn" data-id="${r.id}">Resolve</button>
          </td>`;
        tbody.appendChild(tr);
      });
      tbody.addEventListener('click', e => {
        if (e.target.classList.contains('resolve-report-btn')) {
          const id = e.target.dataset.id;
          fetch('/api/admin/reports/' + id + '/resolve', { method: 'POST' })
            .then(() => e.target.closest('tr').remove());
        }
      });
    });
});
