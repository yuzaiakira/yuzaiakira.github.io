// Main JavaScript file for Akira's Personal Website

// GitHub API configuration
const GITHUB_USERNAME = 'yuzaiakira';
const GITHUB_API_BASE = 'https://api.github.com';

// GitHub API endpoints
const endpoints = {
    user: `${GITHUB_API_BASE}/users/${GITHUB_USERNAME}`,
    repos: `${GITHUB_API_BASE}/users/${GITHUB_USERNAME}/repos?sort=updated&per_page=6`
};

// Language color mapping for repository cards
const LANGUAGE_COLORS = {
    'JavaScript': '#f1e05a',
    'TypeScript': '#2b7489',
    'Python': '#3572A5',
    'Java': '#b07219',
    'C++': '#f34b7d',
    'C#': '#178600',
    'PHP': '#4F5D95',
    'Ruby': '#701516',
    'Go': '#00ADD8',
    'Rust': '#dea584',
    'Swift': '#ffac45',
    'Kotlin': '#F18E33',
    'HTML': '#e34c26',
    'CSS': '#563d7c',
    'Vue': '#2c3e50',
    'React': '#61dafb',
    'Angular': '#dd0031',
    'Node.js': '#339933',
    'Other': '#6c757d'
};

/**
 * Fetch GitHub user data and repositories
 */
async function fetchGitHubData() {
    try {
        // Fetch user profile data
        const userResponse = await fetch(endpoints.user);
        if (!userResponse.ok) {
            throw new Error(`HTTP error! status: ${userResponse.status}`);
        }
        const userData = await userResponse.json();
        
        // Fetch repositories data
        const reposResponse = await fetch(endpoints.repos);
        if (!reposResponse.ok) {
            throw new Error(`HTTP error! status: ${reposResponse.status}`);
        }
        const reposData = await reposResponse.json();
        
        // Update GitHub stats in contact section
        updateGitHubStats(userData);
        
        // Update GitHub activity section
        updateGitHubActivity(userData, reposData);
        
    } catch (error) {
        console.error('Error fetching GitHub data:', error);
        showErrorState();
    }
}

/**
 * Update GitHub stats in contact section
 */
function updateGitHubStats(userData) {
    const statsElement = document.getElementById('github-stats');
    if (statsElement) {
        statsElement.textContent = `${userData.public_repos} repos • ${userData.followers} followers`;
    }
}

/**
 * Update GitHub activity section with user data and repositories
 */
function updateGitHubActivity(userData, reposData) {
    // Update stats cards
    updateStatsCards(userData);
    
    // Update repositories
    updateRepositories(reposData);
}

/**
 * Update statistics cards with user data
 */
function updateStatsCards(userData) {
    const elements = {
        'repo-count': userData.public_repos,
        'followers-count': userData.followers,
        'following-count': userData.following,
        'member-since': formatDate(userData.created_at)
    };
    
    Object.entries(elements).forEach(([id, value]) => {
        const element = document.getElementById(id);
        if (element) {
            element.textContent = value;
        }
    });
}

/**
 * Format date for display
 */
function formatDate(dateString) {
    const date = new Date(dateString);
    const options = { year: 'numeric', month: 'short' };
    return date.toLocaleDateString('en-US', options);
}

/**
 * Update repositories display
 */
function updateRepositories(reposData) {
    const reposContainer = document.getElementById('repos-container');
    
    if (!reposContainer) return;
    
    if (!reposData || reposData.length === 0) {
        reposContainer.innerHTML = `
            <div class="col-span-full text-center py-8">
                <i class="fas fa-folder-open text-3xl text-gray-400 mb-4"></i>
                <p class="text-gray-600">No repositories found</p>
            </div>
        `;
        return;
    }
    
    const reposHTML = reposData.map(repo => createRepositoryCard(repo)).join('');
    reposContainer.innerHTML = reposHTML;
}

/**
 * Create HTML for a single repository card
 */
