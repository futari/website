var gameInit = function() {
// http://www.mariouniverse.com/sprites/snes/smw
    
  var player = {
    x: 0,
    y: 200,
    vx: 0,
    vy: 0,
    sprite: new Image(),
    state: {},
    jumping: false,
    moveLeft: false,
    moveRight: false,
    faceRight: true,
    walking: false,
    freeze: false,
    idle: {
      left: {x: 199, y: 116, w: 15, h: 30},
      right: {x: 234, y: 116, w: 15, h: 30}
    },
    jump: {
      left: {x: 198, y: 116, w: 16, h: 29},
      right: {x: 234, y: 156, w: 16, h: 29}
    },
    fall: {
      left: {x: 169, y: 116, w: 16, h: 28},
      right: {x: 264, y: 157, w: 16, h: 28}
    },
    walk: {
      left: {x: 169, y: 116, w: 16, h: 30},
      right: {x: 264, y: 116, w: 16, h: 30}
    },
    animWalk: {
      timer: 0,
      frame: 0,
      left: [{x: 199, y: 116, w: 15, h: 30},{x: 169, y: 116, w: 16, h: 30}, {x: 139, y: 116, w: 16, h: 29}],
      right: [{x: 234, y: 116, w: 15, h: 30}, {x: 264, y: 116, w: 16, h: 30}, {x: 294, y: 116, w: 16, h: 29}]
    }
  }
  
  var $canvas = $('#game');
  $('body').focus();
  var ctx = document.getElementById("game").getContext("2d");
  
  $canvas.attr('width', 900);
  $canvas.attr('height', 400);
  
  var w = parseInt($canvas.attr('width'));
  var h = parseInt($canvas.attr('height'));
  var scaleY = 2, scaleX = 2;
  
  var groundY = h - 24;
  var blockY = groundY - 75;
  var playerHeight = 30;
  var gravity = 0.98;
  
  player.sprite.src = "./assets/imgs/luigi.png";
  player.state = player.fall;
  
  var background = new Image();
  background.src = "./assets/imgs/background-objects.gif";
  
  var blocks = [
    {
      x: 100, y: blockY, w: 16, h: 16, vy: 0,
      job: {
        loc: 'Burnaby, BC',
        year: '2013',
        company: 'Spraybuilt',
        position: 'Developer (Contractor)',
        duties: [
        "Increased community involvement by implementing on Wordpress.",
        "Implemented design and features to increase product usability.",
        "Improved marketing team's productivity by implementing new features.",
        "Worked on quality assurance through writing automation tests in Selenium.",
        "Used Pivotal and Github to manage product features, code reviews and product backlogs in an organized manner."
        ]
      }
    },
    {
      x: 200, y: blockY, w: 16, h: 16, vy: 0,
      job: {
        loc: 'Victoria, BC',
        year: '2013',
        company: 'IBM',
        position: 'Engineering Intern',
        duties: [
        "Increased community involvement by implementing on Wordpress.",
        "Implemented design and features to increase product usability.",
        "Improved marketing team's productivity by implementing new features.",
        "Worked on quality assurance through writing automation tests in Selenium.",
        "Used Pivotal and Github to manage product features, code reviews and product backlogs in an organized manner."
        ]
      }
    },
    {
      x: 400, y: blockY, w: 16, h: 16, vy: 0,
      job: {
        loc: 'San Francisco, CA',
        year: '2012',
        company: 'PlayHaven',
        position: 'Engineering Intern',
        duties: [
        "Increased community involvement by implementing on Wordpress.",
        "Implemented design and features to increase product usability.",
        "Improved marketing team's productivity by implementing new features.",
        "Worked on quality assurance through writing automation tests in Selenium.",
        "Used Pivotal and Github to manage product features, code reviews and product backlogs in an organized manner."
        ]
      }
    },
    {
      x: 800, y: blockY, w: 16, h: 16, vy: 0,
      job: {
        loc: 'Vancouver, BC',
        year: '2011',
        company: 'HireTheWorld',
        position: 'Junior Developer',
        duties: [
        "Increased community involvement by implementing on Wordpress.",
        "Implemented design and features to increase product usability.",
        "Improved marketing team's productivity by implementing new features.",
        "Worked on quality assurance through writing automation tests in Selenium.",
        "Used Pivotal and Github to manage product features, code reviews and product backlogs in an organized manner."
        ]
      }
    }
  ];
  
  ctx.webkitImageSmoothingEnabled = false;
  ctx.mozImageSmoothingEnabled = false;
  ctx.imageSmoothingEnabled = false;
  ctx.scale(scaleX, scaleY);
  
  var drawGrass = function(x, y) {
    ctx.drawImage(background, 214, 482, 68, 9, x, y, 68, 9);
    ctx.drawImage(background, 214, 492, 68, 15, x, y+9, 68, 15);
  }
  
  $('body').keydown(function(event) {
    switch(event.keyCode) {
      case 37:
      case 65: // a
        if (!player.freeze && !player.moveRight && !player.moveLeft) {
          player.moveLeft = true;
          if (!player.jumping)
            player.faceRight = false;
            player.state = player.walk;
            player.animWalk.timer = 0;
            player.walking = true;
        }
      break;
      case 38:
      case 87: // w
        if (!player.freeze && !player.jumping) {
          player.state = player.jump;
          player.vy = -12;
          player.jumping = true;
        }
      break;
      case 39:
      case 68: // d
        if (!player.freeze && !player.moveRight && !player.moveLeft) {
          player.moveRight = true;
          if (!player.jumping)
            player.faceRight = true;
            player.state = player.walk;
            player.animWalk.timer = 0;
            player.walking = true;
        }
      break;
      default:
      break;
    }
  });
  
  $('body').keyup(function(event) {
    switch(event.keyCode) {
      case 37:
      case 65: // a
          player.moveLeft = false;
        break;
      case 39:
      case 68: // d
          player.moveRight = false;
        break;
      default:
      break;
    }
  });
  
  var popup = function(job) {
    var dialog = $('<div>').addClass('gameDialog');
    
    dialog.append($('<div>').addClass('subtext').html(job.loc + ', ' + job.year));
    dialog.append($('<div>').addClass('company').html(job.company));
    dialog.append($('<div>').addClass('position').html(job.position));
    var duties = $('<ul>').addClass('duties');
    
    $.each(job.duties, function(i, d) {
      duties.append( $('<li>').html(d) );
    });
    
    dialog.append(duties);
    dialog.append($('<div>').addClass('footnote').html("Press any key to continue..."));
    
    $canvas.parent().append(dialog);
    
    dialog.fadeIn();
    
    $('body').keydown(function() {
      dialog.fadeOut(function() {
        $canvas.parent().remove('.gameDialog');
      });
      player.freeze = false;
      
    });
  }
  
  var update = function(dt) {
    ctx.canvas.width = ctx.canvas.width;
    
    var x = 0, width = 68;
    while (x < w) {
      drawGrass(x, groundY);
      x += width;
    }
    
    $.each(blocks, function(i, block) {
      block.vy += gravity * dt;
      block.y += block.vy;
      if (block.y > blockY) {
        block.y = blockY;
        block.vy = 0;
      }
      
      ctx.drawImage(background, 492, 555, block.w, block.h, block.x, block.y, block.w, block.h);
    });
    
    if (!player.freeze) {
      updatePlayer(dt);
    }
    drawPlayer();
  }
  
  var updatePlayer = function(dt) {
    if (player.moveRight) {
      player.vx++;
      if (player.vx > 2)  player.vx = 2;
    }
    if (player.moveLeft) {
      player.vx--;
      if (player.vx < -2)  player.vx = -2;
    }
    
    player.x += player.vx * dt;
    if (player.y + player.state.left.h < groundY && player.vy >= 0)
      player.state = player.fall;
    else
      player.state = player.idle;
  
    if (player.y + player.state.left.h < groundY) {
      player.vy += gravity * dt;
    }
    player.y += player.vy * dt;
    if (player.y + player.state.left.h >= groundY) {
      player.y = groundY - player.state.left.h;
      player.vy = 0;
      player.jumping = false;
    }

    if (!player.jumping && !player.moveRight && !player.moveLeft) {
      player.vx = 0;
      player.state = player.idle;
      player.walking = false;
    }
    
    // collision detection
    var p = player.state.left;
    if (player.faceRight)
      p = player.state.right;
    
    if (player.x < 0) {
      player.x = 0;
    }
    if (player.x + p.w > w) {
      player.x = w - p.w;
    }
        
    $.each(blocks, function(i, b) {
      if (player.x + p.w >= b.x && player.x <= b.x + b.w) {
        // bottom collision
        if (player.y > b.y && player.y <= b.y + b.h) {
          player.y = b.y + b.h + 1;
          player.vy = 0;
          player.freeze = true;
          player.state = player.fall;
          b.vy -= 5;
          popup(b.job);
        }
        // top collision
        else if (player.y + p.h >= b.y && player.y + p.h <= b.y + b.h) {
          player.y = b.y - p.h;
          player.vy = 0;
          player.jumping = false;
          player.state = player.idle;
        }
      }
    });
  }
  
  var drawPlayer = function() {
    var p = player.state.left;
    if (player.faceRight)
      p = player.state.right;

    if (player.walking && !player.jumping && !player.freeze) {
      player.animWalk.timer++;
      if (player.animWalk.timer % 5 == 0) {
        player.animWalk.frame = (player.animWalk.frame + 1) % 2;
      }
      p = player.animWalk.left[player.animWalk.frame];
      if (player.faceRight)
        p = player.animWalk.right[player.animWalk.frame];
    }
    
    ctx.drawImage(player.sprite, p.x, p.y, p.w, p.h, player.x, player.y, p.w, p.h);
  }
  
  setInterval(function() {
    update(2);
  }, 1000/24); // 24 fps
  
};