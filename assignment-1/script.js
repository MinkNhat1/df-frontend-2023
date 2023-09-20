// Your JS code goes here

/*DISPLAY STUFFs */

/*Lấy id của các Modal */
const addModal = document.getElementById('add-modal');
const delModal = document.getElementById('delete-modal')


/*Các nút tương tác */
const searchInput = document.getElementById("search-func");
const addBtn = document.getElementById('add-func');
const deleteButtons = document.querySelectorAll('.del-func'); 
const closeModalButton = document.querySelectorAll('.close-modal');

const tableBody = document.getElementById("book-table");
const bookData = tableBody.querySelectorAll("tr");

const addBook = document.getElementById('add-book-form');

function openAddModal() {
    addModal.style.display = 'flex'; 
}

function closeAddModal() {
    addModal.style.display = 'none'; 
}

function openDeleteModal() {
    delModal.style.display = 'flex'; 
}

function closeDeleteModal() {
    delModal.style.display = 'none'; 
}



addBtn.addEventListener('click', openAddModal);
closeModalButton.forEach(closeModalButton => {
    closeModalButton.addEventListener('click', () => {
        closeAddModal();
        closeDeleteModal();
    });
});


/*Them sach */

addBook.addEventListener("click", function (event) {
    event.preventDefault();

    const name = document.getElementById("name-add").value;
    const author = document.getElementById("author-add").value;
    const topic = document.getElementById("topic").value;

    const tableData = document.getElementById("book-table");
    const newRow = document.createElement("tr");
    

    newRow.innerHTML = `
    <td>${name}</td>
    <td>${author}</td>
    <td>${topic}</td>
    <td class="del-func">Delete</td>
    `;

    tableData.appendChild(newRow);
    closeAddModal();

}); 


/* Gán delete lên từng dòng trong table */
tableBody.addEventListener("click", function (event) {
    if (event.target.classList.contains("del-func")) {
        event.preventDefault();

        const row = event.target.closest("tr");
        if (row) {
            const nameCell = row.getElementsByTagName("td")[0];
            if (nameCell) {
                const bookName = nameCell.textContent;
                const deleteMessage = document.getElementById("delete-message");
                deleteMessage.innerHTML = `Are you sure you want to delete <strong>${bookName}</strong>?`;
            }

        openDeleteModal();

        const delBook = document.getElementById('del-book-form');
        delBook.addEventListener("click", function() {
            const row = event.target.closest("tr");
            if (row){
                row.remove();
                closeDeleteModal();
            }
        });
            }    
    }
});

/* Tìm sách */
searchInput.addEventListener("input", searchBooks);
function searchBooks() {
    const query = searchInput.value.toLowerCase();
    const rows = tableBody.getElementsByTagName("tr");

    for (const row of rows) {
        const nameCell = row.getElementsByTagName("td")[0];
        if (nameCell) {
            const bookName = nameCell.textContent.toLowerCase();
            if (bookName.includes(query)) {
              row.style.display = ""; 
            } else {
              row.style.display = "none";

            }
        }
    }
 }