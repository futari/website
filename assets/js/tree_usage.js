$('document').ready(function() {
  var $tree = {
    color: '#69D2E7', value: '1', 
    img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQiS-pxOZUMcgqZ1fs5uyXUeEWY4Q6OLWJiE1F5H45_MAq1o9Veng',
    children: [
      {
        color: '#E0E4CC', value: '2', 
        img: 'http://pokewalls.files.wordpress.com/2011/01/468togekiss1600x1200.jpg', children: []
      },
      {
        color: '#A7DBD8', value: '3', img: null, children: [
          {
            color: '#69D2E7', value: '4', img: null, children: []
          },
          {
            color: '#FA6900', value: '5', img: null, children: [
              {
                color: '#E0E4CC', value: '5', img: null, children: []
              },
              {
                color: '#F38630', value: '5', img: null, children: []
              }
            ]
          },
          {
            color: '#E0E4CC', value: '5', img: null, children: []
          }
        ]
      },
      {
        color: '#F38630', value: '6', 
        img: 'http://fc06.deviantart.net/fs71/f/2011/133/7/f/togekiss__air_slash_by_yamatotaichou-d3g8dyt.jpg', children: []
      },
      {
        color: '#FA6900', value: '7', 
        img: 'http://i436.photobucket.com/albums/qq85/Moxai/Pokemon/Card%20Photos/Togekiss.png', children: []
      },
      {
        color: '#69D2E7', value: '8', 
        img: 'http://th04.deviantart.net/fs71/PRE/f/2013/188/4/3/togekiss_humanform_by_luckyshiney-d6ce3xq.png', children: []
      },
      {
        color: '#FA6900', value: '9', img: null, children: []
      },
      {
        color: '#F38630', value: '10', img: null, children: []
      },
      {
        color: '#69D2E7', value: '11', img: null, children: []
      },
      {
        color: '#E0E4CC', value: '12', img: null, children: []
      },
      {
        color: '#FA6900', value: '13', img: null, children: []
      }
    ]
  };

  $('.tree').tree_circle({tree: $tree, radius: 60});
});