var div3D = document.getElementById('div_3d_container');

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

function initializeResizeObserver(world)
{
	return new ResizeObserver((entries) => world.setRendererSize(entries[0].contentRect)).observe(div3D);
}

function initializeOrbitControls(camera, renderer)
{
	return new OrbitControls( camera, renderer.domElement );
}

class World {
	constructor(){

		this.scene = initializeScene();
		this.light = initializeLight();
		this.camera = initializeCamera();
		this.renderer = initializeRenderer();
		this.resize_obs = initializeResizeObserver(this);
		this.controls = initializeOrbitControls(this.camera, this.renderer);
		this.objects = {};

		div3D.appendChild( this.renderer.domElement );
    }

	destructor() {
		if (this.resize_obs != undefined)
			this.resize_obs.unobserve(div3D);
	}

	setRendererSize(container)
	{
		this.camera.aspect = container.width / container.height;
		this.camera.updateProjectionMatrix();
	
		this.renderer.setSize(container.width, container.height);
		this.renderer.setPixelRatio(window.devicePixelRatio);
	}
}

  


function buildObjects(world)
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

function addToScene(world)
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


let world = new World();



buildObjects(world);
addToScene(world);
animate();



/*
const loader = new GLTFLoader();

loader.load( './model.glb', function ( gltf ) {

	scene.add( gltf.scene );

}, undefined, function ( error ) {

	console.error( error );

} );
*/



// fetch('file.txt')
//   .then(response => response.text())
//   .then(text => console.log(text))