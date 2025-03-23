// Cookie Management Class
class CookieManager {
  constructor() {
      this.cookieConsent = document.getElementById('cookie-consent');
      this.modal = document.getElementById('cookie-settings-modal');
      this.necessaryCookies = document.getElementById('necessary-cookies');
      this.analyticsCookies = document.getElementById('analytics-cookies');
      this.marketingCookies = document.getElementById('marketing-cookies');
      
      this.initializeEventListeners();
      this.checkCookieConsent();
      this.setupKeyboardNavigation();
  }

  initializeEventListeners() {
      // Accept All button
      document.getElementById('accept-all').addEventListener('click', () => {
          this.acceptAllCookies();
      });

      // Reject All button
      document.getElementById('reject-all').addEventListener('click', () => {
          this.rejectAllCookies();
      });

      // Cookie Settings button
      document.getElementById('cookie-settings').addEventListener('click', (e) => {
          e.preventDefault();
          this.openModal();
      });

      // Close modal button
      document.querySelector('.close').addEventListener('click', () => {
          this.closeModal();
      });

      // Save preferences button
      document.getElementById('save-preferences').addEventListener('click', () => {
          this.savePreferences();
      });

      // Close modal when clicking outside
      window.addEventListener('click', (e) => {
          if (e.target === this.modal) {
              this.closeModal();
          }
      });

      // Handle form submission
      document.addEventListener('submit', (e) => {
          e.preventDefault();
          this.savePreferences();
      });
  }

  setupKeyboardNavigation() {
      // Trap focus within modal when open
      this.modal.addEventListener('keydown', (e) => {
          if (e.key === 'Tab') {
              const focusableElements = this.modal.querySelectorAll(
                  'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
              );
              const firstFocusable = focusableElements[0];
              const lastFocusable = focusableElements[focusableElements.length - 1];
              const activeElement = document.activeElement;

              if (e.shiftKey) {
                  if (activeElement === firstFocusable) {
                      e.preventDefault();
                      lastFocusable.focus();
                  }
              } else {
                  if (activeElement === lastFocusable) {
                      e.preventDefault();
                      firstFocusable.focus();
                  }
              }
          }
          if (e.key === 'Escape') {
              this.closeModal();
          }
      });
  }

  checkCookieConsent() {
      const consent = this.getCookie('cookie_consent');
      if (!consent) {
          this.showBanner();
      } else {
          this.initializeCookies();
      }
  }

  showBanner() {
      this.cookieConsent.style.display = 'block';
      // Set focus to the banner
      this.cookieConsent.focus();
  }

  hideBanner() {
      this.cookieConsent.style.display = 'none';
  }

  openModal() {
      this.modal.style.display = 'block';
      // Load current preferences
      const preferences = this.getCookiePreferences();
      this.analyticsCookies.checked = preferences.analytics;
      this.marketingCookies.checked = preferences.marketing;
      
      // Set focus to the first focusable element in the modal
      const firstFocusable = this.modal.querySelector(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );
      if (firstFocusable) {
          firstFocusable.focus();
      }
  }

  closeModal() {
      this.modal.style.display = 'none';
      // Return focus to the settings button
      document.getElementById('cookie-settings').focus();
  }

  acceptAllCookies() {
      this.setCookie('cookie_consent', 'all', 365);
      this.setCookiePreferences({
          necessary: true,
          analytics: true,
          marketing: true
      });
      this.hideBanner();
      this.initializeCookies();
  }

  rejectAllCookies() {
      this.setCookie('cookie_consent', 'necessary', 365);
      this.setCookiePreferences({
          necessary: true,
          analytics: false,
          marketing: false
      });
      this.hideBanner();
      this.initializeCookies();
  }

  savePreferences() {
      const preferences = {
          necessary: true,
          analytics: this.analyticsCookies.checked,
          marketing: this.marketingCookies.checked
      };

      this.setCookie('cookie_consent', 'custom', 365);
      this.setCookiePreferences(preferences);
      this.closeModal();
      this.hideBanner();
      this.initializeCookies();
  }

  setCookie(name, value, days) {
      const date = new Date();
      date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
      const expires = `expires=${date.toUTCString()}`;
      const secure = window.location.protocol === 'https:' ? 'secure;' : '';
      const sameSite = 'SameSite=Strict';
      document.cookie = `${name}=${value};${expires};path=/;${secure}${sameSite}`;
  }

  getCookie(name) {
      const cookieName = `${name}=`;
      const cookies = document.cookie.split(';');
      for (let cookie of cookies) {
          cookie = cookie.trim();
          if (cookie.indexOf(cookieName) === 0) {
              return cookie.substring(cookieName.length, cookie.length);
          }
      }
      return null;
  }

  setCookiePreferences(preferences) {
      // Store in both cookies and localStorage for redundancy
      this.setCookie('cookie_preferences', JSON.stringify(preferences), 365);
      localStorage.setItem('cookie_preferences', JSON.stringify(preferences));
  }

  getCookiePreferences() {
      // Try to get preferences from cookies first
      const cookiePrefs = this.getCookie('cookie_preferences');
      if (cookiePrefs) {
          return JSON.parse(cookiePrefs);
      }

      // Fallback to localStorage
      const localPrefs = localStorage.getItem('cookie_preferences');
      if (localPrefs) {
          return JSON.parse(localPrefs);
      }

      // Default preferences
      return {
          necessary: true,
          analytics: false,
          marketing: false
      };
  }

  initializeCookies() {
      const preferences = this.getCookiePreferences();
      
      // Initialize necessary cookies (always enabled)
      this.initializeNecessaryCookies();
      
      // Initialize analytics cookies if enabled
      if (preferences.analytics) {
          this.initializeAnalyticsCookies();
      }
      
      // Initialize marketing cookies if enabled
      if (preferences.marketing) {
          this.initializeMarketingCookies();
      }
  }

  initializeNecessaryCookies() {
      // Add your necessary cookies initialization here
      // For example, session management, language preferences, etc.
      console.log('Initializing necessary cookies');
  }

  initializeAnalyticsCookies() {
      // Add your analytics cookies initialization here
      // For example, Google Analytics, custom analytics, etc.
      console.log('Initializing analytics cookies');
  }

  initializeMarketingCookies() {
      // Add your marketing cookies initialization here
      // For example, advertising cookies, social media cookies, etc.
      console.log('Initializing marketing cookies');
  }
}

// Initialize cookie manager when the page loads
document.addEventListener('DOMContentLoaded', () => {
  new CookieManager();
}); 