'use strict';
function supportsLocalStorage() {
  try {
  return 'LocalStorage' in window && window['localStorage'] !== null
  } catch(e) {
    return false;
  }
}

function getRecentSearches() {
  const searches = localStorage.getItem('recentSearches');
  if (searches) {
    return JSON.parse(searches);
  } else {
    return [];
  }
}

function saveSearchString(str) {
  const searches = getRecentSearches();
  if (!str || searches.indexOf(str) > -1) {
    return false;
  }
  searches.push(str);
  localStorage.setItem('recentSearches', JSON.stringify(searches));
  return true;
}

function removeSearches() {
  localStorage.removeItem('recentSearches');
}

// Create an li, given string contents, append to the supplied ul
function appendListItem(listElement, string) {
  const listItemElement = document.createElement('LI');
  listItemElement.innerHTML = string;
  listElement.appendChild(listItemElement);
}

// Empty the contents of an element (ul)
function clearList(listElement) {
  listElement.innerHTML = '';
}

window.onload = function() {
  if (supportsLocalStorage) {
    const searchForm = document.getElementById('searchForm');
    const searchBar = document.getElementById('searchBar');
    const recentSearchList = document.getElementById('recentSearchList');
    const clearButton = document.getElementById('clearStorage');
  
    // Initialize display list
    const recentSearches = getRecentSearches();
    recentSearches.forEach(function(searchString) {
      appendListItem(recentSearchList,searchString);
    });
  
    // Set event handlers
    searchForm.addEventListener('submit', function(event) {
      const searchString = searchBar.value;
      if (saveSearchString(searchString)) {
        appendListItem(recentSearchList, searchString);
      }
    });
  
    clearButton.addEventListener('click', function(event) {
      removeSearches();
      clearList(recentSearchList);
    });
  }
};