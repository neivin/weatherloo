// options.js
// // Saves options to chrome.storage.sync.
function save_options() {
  var color = document.getElementById('color').value;
  var likesColor = document.getElementById('like').checked;
  var unit_opt = $('input[name="units"]:checked').val();
  var country_opt = document.getElementById('country').value;
  chrome.storage.sync.set({
    favoriteColor: color,
    likesColor: likesColor,
    units: unit_opt,
    country: country_opt
  }, function() {
    // Update status to let user know options were saved.
    var status = document.getElementById('status');
    status.textContent = 'Options saved.';
    setTimeout(function() {
      status.textContent = '';
    }, 750);
  });
}

// Restores select box and checkbox state using the preferences
// stored in chrome.storage.
function restore_options() {
  // Use default value color = 'red' and likesColor = true.
  chrome.storage.sync.get({
    favoriteColor: 'red',
    likesColor: true,
    units: 'c',
    country: 'CA'
  }, function(items) {
    document.getElementById('color').value = items.favoriteColor;
    document.getElementById('like').checked = items.likesColor;
    $('input[type="radio"][value="'+items.units+'"]').prop('checked',true);
    document.getElementById('country').value = items.country;
  });
}
document.addEventListener('DOMContentLoaded', restore_options);
document.getElementById('save').addEventListener('click',
    save_options);