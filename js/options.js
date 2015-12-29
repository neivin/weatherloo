// options.js
// // Saves options to chrome.storage.sync.
function save_options() {
  var unit_opt = $('input[name="units"]:checked').val();
  var city_opt = document.getElementById('city').value;
  var country_opt = document.getElementById('country').value;
  chrome.storage.sync.set({
    temp_unit: unit_opt,
    city: city_opt,
    country: country_opt
  }, function() {
    // Update status to let user know options were saved.
    var status = document.getElementById('status');
    status.textContent = 'Preferences saved successfully.';
    setTimeout(function() {
      status.textContent = '';
    }, 1000);
  });
}

// Restores select box and checkbox state using the preferences
// stored in chrome.storage.
function restore_options() {
  // Use default value color = 'red' and likesColor = true.
  chrome.storage.sync.get({
    temp_unit: 'c',
    city: 'Guelph',
    country: 'CA'
  }, function(items) {
    $('input[type="radio"][value="'+items.temp_unit+'"]').prop('checked',true);
    document.getElementById('city').value = items.city;
    document.getElementById('country').value = items.country;
  });
}
document.addEventListener('DOMContentLoaded', restore_options);
document.getElementById('save').addEventListener('click',
save_options);