function createRepositoryCard(repo) {
    const language = repo.language || 'Other';
    const stars = repo.stargazers_count;
    const forks = repo.forks_count;
    const updated = formatDetailedDate(repo.updated_at);
    const languageColor = getLanguageColor(language);
    
    return `
        <div class="neumorphic-card rounded-2xl p-6 hover:scale-105 transition-transform duration-300 repo-card">
            <div class="flex items-start justify-between mb-4">
                <h5 class="text-lg font-semibold text-gray-800 truncate flex-1 mr-2">
                    <a href="${repo.html_url}" target="_blank" rel="noopener noreferrer" 
                       class="hover:text-blue-600 transition-colors duration-300">
                        ${repo.name}
                    </a>
                </h5>
                ${repo.fork ? '<i class="fas fa-code-branch text-gray-400 text-sm" title="Forked repository"></i>' : ''}
            </div>
            
            <p class="text-gray-600 text-sm mb-4 line-clamp-2">
                ${repo.description || 'No description available'}
            </p>
            
            <div class="flex items-center justify-between text-sm text-gray-500 mb-3">
                <span class="flex items-center">
                    <span class="w-3 h-3 rounded-full mr-2" style="background-color: ${languageColor}"></span>
                    ${language}
                </span>
                <span class="text-xs">Updated ${updated}</span>
            </div>
            
            <div class="flex items-center space-x-4 text-sm text-gray-500">
                <span class="flex items-center">
                    <i class="fas fa-star mr-1"></i>
                    ${stars}
                </span>
                <span class="flex items-center">
                    <i class="fas fa-code-branch mr-1"></i>
                    ${forks}
                </span>
            </div>
        </div>
    `;
}

/**
 * Format detailed date for repository cards
 */
function formatDetailedDate(dateString) {
    const date = new Date(dateString);
    const options = { 
        year: 'numeric', 
        month: 'short', 
        day: 'numeric' 
    };
    return date.toLocaleDateString('en-US', options);
}

/**
 * Get language color for repository cards
 */
function getLanguageColor(language) {
    return LANGUAGE_COLORS[language] || LANGUAGE_COLORS['Other'];
}

/**
 * Show error state when GitHub API fails
 */
function showErrorState() {
    const reposContainer = document.getElementById('repos-container');
    if (reposContainer) {
        reposContainer.innerHTML = `
            <div class="col-span-full text-center py-8">
                <i class="fas fa-exclamation-triangle text-3xl text-red-400 mb-4"></i>
                <p class="text-gray-600">Unable to load GitHub data</p>
                <p class="text-sm text-gray-500 mt-2">Please try again later</p>
            </div>
        `;
    }
    
    // Update stats to show error
    const errorElements = ['repo-count', 'followers-count', 'following-count', 'member-since'];
    errorElements.forEach(id => {
        const element = document.getElementById(id);
        if (element) {
            element.textContent = 'Error';
        }
    });
}

/**
 * Initialize smooth scroll functionality
 */
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

/**
 * Initialize intersection observer for fade-in animations
 */
function initFadeInAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animationPlayState = 'running';
            }
        });
    }, observerOptions);

    // Observe all fade-in elements EXCEPT the mouse animation
    document.querySelectorAll('.fade-in').forEach(el => {
        // Skip the mouse animation container
        if (!el.closest('.mouse-scroll')) {
            el.style.animationPlayState = 'paused';
            observer.observe(el);
        }
    });
}

/**
 * Initialize contact link hover effects
 */
function initContactLinkEffects() {
    document.querySelectorAll('.contact-link').forEach(link => {
        link.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px) scale(1.02)';
        });
        
        link.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
}

/**
 * Initialize mouse scroll animation functionality
 */
function initMouseScrollAnimation() {
    const mouseScroll = document.querySelector('.mouse-scroll');
    if (mouseScroll) {
        mouseScroll.addEventListener('click', function() {
            // Scroll to the about section
            const aboutSection = document.querySelector('section');
            if (aboutSection) {
                aboutSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
        
        // Add hover effect for better UX
        mouseScroll.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.1)';
        });
        
        mouseScroll.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
        });
    }
}

/**
 * Initialize all website functionality
 */
function initWebsite() {
    // Initialize GitHub data
    fetchGitHubData();
    
    // Initialize smooth scroll
    initSmoothScroll();
    
    // Initialize fade-in animations
    initFadeInAnimations();
    
    // Initialize contact link effects
    initContactLinkEffects();
    
    // Initialize mouse scroll animation
    initMouseScrollAnimation();
}

// Initialize website when DOM is loaded
document.addEventListener('DOMContentLoaded', initWebsite); 