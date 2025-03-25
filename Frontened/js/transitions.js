// Simple page transition handler
const transitionWrapper = document.querySelector('.page-transition-wrapper');
const mainContent = document.querySelector('main');

// Function to handle page transitions
async function handlePageTransition(target) {
    try {
        console.log('Starting transition to:', target);
        
        // Start transition
        transitionWrapper.style.transform = 'scaleY(1)';
        
        // Wait for transition
        await new Promise(resolve => setTimeout(resolve, 500));
        
        // Load new content
        const pageName = target === '/' ? 'home' : target;
        const url = `/pages/${pageName}.html`;
        console.log('Fetching content from:', url);
        
        const response = await fetch(url);
        console.log('Response status:', response.status);
        
        if (!response.ok) {
            throw new Error(`Failed to load page: ${response.status}`);
        }
        
        const content = await response.text();
        console.log('Content loaded successfully');
        
        // Extract the main content from the loaded page
        const parser = new DOMParser();
        const doc = parser.parseFromString(content, 'text/html');
        const newMainContent = doc.querySelector('main');
        
        if (newMainContent) {
            mainContent.innerHTML = newMainContent.innerHTML;
        } else {
            mainContent.innerHTML = content;
        }
        
        // Update URL
        const newUrl = target === 'home' ? '/' : `/${target}`;
        window.history.pushState({}, '', newUrl);
        console.log('URL updated to:', newUrl);
        
        // End transition
        transitionWrapper.style.transformOrigin = 'bottom';
        transitionWrapper.style.transform = 'scaleY(0)';
        
        // Reset transition wrapper
        setTimeout(() => {
            transitionWrapper.style.transformOrigin = 'top';
        }, 500);
        
    } catch (error) {
        console.error('Error in handlePageTransition:', error);
        mainContent.innerHTML = `
            <section class="error">
                <h1>404</h1>
                <p>Page not found</p>
                <p>Error: ${error.message}</p>
                <a href="/" data-page="home" class="btn primary">Go Home</a>
            </section>
        `;
    }
}

// Handle navigation clicks
document.addEventListener('click', (e) => {
    const link = e.target.closest('a[data-page]');
    if (link) {
        e.preventDefault();
        e.stopPropagation();
        console.log('Navigation link clicked:', link.getAttribute('data-page'));
        const target = link.getAttribute('data-page');
        handlePageTransition(target);
    }
});

// Handle browser back/forward buttons
window.addEventListener('popstate', () => {
    console.log('Browser navigation detected');
    const target = window.location.pathname.replace('/', '') || 'home';
    handlePageTransition(target);
});

// Handle initial page load
window.addEventListener('load', () => {
    console.log('Initial page load');
    const path = window.location.pathname;
    const target = path.substring(1) || 'home';
    console.log('Initial target:', target);
    if (target !== '') {
        handlePageTransition(target);
    }
}); 