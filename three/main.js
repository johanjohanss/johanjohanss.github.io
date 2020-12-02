"use strict";

let scene, camera, renderer, cube, cube2;

function init(){
    scene = new THREE.Scene();
    scene.background = new THREE.Color( 0xffffff );

    camera = new THREE.PerspectiveCamera(75,
        window.innerWidth / window.innerHeight,
        0.1,
        1000
    );

    renderer = new THREE.WebGLRenderer( {antialias:true , alpha:true} );
    renderer.setClearColor(0xffffff, 0);

    renderer.setSize(window.innerWidth, window.innerHeight);

    document.body.appendChild(renderer.domElement);

    var geometry = new THREE.BoxGeometry();
    //var material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
    var texture = new THREE.TextureLoader().load("textures/black-sand.jpg");
    var texture2 = new THREE.TextureLoader().load("textures/sand.jpg");

    var material = new THREE.MeshBasicMaterial( { map: texture } );
    var material2 = new THREE.MeshBasicMaterial( { map: texture2 } );

    cube = new THREE.Mesh( geometry, material );
    cube2 = new THREE.Mesh( geometry, material2 );
    scene.add( cube );
    //scene.add( cube2 );
    cube.position.set(0, 0, 0);
    //cube2.position.set(0.75, 0, 0);

    camera.position.z = 5;

}

function animate(){
    requestAnimationFrame(animate);

    //cube.rotation.x += 0.005;
    //cube.rotation.y += 0.005;
    //cube2.rotation.x += 0.004;
    //cube2.rotation.y += 0.006;

    renderer.render(scene, camera);
}

function onWindowResize(){
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}

function mouseRotate(){
    cube.rotation.y = event.pageX / 700;
    cube.rotation.x = event.pageY / 500;
}

window.addEventListener("resize", onWindowResize, false);

window.addEventListener("mousemove", mouseRotate);

init();
animate();



