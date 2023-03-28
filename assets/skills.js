$(document).ready(function() {
  // Initialize tooltips
  $('[data-toggle="tooltip"]').tooltip({
    template: '<div class="tooltip custom-tooltip" role="tooltip"><div class="arrow"></div><div class="tooltip-inner"></div></div>'
  });

  // Initialize circular progress bars using Circles
  {% for skill in site.data.settings.skills %}
  Circles.create({
    id: 'circle-{{ forloop.index }}',
    radius: 60,
    value: {{ skill.value }},
    maxValue: 100,
    width: 10,
    text: function(value) { return value + '%'; },
    colors: ['#eee', '{{ skill.color }}'],
    duration: 400,
  });
  {% endfor %}
});
