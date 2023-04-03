$(document).ready(function() {
  // Initialize tooltips
  $('[data-toggle="tooltip"]').each(function() {
    var tooltipContent = $(this).attr('title');
    $(this).tooltip({
      template: '<div class="tooltip custom-tooltip" role="tooltip"><div class="arrow"></div><div class="tooltip-inner">' + tooltipContent + '</div></div>'
    });
  });
});
