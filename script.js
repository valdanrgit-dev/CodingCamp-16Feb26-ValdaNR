let todos = [];
let filterStatus = 'all'; // Menyimpan status filter (all, completed, incomplete)

function addTodo() {
    const todoInput = document.getElementById('todo-input');
    const todoDate = document.getElementById('todo-date');

    if (todoInput.value.trim() === '' || todoDate.value === '') {
        alert('Please enter a todo item and select a due date.');
    } else {
        const newTodo = {
            id: Date.now(),
            text: todoInput.value,
            dueDate: todoDate.value,
            completed: false
        };
        todos.push(newTodo);
        todoInput.value = '';
        todoDate.value = '';
        renderTodos();
    }
}

function renderTodos() {
    const tbody = document.querySelector('table tbody');
    tbody.innerHTML = '';

    const totalRows = 8; // Jumlah baris yang ditampilkan
    
    // Filter todos berdasarkan status filter
    let filteredTodos = todos;
    if (filterStatus === 'completed') {
        filteredTodos = todos.filter(todo => todo.completed);
    } else if (filterStatus === 'incomplete') {
        filteredTodos = todos.filter(todo => !todo.completed);
    }
    
    // Jika tidak ada todos, tampilkan pesan saja
    if (filteredTodos.length === 0) {
        const emptyRow = document.createElement('tr');
        emptyRow.innerHTML = `
            <td colspan="4" class="empty-message">No todo found</td>
        `;
        tbody.appendChild(emptyRow);
    } else {
        // Tampilkan todos
        filteredTodos.forEach((todo, index) => {
            const row = document.createElement('tr');
            
            const statusClass = todo.completed ? 'completed' : '';
            
            row.innerHTML = `
                <td>${index + 1}</td>
                <td class="${statusClass}">${todo.text}</td>
                <td>${todo.dueDate}</td>
                <td>
                    <button class="btn btn-sm btn-success" onclick="completeTodo(${todo.id})">
                        ${todo.completed ? '✓' : 'Tandai'}
                    </button>
                    <button class="btn btn-sm btn-danger" onclick="deleteTodo(${todo.id})">
                        Hapus
                    </button>
                </td>
            `;
            tbody.appendChild(row);
        });

        // Tambahkan baris kosong untuk mengisi tabel
        for (let i = filteredTodos.length; i < totalRows; i++) {
            const emptyRow = document.createElement('tr');
            emptyRow.innerHTML = `
                <td>&nbsp;</td>
                <td>&nbsp;</td>
                <td>&nbsp;</td>
                <td>&nbsp;</td>
            `;
            tbody.appendChild(emptyRow);
        }
    }
}

function completeTodo(id) {
    const todo = todos.find(t => t.id === id);
    if (todo) {
        todo.completed = !todo.completed;
        renderTodos();
    }
}

function deleteTodo(id) {
    todos = todos.filter(t => t.id !== id);
    renderTodos();
}

function clearAllTodos() {
    if (confirm('Apakah Anda yakin ingin menghapus semua todo?')) {
        todos = [];
        renderTodos();
    }
}

function toggleFilter() {
    const filterButton = document.getElementById('filter-button');
    const filterOptions = ['all', 'incomplete', 'completed'];
    const currentIndex = filterOptions.indexOf(filterStatus);
    const nextIndex = (currentIndex + 1) % filterOptions.length;
    filterStatus = filterOptions[nextIndex];
    
    // Update tombol teks
    const filterText = filterStatus === 'all' ? 'All' : 
                       filterStatus === 'incomplete' ? 'Incomplete' : 'Completed';
    filterButton.innerHTML = `<strong style="color: white">Filter: ${filterText}</strong>`;
    
    renderTodos();
}

// Event Listeners
document.getElementById('add-button').addEventListener('click', addTodo);
document.getElementById('clear-button').addEventListener('click', clearAllTodos);
document.getElementById('filter-button').addEventListener('click', toggleFilter);

// Allow Enter key to add todo
document.getElementById('todo-input').addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
        addTodo();
    }
});

// Initialize renderTodos saat halaman load
renderTodos();