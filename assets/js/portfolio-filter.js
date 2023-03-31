document.addEventListener('DOMContentLoaded', function () {
  var shuffleWrapper = document.querySelector('.shuffle-wrapper');
  if (!shuffleWrapper) return;

  var shuffleInstance = new Shuffle(shuffleWrapper, {
    itemSelector: '.shuffle-item',
    sizer: null,
  });

  var filterButtons = document.querySelectorAll('input[name="shuffle-filter"]');

  filterButtons.forEach(function (button) {
    button.addEventListener('change', function (event) {
      var inputValue = event.target.value;
      if (inputValue === 'all') {
        shuffleInstance.filter(Shuffle.ALL_ITEMS);
      } else {
        shuffleInstance.filter(function (element) {
          var groups = JSON.parse(element.getAttribute('data-groups'));
          return groups.includes(inputValue);
        });
      }
    });
  });
});
