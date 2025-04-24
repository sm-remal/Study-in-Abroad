// Set up event listeners
document.addEventListener('DOMContentLoaded', function() {
    // Filter checkboxes
    document.querySelectorAll('.filter-option input[type="checkbox"]').forEach(checkbox => {
      checkbox.addEventListener('change', filterSubjects);
    });
    
    // Reset button
    document.querySelector('.filter-reset').addEventListener('click', resetFilters);
    
    document.getElementById('searchInput').addEventListener('keyup', searchPrograms);
    
    // View buttons (using event delegation)
    document.getElementById('subjectsGrid').addEventListener('click', function(e) {
      if (e.target.classList.contains('view-btn')) {
        const card = e.target.closest('.card');
        const title = card.querySelector('h3').textContent;
        showNotification(`${title} programs selected`);
      }
    });
  });
  
  // Filter programs by category
  function filterSubjects() {
    const checkboxes = document.querySelectorAll('.filter-option input[type="checkbox"]');
    const selectedCategories = [];
    
    checkboxes.forEach(checkbox => {
      if (checkbox.checked) {
        selectedCategories.push(checkbox.value);
      }
    });
    
    const cards = document.querySelectorAll(".card");
    let visibleCards = 0;
    
    cards.forEach(card => {
      if (selectedCategories.length === 0 || selectedCategories.includes(card.dataset.category)) {
        card.style.display = "flex";
        visibleCards++;
        card.style.animation = "cardEntry 0.6s forwards";
      } else {
        card.style.display = "none";
      }
    });
    
    showNoResultsMessage(visibleCards === 0);
  }
  
  // Search programs by keyword
  function searchPrograms() {
    const searchTerm = document.getElementById("searchInput").value.toLowerCase();
    const cards = document.querySelectorAll(".card");
    let visibleCards = 0;
    
    cards.forEach(card => {
      const searchData = card.dataset.search.toLowerCase();
      if (searchTerm === "" || searchData.includes(searchTerm)) {
        card.style.display = "flex";
        visibleCards++;
        // Add animation for appearing cards
        card.style.animation = "cardEntry 0.6s forwards";
      } else {
        card.style.display = "none";
      }
    });
    
    showNoResultsMessage(visibleCards === 0);
  }
  
  // Reset all filters
  function resetFilters() {
    document.querySelectorAll('.filter-option input[type="checkbox"]').forEach(checkbox => {
      checkbox.checked = false;
    });
    
    document.getElementById("searchInput").value = "";
    
    // Show all cards with animation
    document.querySelectorAll(".card").forEach((card, index) => {
      card.style.display = "flex";
      card.style.animation = `cardEntry 0.6s forwards ${index * 0.1}s`;
    });
    
    showNoResultsMessage(false);
  }
  
  function showNoResultsMessage(show) {
    const noResults = document.querySelector(".no-results");
    const grid = document.getElementById("subjectsGrid");
    
    if (show) {
      if (!noResults) {
        const message = document.createElement("div");
        message.className = "no-results";
        message.innerHTML = '<i class="far fa-frown"></i><h3>No programs found</h3><p>Try different search terms or filters</p>';
        grid.appendChild(message);
      }
    } else if (noResults) {
      noResults.remove();
    }
  }
  
  function showNotification(message) {
    const notification = document.getElementById("notification");
    notification.textContent = message;
    notification.classList.add("show");
     
    setTimeout(() => {
      notification.classList.remove("show");
    }, 3000);
  }