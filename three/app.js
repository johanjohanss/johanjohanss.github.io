

let container;
let camera;
let renderer;
let scene;
var model, model2;
var composer;

function init(){

    container = document.querySelector(".scene");
    scene = new THREE.Scene();

    const fov = 35;
    const aspect = container.clientWidth / container.clientHeight;
    const near = 0.1;
    const far = 5000;

    camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
    camera.position.set(0, 0, 7); //SKULL: 7 //ROSE: 1, 1.2, 63.4 //White Skull: 7.2

    const ambient = new THREE.AmbientLight(0x6085ff, 5.6); //White skull: 5
    scene.add(ambient);

    const color = 0x7874bb;
    const intensity = 15; //White skull: 7
    const light = new THREE.DirectionalLight(color, intensity);
    light.position.set(0, 8, 0);
    light.target.position.set(-5, 0, 0);
    scene.add(light);
    scene.add(light.target);

    var rectLight = new THREE.RectAreaLight( 0x7874bb, 15,  5, 1 );
    rectLight.position.set( 3, 4, 0 );
    rectLight.lookAt( 0, 0, 7 );
    scene.add( rectLight )

    //renderer
    renderer = new THREE.WebGLRenderer({antialias:true, alpha:true});
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(window.devicePixelRatio);

    /*
    //COMPOSER
    composer = new THREE.EffectComposer(renderer);

    //PASSES
    var renderPass = new THREE.RenderPass(scene, camera);
    composer.addPass(renderPass);
    renderPass.renderToScreen = true;
    */

    container.appendChild(renderer.domElement);


    let loader = new THREE.GLTFLoader();
    loader.load("./3d/scene.gltf", function(gltf){
        scene.add(gltf.scene);
        renderer.render(scene, camera);
        model = gltf.scene.children[0];
        animate();
    });

}

function mouseRotate(){
    
//304.8 Was origninal start rotation

    if(event.pageX > container.clientWidth/2){
        //console.log("Higher");
        model.rotation.z = 304.8 + ((0.4 / (container.clientWidth/2)) * (event.pageX - (container.clientWidth/2)));
        //console.log(model.rotation.z);
    }

    //smaller
    if(event.pageX < container.clientWidth/2){
        model.rotation.z = 304.8 + ((0.4 / (container.clientWidth/2)) * (event.pageX - (container.clientWidth/2)));
        //console.log(model.rotation.z);
    }

    if(event.pageY > container.clientHeight/2){
        model.rotation.x = 1.85 + ((0.2 / (container.clientHeight/2)) * (event.pageY - (container.clientHeight/2)));
    }

    if(event.pageY < container.clientHeight/2){
        model.rotation.x = 1.85 + ((0.2 / (container.clientHeight/2)) * (event.pageY - (container.clientHeight/2)));
    }


    model.rotation.y = 600;
}

function animate(){
    //composer.render();
    requestAnimationFrame(animate);
    

    renderer.render(scene, camera);
    
}

function onWindowResize(){
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}

window.addEventListener("mousemove", mouseRotate);
window.addEventListener("resize", onWindowResize, false);

init();