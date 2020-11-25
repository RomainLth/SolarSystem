import * as THREE from "https://threejs.org/build/three.module.js";
import { OrbitControls } from "https://threejs.org/examples/jsm/controls/OrbitControls.js";
let camera, scene, renderer, controls;

const fieldOfView = 75;
const aspect = window.innerWidth / window.innerHeight;
const nearClip = 0.1;
const farClip = 20000;

var mercury, venus, earth, mars, jupiter, saturn;

let planets = [];

init();
animate();


function init() {
    // SCENE
    scene = new THREE.Scene();
    scene.background = new THREE.Color(0x181B3C);
    // CAMERA
    camera = new THREE.PerspectiveCamera(fieldOfView, aspect, nearClip, farClip)
    // RENDU
    renderer = new THREE.WebGLRenderer({ antialias: true });

    // Taille du rendu sur l'ecran
    renderer.setSize(window.innerWidth, window.innerHeight);

    // Rendu du canvas
    document.body.appendChild(renderer.domElement);


    let sun = MeshGenerator({
        type : 'sphere',
        dimension : [100, 100, 100],
        texture : 'textures/sun.jpg'
    });
    planets.push(sun);

    mercury = MeshGenerator({
        type : 'sphere',
        dimension : [10, 10, 10],
        texture : 'textures/mercury.jpg',
        position : [200, 0, 0]
    });
    planets.push(mercury);
    let ringMercury = MeshGenerator({
        type : 'ring',
        innerRadius : [201],
        outerRadius : [199],
        thetaSegments : [300],
        color : 0xffffff,
        position : [0, 0, 0],
        rotation : [90, 0, 0]
    });
    planets.push(ringMercury);

    venus = MeshGenerator({
        type : 'sphere',
        dimension : [30, 30, 30],
        texture : 'textures/venus.jpg',
        position : [400, 0, 0]
    });
    planets.push(venus);
    let ringVenus = MeshGenerator({
        type : 'ring',
        innerRadius : [401],
        outerRadius : [399],
        thetaSegments : [300],
        color : 0xffffff,
        position : [0, 0, 0],
        rotation : [90, 0, 0]
    });
    planets.push(ringVenus);

    earth = MeshGenerator({
        type : 'sphere',
        dimension : [30, 30, 30],
        texture : 'textures/earth.jpg',
        position : [600, 0, 0]
    });
    planets.push(earth);
    let ringEarth = MeshGenerator({
        type : 'ring',
        innerRadius : [601],
        outerRadius : [599],
        thetaSegments : [300],
        color : 0xffffff,
        position : [0, 0, 0],
        rotation : [90, 0, 0]
    });
    planets.push(ringEarth);

    mars = MeshGenerator({
        type : 'sphere',
        dimension : [15, 15, 15],
        texture : 'textures/mars.jpg',
        position : [800, 0, 0]
    });
    planets.push(mars);
    let ringMars = MeshGenerator({
        type : 'ring',
        innerRadius : [801],
        outerRadius : [799],
        thetaSegments : [300],
        color : 0xffffff,
        position : [0, 0, 0],
        rotation : [90, 0, 0]
    });
    planets.push(ringMars);

    jupiter = MeshGenerator({
        type : 'sphere',
        dimension : [50, 50, 50],
        texture : 'textures/jupiter.jpg',
        position : [1000, 0, 0]
    });
    planets.push(jupiter);
    let ringJupiter = MeshGenerator({
        type : 'ring',
        innerRadius : [1001],
        outerRadius : [999],
        thetaSegments : [300],
        color : 0xffffff,
        position : [0, 0, 0],
        rotation : [90, 0, 0]
    });
    planets.push(ringJupiter);

    saturn = MeshGenerator({
        type : 'sphere',
        dimension : [45, 45, 45],
        texture : 'textures/saturn.jpg',
        position : [1200, 0, 0]
    });
    planets.push(saturn);
    let ring = MeshGenerator({
        type : 'ring',
        innerRadius : [80],
        outerRadius : [60],
        thetaSegments : [30],
        texture : 'textures/ring.png',
        position : [1200, 0, 0],
        rotation : [90, 0, 0]
    });
    planets.push(ring);
    let ringSaturn = MeshGenerator({
        type : 'ring',
        innerRadius : [1201],
        outerRadius : [1199],
        thetaSegments : [300],
        color : 0xffffff,
        position : [0, 0, 0],
        rotation : [90, 0, 0]
    });
    planets.push(ringSaturn);


    scene.add(...planets);


    camera.position.x = 2000;

    //Contrôle de la camera avec la souris
    controls = new OrbitControls(camera, renderer.domElement);
    controls.minDistance = 100;
    controls.maxDistance = 100000;

}

function animate(){
    requestAnimationFrame(animate);

    mercury.rotation.y += 0.005;
    venus.rotation.y += 0.005;
    earth.rotation.y += 0.005;
    mars.rotation.y += 0.005;
    jupiter.rotation.y += 0.005;
    saturn.rotation.y += 0.005;

    renderer.render(scene, camera);
}


function getDistance (position) {
    return ((position * 1000000) * 200 / (46000000)).toPrecision(1);
}

//Générateur d'objet
function MeshGenerator(obj) {
    let geometry, texture, color, material, mesh;

    switch (obj.type.toLowerCase()) {
        case 'box':
            geometry = new THREE.BoxBufferGeometry(...obj.dimension);
            break;
        case 'sphere':
            geometry = new THREE.SphereBufferGeometry(...obj.dimension)
            break;
        case 'cone':
            geometry = new THREE.ConeBufferGeometry(...obj.dimension)
            break;
        case 'cylinder':
            geometry = new THREE.CylinderBufferGeometry(...obj.dimension)
            break;
        case 'plane' :
            geometry = new THREE.PlaneBufferGeometry(...obj.dimension)
            break;
        case 'circle' :
            geometry = new THREE.CircleBufferGeometry(...obj.dimension)
            break;
        case 'ring' :
            geometry = new THREE.RingBufferGeometry(...obj.innerRadius, ...obj.outerRadius, ...obj.thetaSegments)
            break;
    }
    if (typeof obj.texture !== 'undefined'){
        texture = new THREE.TextureLoader().load( obj.texture );
        material = new THREE.MeshBasicMaterial({ map: texture  });
    } else if (typeof obj.color !== 'undefined'){
        material = new THREE.MeshBasicMaterial({
            color: obj.color
        })
    } else {
        material = new THREE.MeshBasicMaterial();
    }

    mesh = new THREE.Mesh(geometry, material);

    if (typeof obj.rotation !== 'undefined'){
        mesh.rotation.x = (obj.rotation[0]) * Math.PI/180;
        mesh.rotation.y = (obj.rotation[1]) * Math.PI/180;
        mesh.rotation.z = (obj.rotation[2]) * Math.PI/180;
    }

    if (typeof obj.position !== 'undefined'){
        mesh.position.set(...obj.position);
    }

    return mesh;
}
