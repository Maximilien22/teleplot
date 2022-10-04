var div3D = document.getElementById('div_3d_container');

function animateWorld()
{
	requestAnimationFrame(animateWorld);
	world.render();
}

class World {
	constructor(){

		this.scene = this.initializeScene();
		this.light = this.initializeLight(this.scene);
		this.camera = this.initializeCamera();
		this.renderer = this.initializeRenderer();
		this.resize_obs = this.initializeResizeObserver(this);
		this.orbit_controls = this.initializeOrbitControls(this.camera, this.renderer);
		this._3Dshapes = [];

		div3D.appendChild( this.renderer.domElement );
    }

	initializeScene()
	{
		let scene = new THREE.Scene();
		scene.background = new Color('skyblue');

		return scene;
	}

	initializeLight(scene)
	{
		let light = new DirectionalLight('white', 8);
		light.position.set(10, 10, 10);

		let light2 = new DirectionalLight('white', 4);
		light2.position.set(-10, -10, -10);

		scene.add(light);
		scene.add(light2);

		return light;
	}

	initializeCamera()
	{
		let camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
		camera.far = 1000;
		camera.near = 0.1;
		camera.position.z = 15;
		camera.position.y = 1.5;
		return camera;
	}

	initializeRenderer()
	{
		let renderer = new THREE.WebGLRenderer({ antialias: true });
		renderer.setSize( window.innerWidth, window.innerHeight );
		renderer.physicallyCorrectLights = true;

		return renderer;
	}

	initializeResizeObserver(world)
	{
		return new ResizeObserver((entries) => world.setRendererSize(entries[0].contentRect)).observe(div3D);
	}

	initializeOrbitControls(camera, renderer)
	{
		return new OrbitControls( camera, renderer.domElement );
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

	
	setObject(shape3d)
	{
		let found = false;
		let i = 0;

		while (i < this._3Dshapes.length && !found)
		{
			if (this._3Dshapes[i].shapeName === shape3d.shapeName)
			{
				this.scene.remove(this._3Dshapes[i].three_object);
				this._3Dshapes[i] = shape3d;

				found = true;
			}

			i++;
		}

		if (!found)
		{
			this._3Dshapes.push(shape3d);
		}

		this.scene.add(shape3d.three_object);
	}
	
	render()
	{
		this.renderer.render( this.scene, this.camera );
	}
}



class Shape3D
{
	constructor ()
	{
		this.shapeName = undefined; //ex : "my_square_0"
		this.three_object = null;
		this.default_material = new MeshStandardMaterial({color : 'purple'});

		this.position = undefined; // Object containing x, y, and z, its tree coordonates
		this.rotation = undefined; // Object containing x, y, and z, its tree rotations
		this.shapeType = undefined; // String, ex : "square"

		this.center = undefined; // Object, ex : {x:0, y:0, z:0};
		this.radius = undefined; // Number, the radius of the sphere
		this.precision = undefined; // Number, the precision of the sphere

		this.height = undefined; // Number, the height of the square
		this.width = undefined; // Number, the width of the square
		this.depth = undefined; // Number, the depth of the square

	}

	initializeFromJson(shapeName, jsonObj)
	{
		this.shapeName = shapeName;
		
		this.position = jsonObj.position;
		this.rotation = jsonObj.rotation;
		this.shapeType = jsonObj.shape;

		this.center = jsonObj.center;
		this.radius = jsonObj.radius;
		this.precision = jsonObj.precision;

		this.width = jsonObj.width;
		this.height = jsonObj.height;	
		this.depth = jsonObj.depth;

		this.buildThreeObject();

		return this;
	}


	buildThreeObject()
	{
		if (this.shapeType == "square")
		{
			
			let objGeometry = new THREE.BoxGeometry( this.width, this.height, this.depth );
			this.three_object = new THREE.Mesh( objGeometry, this.default_material );
		}
		else if (this.shapeType == "sphere")
		{
			let objGeometry = new THREE.SphereGeometry(this.radius, this.precision * 2, this.precision);
			this.three_object = new THREE.Mesh( objGeometry, this.default_material );
		}

		this.three_object.rotation.x = this.rotation.x;
		this.three_object.rotation.y = this.rotation.y;
		this.three_object.rotation.z = this.rotation.z;

		this.three_object.position.x = this.position.x;
		this.three_object.position.y = this.position.y;
		this.three_object.position.z = this.position.z;
	}

}

/*
function buildPlatform(material)
	{
		const platformGeometry = new THREE.BoxGeometry( 4, 0.01, 4 );
		world.objects.platform = new THREE.Mesh( platformGeometry, material );
	}
*/

let jsonObj = {
	shape : "square",
	height : 5,
	width : 5,
	depth : 5,
	position : {x : 0, y : 0, z :0},
	rotation : {x : 0, y : 0, z :0},
}

let shapeName = "my_square_0";



let jsonObj2 = {
	shape : "sphere",
	radius :8,
	center : {x : 0, y : 0, z :0},
	precision : 50,
	position : {x : 0, y : 0, z :0},
	rotation : {x : 0, y : 0, z :0},
}

let shapeName2 = "my_sphere_0";


var world = new World();
world.setObject(new Shape3D().initializeFromJson(shapeName, jsonObj));

setTimeout(()=>{
	jsonObj.rotation.z = 1;
	world.setObject(new Shape3D().initializeFromJson(shapeName, jsonObj));
	// console.log(JSON.stringify(world, null, 3));

}, 2000);


animateWorld();