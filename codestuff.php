<script type="text/javascript" src="./assets/js/tree_usage.js"></script>

<div>
  <div class="intro">
    <span class="large">I</span>
    <span>
      am first and foremost an aspiring developer. <br/>
      This section is for random programming experiments - this is my playground after all.<br/>
    </span>
  </div>
  <div id="project-content">
      <!-- Tree project -->
        <div id="tree_project" class="project">
          <div class="large">Round Tree</div> 
          <div class="left">
            For my first jQuery widget project, I wanted to see if I can make some circular data representation method. 
            I wanted to try representing a tree in weird, possibly fun ways. This is essentially what came of it. 
            The tree data itself is a Javascript object. The widget is called on an empty div with the class 'tree' and 
            the tree is passed in to create this. I'm still deciding what I want to do with this and it certainly needs
            some polishing - it only displays up to grandchildren nodes of the root node, some maths are needed
            to be done to fix the text inside the children nodes from rotating, the created product does not fit neatly
            into its container and I still haven't decided how I'm going to add functionality to each node on clicking yet.
            But here it is.
          </div>
          <div class="tree">
          </div>
        </div>
      <!-- Geometry Game -->
        <div id="geometry-game-container" class="project">
          <div class="large">Geometry Game</div>
          <div class="left">
            This is an Android game made with the libGDX framework. I followed some tutorials on <a href="http://www.kilobolt.com/">kilobolt.com</a>
            and made this top-down shooter game. It is based off a game called <a href="https://www.youtube.com/watch?v=EGNSdcy-apU">Ikaruga</a>, where
            your character can switch between two colors and absorb same-color projectiles. Making mobile-friendly controls was a weird experience - the
            joystick maths took longer than it should have and all of the on-screen sprites are just bounding circles - the only sprite implementation
            is for the shoot and switch buttons. Some sound effects were added to try out the sound library. I'm proud to say this can be installed on
            one's mobile device via the <a href="./assets/Geometry-android.apk">APK file here</a>. I'd have worked on this more but this was primarily an
            exercise to see how libGDX and Android development works. Alas, there are a few other game ideas that I want to work on. For those who want
            to look at the source code and / or download it, it's up on my <a href="https://github.com/futari/geometry_game">Github!</a>
          </div>
          <div class="right">
            <img src="./assets/imgs/geometry.png" style="height: 50%;"/>
          </div>
        </div>
      <!-- End Content -->
    </div>
  </div>
</div>