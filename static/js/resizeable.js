/**
 * Delagics CA
 */

$(function() {
  var
    resizableEl = $('.resizable').not(':last-child'),
    columns = 12,
    fullWidth = resizableEl.parent().width(),
    columnWidth = fullWidth / columns,
    totalCol, // this is filled by start event handler
    updateClass = function(el, col) {
      el.css('width', ''); // remove width, our class already has it
      el.removeClass(function(index, className) {
        return (className.match(/(^|\s)col-\S+/g) || []).join(' ');
      }).addClass('col-sm-' + col);
    };
  // jQuery UI Resizable
  resizableEl.resizable({
    handles: 'e',
    start: function(event, ui) {
      var
        target = ui.element,
        next = target.next(),
        targetCol = Math.round(target.width() / columnWidth),
        nextCol = Math.round(next.width() / columnWidth);
      // set totalColumns globally
      totalCol = targetCol + nextCol;
      target.resizable('option', 'minWidth', columnWidth);
      target.resizable('option', 'maxWidth', ((totalCol - 1) * columnWidth));
    },
    resize: function(event, ui) {
      var
        target = ui.element,
        next = target.next(),
        targetColumnCount = Math.round(target.width() / columnWidth),
        nextColumnCount = Math.round(next.width() / columnWidth),
        targetSet = totalCol - nextColumnCount,
        nextSet = totalCol - targetColumnCount;

      // Just showing class names inside headings
      target.find('h3').text('col-sm-' + targetSet);
      next.find('h3').text('col-sm-' + nextSet);

      updateClass(target, targetSet);
      updateClass(next, nextSet);
    },
  });
});