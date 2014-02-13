$.widget('gmi.tree_circle', {

  $this: {},
  $canvas: {},
  root: {}, // root; does not change
  tree: {}, // changes every level
  options: {
    tree: {},
    radius: 130,
    animate: true,
    node_shape: 'circle',
    child_size: null,
    child_dist: null,
    child_rot_deg: null,
    child_fade_speed: 800,
    grandchild_size: null,
    grandchild_dist: null,
    grandchild_rot_deg: null,
    grandchild_fade_speed: 1600
  },
  
  _init: function() {
    $this = this;
    $canvas = $this.element;
    tree = $this.options.tree;
    root = $this.options.tree;
    $this._calc_specs();
    $this._setup(tree);
  },
  
  /* Centers the node and sets its shape */
  _setup: function(node) {
    var $content = $this._create_node($this.options.radius * 2);
    $this._set_node($content, node, $canvas);
    $content.addClass('root');
    $this._center($content);
    $content.fadeIn();
    $this._draw_children(node, $content.parent());
  },

  /* Handles the children nodes around the root */
  _draw_children: function(node, $parent) {  
    $.each(node['children'], function(i, child) {
      var $wrapper = $this._create_node(node.radius);
      var $child = $this._create_node($this.options.child_size);
      
      $this._set_node($child, child, $wrapper);
      $child.css('top', - $this.options.child_dist);
      $child.fadeIn($this.options.child_fade_speed);
      
      $parent.append($wrapper);
      $this._center($wrapper);
      $this._rotate($wrapper, i * $this.options.child_rot_deg);
      $this._rotate($child, - i * $this.options.child_rot_deg);
      
      /* Only display an indication that there are children */
      $.each(child['children'], function(j, grandchild) {
        var $grandwrapper = $this._create_node($this.options.child_size);
        var $grandchild = $this._create_node($this.options.grandchild_size);
        
        $this._set_node($grandchild, grandchild, $grandwrapper);
        $grandchild.css('top', - $this.options.grandchild_dist);
        $grandchild.css('background', grandchild.color).html('');
        $grandchild.fadeIn($this.options.grandchild_fade_speed);
        
        $child.append($grandwrapper);
        $this._center($grandwrapper);
        $this._rotate($grandwrapper, j * $this.options.grandchild_rot_deg);
      });
    });
  },
  
  _create_node: function(size) {
    return $('<div>').css('width', size).css('height', size);
  },
  
  /* Calculates and sets global variable 'center' to x,y */
  _center: function($node) {
    $node.css('top', $node.parent().width() / 2 - $node.width() / 2);
    $node.css('left', $node.parent().height() / 2 - $node.height() / 2);
  },
  
  _set_node: function($node, node, $parent) {
    if (node.color) $node.css('backgroundColor', node.color);
    if (node.img) $node.css('background', 'url(' + node.img + ')');
    if ($parent) $node.appendTo($parent);
    $overlay = $this._create_node($node.width()).addClass('overlay');
    $value = $this._create_node($node.width()).addClass('value');
    $value.css('line-height', $node.height() + 'px');
    $node.addClass('circle').append($overlay).append($value);
    if (node.value) $value.html(node.value);

    $overlay.hover(function() {
      $(this).animate({opacity: 0}, 400);
    }, function() {
      $(this).animate({opacity: 0.5}, 400);
    });
    
    $overlay.click(function() {
      // make some function here maybe?
    });
  },
  
  _rotate: function($node, deg) {
    $node.css('-moz-transform', 'rotate(' + deg + 'deg)');
    $node.css('-webkit-transform', 'rotate(' + deg + 'deg)');
    $node.css('-o-transform', 'rotate(' + deg + 'deg)');
    $node.css('-ms-transform', 'rotate(' + deg + 'deg)');
  },
  
  /* Some attempt at calculating optimal sizes and distances */
  _calc_specs: function() {
    if ($this.options.child_size == null) {
      var child_size = $this.options.radius * 7 / tree['children'].length;
      if (child_size > $this.options.radius * 1.3) child_size = $this.options.radius * 1.3;
      $this.options.child_size = child_size;
    }
    if ($this.options.child_dist == null) {
      if (tree['children'].length < 6) $this.options.child_dist = $this.options.child_size * 2;
      else $this.options.child_dist = $this.options.child_size * 3;
    }
    if ($this.options.child_rot_deg == null) {
      $this.options.child_rot_deg = 360 / tree['children'].length;
    }
    if ($this.options.grandchild_size == null) {
      var grandchild_size = $this.options.child_size / 3;
      if (grandchild_size > 20) grandchild_size = 20;
      $this.options.grandchild_size = grandchild_size;
    }
    if ($this.options.grandchild_dist == null) {
      $this.options.grandchild_dist = $this.options.grandchild_size;
    }
    if ($this.options.grandchild_rot_deg == null) {
      $this.options.grandchild_rot_deg = $this.options.grandchild_size * 1.2;
    }
  }
});