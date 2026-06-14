document.addEventListener('DOMContentLoaded', function() {
    initThemeToggle();
    initCategoryFilter();
    initCommentForm();
    initMobileMenu();
});

function initThemeToggle() {
    const themeToggle = document.querySelector('.theme-toggle');
    const icon = themeToggle.querySelector('i');
    
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        document.documentElement.setAttribute('data-theme', savedTheme);
        updateIcon(savedTheme);
    }

    themeToggle.addEventListener('click', function() {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        updateIcon(newTheme);
    });

    function updateIcon(theme) {
        if (theme === 'dark') {
            icon.classList.remove('fa-moon');
            icon.classList.add('fa-sun');
        } else {
            icon.classList.remove('fa-sun');
            icon.classList.add('fa-moon');
        }
    }
}

function initCategoryFilter() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const blogCards = document.querySelectorAll('.blog-card');

    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');

            const category = this.getAttribute('data-category');

            blogCards.forEach(card => {
                const cardCategory = card.getAttribute('data-category');
                if (category === 'all' || cardCategory === category) {
                    card.style.display = 'block';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });
}

function initCommentForm() {
    const form = document.getElementById('commentForm');
    const contentField = document.getElementById('content');
    const errorMessage = document.getElementById('contentError');

    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const content = contentField.value.trim();

        if (!content) {
            errorMessage.textContent = '评论内容不能为空';
            errorMessage.classList.add('show');
            return;
        }

        errorMessage.classList.remove('show');

        const name = document.getElementById('name').value || '匿名用户';
        const email = document.getElementById('email').value;

        addComment(name, content);

        form.reset();
    });

    contentField.addEventListener('input', function() {
        if (this.value.trim()) {
            errorMessage.classList.remove('show');
        }
    });

    function addComment(name, content) {
        const commentsList = document.querySelector('.comments-list');
        
        const commentItem = document.createElement('div');
        commentItem.className = 'comment-item';
        
        const now = new Date();
        const timeStr = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')} ${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;

        commentItem.innerHTML = `
            <div class="comment-avatar">
                <i class="fas fa-user-circle"></i>
            </div>
            <div class="comment-content">
                <div class="comment-header">
                    <span class="comment-name">${name}</span>
                    <span class="comment-time">${timeStr}</span>
                </div>
                <p>${content}</p>
            </div>
        `;

        commentsList.insertBefore(commentItem, commentsList.children[1]);
    }
}

function initMobileMenu() {
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');

    menuToggle.addEventListener('click', function() {
        navLinks.classList.toggle('active');
    });
}