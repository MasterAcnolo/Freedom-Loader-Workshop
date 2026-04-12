/**
 * Browse Page - Load and display themes from themes.json
 */

let themesLoaded = false;

async function loadThemes() {
  if (themesLoaded) return; // Éviter les fetches multiples
  
  try {
    const response = await fetch('./themes/themes.json');
    if (!response.ok) throw new Error('Failed to load themes');
    const themes = await response.json();
    themesLoaded = true;
    displayThemes(themes);
  } catch (error) {
    console.error('Error loading themes:', error);
    displayError('Failed to load themes. Please try again later.');
  }
}

function displayThemes(themes) {
  const grid = document.getElementById('themes-grid');
  grid.innerHTML = '';

  if (themes.length === 0) {
    grid.innerHTML = '<p class="no-themes">No themes available yet.</p>';
    return;
  }

  themes.forEach(theme => {
    const card = createThemeCard(theme);
    grid.appendChild(card);
  });
}

function createThemeCard(theme) {
  const card = document.createElement('div');
  card.className = 'theme-card';

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  card.innerHTML = `
    <div class="theme-card-image">
      <img src="${theme.preview}" alt="${theme.name}" onerror="this.src='/assets/fallback-theme.png'">
    </div>
    <div class="theme-card-content">
      <h3 class="theme-card-name">${escapeHtml(theme.name)}</h3>
      <p class="theme-card-creator">by ${escapeHtml(theme.creator)}</p>
      <p class="theme-card-description">${escapeHtml(theme.description)}</p>
      
      <div class="theme-card-dates">
        <div class="date-item">
          <span class="date-label">Published</span>
          <span class="date-value">${formatDate(theme.dateCreated)}</span>
        </div>
        <div class="date-item">
          <span class="date-label">Updated</span>
          <span class="date-value">${formatDate(theme.dateModified)}</span>
        </div>
      </div>

      <button class="btn btn-primary theme-download-btn" onclick="downloadTheme('${escapeHtml(theme.file)}', '${escapeHtml(theme.name)}')">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
          <polyline points="7 10 12 15 17 10"/>
          <line x1="12" y1="15" x2="12" y2="3"/>
        </svg>
        Download
      </button>
    </div>
  `;

  return card;
}

function downloadTheme(fileUrl, themeName) {
  const link = document.createElement('a');
  link.href = fileUrl;
  link.download = `${themeName.replace(/\s+/g, '-').toLowerCase()}.zip`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

function escapeHtml(text) {
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}

function displayError(message) {
  const grid = document.getElementById('themes-grid');
  grid.innerHTML = `<p class="error-message">${escapeHtml(message)}</p>`;
}

function filterThemes(searchTerm) {
  const cards = document.querySelectorAll('.theme-card');
  const lowerSearch = searchTerm.toLowerCase();
  
  let visibleCount = 0;
  
  cards.forEach(card => {
    const themeName = card.querySelector('.theme-card-name')?.textContent || '';
    const themeCreator = card.querySelector('.theme-card-creator')?.textContent || '';
    const themeDescription = card.querySelector('.theme-card-description')?.textContent || '';
    
    const matches = 
      themeName.toLowerCase().includes(lowerSearch) ||
      themeCreator.toLowerCase().includes(lowerSearch) ||
      themeDescription.toLowerCase().includes(lowerSearch);
    
    if (matches) {
      card.classList.remove('hidden');
      visibleCount++;
    } else {
      card.classList.add('hidden');
    }
  });
  
  // Show "no results" message if needed
  const grid = document.getElementById('themes-grid');
  let noResultsMsg = grid.querySelector('.no-search-results');
  
  if (visibleCount === 0 && searchTerm.length > 0) {
    if (!noResultsMsg) {
      noResultsMsg = document.createElement('p');
      noResultsMsg.className = 'no-search-results error-message';
      noResultsMsg.textContent = 'No themes match your search.';
      grid.appendChild(noResultsMsg);
    }
  } else if (noResultsMsg) {
    noResultsMsg.remove();
  }
}

// Load themes when page is ready
document.addEventListener('DOMContentLoaded', () => {
  loadThemes();
  
  // Setup search functionality
  const searchInput = document.getElementById('search-input');
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      filterThemes(e.target.value);
    });
  }
});
