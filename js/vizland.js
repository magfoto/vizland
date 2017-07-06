/*
VIZLAND
Meteor Cloud visualization concept

The meteor cloud scales in height, width, and the clustering of shapes defined within the height x width 2D space.  The measurement is calculated as though it is volumetric, and provides different readings based on the measured view.  Encapsulated in an invisible cube, the measured view exports the perspective units of the view.  The last unit that defines this visualization is called the "truth factor" and is a boolean value of true or false.  The default value is true and the measured view is neglected for a 3D volumetric space calculation instead, using the WebGL perspective camera.  The end results show scaling of the HSL colour of the shapes within the space, and the overall percentage/ratio of shape density to volumetric space.

This is the described concept.  This code is an experiment to sketch its appearance and in no way represents the logic of the visualization.....yet.

*/


var camera, scene, renderer, scene2, renderer2, controls;

init();
animate();

function init() {

  camera = new THREE.PerspectiveCamera( 5, window.innerWidth / window.innerHeight, 50, 1000 );
  camera.position.set( 200, 200, 200 );

  scene = new THREE.Scene();
  scene2 = new THREE.Scene();

  var material = new THREE.MeshBasicMaterial( { color: 0x000000, wireframe: true, wireframeLinewidth: 1, side: THREE.DoubleSide } );

  //

  for ( var i = 0; i < 60; i ++ ) {

    var element = document.createElement( 'div' );
    element.style.width = '100px';
    element.style.height = '100px';
    element.style.opacity = 0.5;
    element.id = 'viz' + i;
    element.className = 'element';
    element.style.background = new THREE.Color( Math.random() * 0x888888 ).getStyle();

    var imgv = new Image();
    imgv.src = 'svg/' + datav[i];
    imgv.alt = 'alt';
    imgv.id = 'image' + i;
    // element.appendChild(imgv);  // apply svg to each

    var object = new THREE.CSS3DObject( element );
    object.position.x = Math.random() * 200 - 150;
    object.position.y = Math.random() * 200 - 150;
    object.position.z = Math.random() * 200 - 150;
    object.rotation.x = Math.random();
    object.rotation.y = Math.random();
    object.rotation.z = Math.random();
    object.scale.x = Math.random() + 0.25;
    object.scale.y = Math.random() + 0.25;
    scene2.add( object );

  }

  //

  var canvas = document.getElementById('canvas');

  renderer = new THREE.WebGLRenderer({ alpha: true });
  renderer.setClearColor( 0xfefefe, 0 );
  renderer.setPixelRatio( window.devicePixelRatio );
  renderer.setSize( window.innerWidth, window.innerHeight );
  canvas.appendChild( renderer.domElement );

  renderer2 = new THREE.CSS3DRenderer();
  renderer2.setSize( window.innerWidth, window.innerHeight );
  renderer2.domElement.style.position = 'absolute';
  renderer2.domElement.style.background = 'transparent';
  renderer2.domElement.style.bottom = 0;
  renderer2.domElement.style.zIndex = 1;
  canvas.appendChild( renderer2.domElement );

  // Initializing TrackballControls "after" appendChild of domElement so that <input> tag remains enabled.
  controls = new THREE.TrackballControls( camera, renderer2.domElement );

}


function animate() {

  requestAnimationFrame( animate );

  controls.update();

  renderer.render( scene, camera );
  renderer2.render( scene2, camera );

}
