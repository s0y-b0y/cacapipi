document.addEventListener('DOMContentLoaded', function() {
  initializeApp();
});

function initializeApp() {
  updateYear();
  setupLinkTracking();
  addLoadingStates();
  handleImageError();
  setupAccessibility();
}

function updateYear() {
  const yearElement = document.getElementById('year');
  if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
  }
}

function setupLinkTracking() {
  const links = document.querySelectorAll('.btn[data-link]');
  links.forEach(link => {
    link.addEventListener('click', function(e) {
      const linkName = this.getAttribute('data-link');
      trackLinkClick(linkName);
    });
  });
}

function trackLinkClick(linkName) {
  console.log(`Lien cliqué: ${linkName}`);
}

function addLoadingStates() {
  const externalLinks = document.querySelectorAll('a[target="_blank"]');
  externalLinks.forEach(link => {
    link.addEventListener('click', function() {
      this.style.opacity = '0.7';
      setTimeout(() => {
        this.style.opacity = '1';
      }, 300);
    });
  });
}

function handleImageError() {
  const avatarImg = document.querySelector('.avatar img');
  if (avatarImg) {
    avatarImg.addEventListener('error', function() {
      const avatar = this.parentElement;
      const name = document.querySelector('.name').textContent;
      const initials = getInitials(name);
      avatar.innerHTML = initials;
      avatar.style.fontSize = '26px';
      console.warn('Image de profil non trouvée, affichage des initiales');
    });
  }
}

function getInitials(name) {
  if (!name) return 'SV';
  const parts = name.trim().split(' ');
  if (parts.length >= 2) {
    return (parts[0][0] + parts[1][0]).toUpperCase();
  }
  return name.substring(0, 2).toUpperCase();
}

function setupAccessibility() {
  const links = document.querySelectorAll('.btn');
  links.forEach(link => {
    const label = link.querySelector('.label');
    if (label && !link.hasAttribute('aria-label')) {
      link.setAttribute('aria-label', label.textContent);
    }
  });
}