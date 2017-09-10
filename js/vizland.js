/*
VIZLAND
Meteor Cloud visualization concept

The meteor cloud scales in height, width, and the clustering of shapes defined within the height x width 2D space.  The measurement is calculated as though it is volumetric, and provides different readings based on the measured view.  Encapsulated in an invisible cube, the measured view exports the perspective units of the view.  The last unit that defines this visualization is called the "truth factor" and is a boolean value of true or false.  The default value is true and the measured view is neglected for a 3D volumetric space calculation instead, using the WebGL perspective camera.  The end results show scaling of the HSL colour of the shapes within the space, and the overall percentage/ratio of shape density to volumetric space.

This is the described concept.  This code is an experiment to sketch its appearance and in no way represents the logic of the visualization.....yet.

*/


var camera, scene, renderer, scene2, renderer, controls;

init();
animate();

function init() {

  camera = new THREE.PerspectiveCamera( 5, window.innerWidth / window.innerHeight, 50, 1000 );
  camera.position.set( 200, 200, 200 );

  scene = new THREE.Scene();

  //

  for ( var i = 0; i < 60; i ++ ) {

    var element = document.createElement( 'div' );
    element.style.width = '100px';
    element.style.height = '100px';
    element.style.opacity = 0.5;
    element.id = 'viz' + i;
    element.className = 'element';
    element.style.background = new THREE.Color( Math.random() * 0xfefefe ).getStyle();

    // var imgv = new Image();
    // imgv.src = 'svg/' + datav[i];
    // imgv.alt = 'alt';
    // imgv.id = 'image' + i;
    //
    // element.style.backgroundImage = 'url(' + imgv.src + ')';
    // element.style.backgroundRepeat = 'no-repeat';
    // element.style.backgroundSize = 'cover';

    // element.appendChild(imgv);

    var object = new THREE.CSS3DObject( element );
    object.position.x = Math.random() * 200 - 150;
    object.position.y = Math.random() * 200 - 150;
    object.position.z = Math.random() * 200 - 150;
    object.rotation.x = Math.random();
    object.rotation.y = Math.random();
    object.rotation.z = Math.random();
    object.scale.x = Math.random() + 0.25;
    object.scale.y = Math.random() + 0.25;
    scene.add( object );

  }

  //

  var canvas = document.getElementById('canvas');

  renderer = new THREE.CSS3DRenderer();
  renderer.setSize( window.innerWidth, window.innerHeight );
  renderer.domElement.style.position = 'absolute';
  renderer.domElement.style.background = 'transparent';
  renderer.domElement.style.bottom = 0;
  renderer.domElement.style.zIndex = 1;
  canvas.appendChild( renderer.domElement );

  // Initializing TrackballControls "after" appendChild of domElement so that <input> tag remains enabled.
  controls = new THREE.TrackballControls( camera, renderer.domElement );

}

function save() {

  window.open( renderer.domElement.toDataURL('image/svg+xml'), 'vizland-snap' );
  return false;

}

function onDocumentMouseDown( event ) {

  event.preventDefault();

  mouse.x = ( event.clientX / renderer.domElement.width ) * 2 - 1;
  mouse.y = - ( event.clientY / renderer.domElement.height ) * 2 + 1;

  raycaster.setFromCamera( mouse, camera );

  var intersects = raycaster.intersectObjects( scene.children );

  if ( intersects.length > 0 ) {


    // new TWEEN.Tween( intersects[ 0 ].object.position ).to( {
    //   x: Math.random() * 800 - 400,
    //   y: Math.random() * 800 - 400,
    //   z: Math.random() * 800 - 400 }, 2000 )
    // .easing( TWEEN.Easing.Elastic.Out).start();
    //
    // new TWEEN.Tween( intersects[ 0 ].object.rotation ).to( {
    //   x: Math.random() * 2 * Math.PI,
    //   y: Math.random() * 2 * Math.PI,
    //   z: Math.random() * 2 * Math.PI }, 2000 )
    // .easing( TWEEN.Easing.Elastic.Out).start();

  }

  /*
  // Parse all the faces
  for ( var i in intersects ) {

    intersects[ i ].face.material[ 0 ].color.setHex( Math.random() * 0xffffff | 0x80000000 );

  }
  */
}

function animate() {

  requestAnimationFrame( animate );

  controls.update();

  renderer.render( scene, camera );

}
