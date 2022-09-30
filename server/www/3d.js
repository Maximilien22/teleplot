function initializeScene()
{
	let scene = new THREE.Scene();
	scene.background = new Color('skyblue');

	return scene;
}

function initializeLight()
{
	let light = new DirectionalLight('white', 8);
	light.position.set(10, 10, 10);

    return light;
}

function initializeCamera()
{
	let camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
	camera.far = 100;
	camera.near = 0.1;
	camera.position.z = 5;
	camera.position.y = 1.5;
	return camera;
}

function initializeRenderer()
{
	let renderer = new THREE.WebGLRenderer({ antialias: true });
	renderer.setSize( window.innerWidth, window.innerHeight );
	renderer.physicallyCorrectLights = true;

	return renderer;
}

class World {
	constructor(){
		this.scene = initializeScene();
		this.light = initializeLight();
		this.camera = initializeCamera();
		this.renderer = initializeRenderer();
		this.objects = {};

		document.body.appendChild( this.renderer.domElement );

		window.addEventListener('resize', () => {
			this.setRendererSize(document.body);
		  });
    }

	setRendererSize(container)
	{
		this.camera.aspect = container.clientWidth / container.clientHeight;
		this.camera.updateProjectionMatrix();
	
		this.renderer.setSize(container.clientWidth, container.clientHeight);
		this.renderer.setPixelRatio(window.devicePixelRatio);
	}
}

  


function buildObjects()
{

	function buildLine(material)
	{
		const points = [];
		points.push( new THREE.Vector3( - 10, 0, 0 ) );
		points.push( new THREE.Vector3( 0, 10, 0 ) );
		points.push( new THREE.Vector3( 10, 0, 0 ) );

		const lineGeometry = new THREE.BufferGeometry().setFromPoints( points );
		world.objects.line = new THREE.Line( lineGeometry, material);
	}

	function buildCube(material)
	{
		const cubeGeometry = new THREE.BoxGeometry( 1, 1, 1 );
		world.objects.cube = new THREE.Mesh( cubeGeometry, material );
		world.objects.cube.position.y = 0.7;
	}

	function buildPlatform(material)
	{
		const platformGeometry = new THREE.BoxGeometry( 4, 0.01, 4 );
		world.objects.platform = new THREE.Mesh( platformGeometry, material );
	}

	const materialCube = new MeshStandardMaterial({color : 'purple'});
	const materialPlatform = new MeshStandardMaterial({color : 'grey'});

	buildCube(materialCube);
	buildPlatform(materialPlatform);
}

function addToScene()
{
	// world.scene.add(world.objects.line);
	world.scene.add(world.objects.cube, world.light);
	world.scene.add(world.objects.platform);
}

function animate()
{
	world.objects.cube.rotation.y += 0.01;
	requestAnimationFrame( animate );
	world.renderer.render( world.scene, world.camera );
}


var world = new World();

let controls = new OrbitControls( world.camera, renderer.domElement );

buildObjects();
addToScene();
animate();



/*
const loader = new GLTFLoader();

loader.load( './model.glb', function ( gltf ) {

	scene.add( gltf.scene );

}, undefined, function ( error ) {

	console.error( error );

} );
*/



