$(document).ready(function () {
    const $search = $('#search');
    const $dropdownBox = $('#dropdown-box');
    const $form = $('.sidebar-search form');

    // Fetch book data
    $.getJSON('/books', function (books) {
        // Filter books based on search term
        const filterBooks = (searchTerm) =>
            books.filter(book =>
                [book.title, book.author, book.genre].some(field =>
                    field.toLowerCase().includes(searchTerm)
                )
            );

        // Display dropdown
        const displayDropdown = (books) => {
            $dropdownBox.empty();
            if (books.length) {
                books.forEach(book => {
                    const genreFolder = book.genre.toLowerCase().replace(/\s+/g, '-');
                    const sanitizedTitle = book.title.replace(/[^a-zA-Z0-9]/g, '').replace(/\s+/g, '');
                    const bookImageUrl = `/bookimages/${genreFolder}/${sanitizedTitle}.jpg`;

                    $dropdownBox.append(`
                        <li>
                            <a href="book-details.html?id=${book.id}" class="text-decoration-none">
                                <img src="${bookImageUrl}" alt="${book.title}" onerror="this.onerror=null;this.src='/bookimages/default-image.jpg';">
                                <div class="book-info">
                                    <p><strong>${book.title}</strong></p>
                                    <p>${book.author}</p>
                                    <p>${book.genre} | ${book.year}</p>
                                </div>
                            </a>
                        </li>
                    `);
                });
            } else {
                $dropdownBox.append('<li><p class="no-results">No results found</p></li>');
            }
            $dropdownBox.show();
        };

        // Search input handler
        $search.on('input', function () {
            const searchTerm = $(this).val().toLowerCase();
            searchTerm ? displayDropdown(filterBooks(searchTerm)) : $dropdownBox.hide();
        });

        // Form submission handler
        $form.on('submit', function (event) {
            event.preventDefault();
            const searchTerm = $search.val().toLowerCase();
            const foundBook = books.find(book => book.title.toLowerCase() === searchTerm);

            window.location.href = foundBook
                ? `book-details.html?id=${foundBook.id}`
                : `book-not-found.html`;
        });

        // Hide dropdown when clicking outside
        $(document).on('click', (event) => {
            if (!$(event.target).closest('#dropdown-box, #search').length) {
                $dropdownBox.hide();
            }
        });
    });
});
