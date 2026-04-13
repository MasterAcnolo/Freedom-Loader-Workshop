/**
 * Theme Toggle - Light/Dark mode
 */

function setupThemeToggle() {
  const themeToggle = document.getElementById('theme-toggle');
  const html = document.documentElement;
  
  // Make body visible
  document.body.classList.add('ready');
  
  if (!themeToggle) return;

  // Get current theme from localStorage or detect from system
  let currentTheme = localStorage.getItem('theme');
  if (!currentTheme) {
    // Auto-detect if system prefers dark mode
    currentTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }
  
  // Apply theme
  if (currentTheme === 'light') {
    html.classList.add('light-theme');
  } else {
    html.classList.remove('light-theme');
  }
  updateThemeIcon(currentTheme);

  // Toggle theme on click
  themeToggle.addEventListener('click', () => {
    const isLightTheme = html.classList.contains('light-theme');
    const newTheme = isLightTheme ? 'dark' : 'light';
    
    if (newTheme === 'light') {
      html.classList.add('light-theme');
    } else {
      html.classList.remove('light-theme');
    }
    
    localStorage.setItem('theme', newTheme);
    updateThemeIcon(newTheme);
  });
}

function updateThemeIcon(theme) {
  const sunIcon = document.querySelector('.icon-sun');
  const moonIcon = document.querySelector('.icon-moon');
  
  if (theme === 'dark') {
    sunIcon?.style.setProperty('display', 'none');
    moonIcon?.style.setProperty('display', 'block');
  } else {
    sunIcon?.style.setProperty('display', 'block');
    moonIcon?.style.setProperty('display', 'none');
  }
}

// Setup when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', setupThemeToggle);
} else {
  setupThemeToggle();
}
