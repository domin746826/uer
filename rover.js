let roverStructure = {
	articulatedBar: {
		left: {
			front: {
				wheel: null,
				moduleWithWheel: null,
				wheelUpperJoint: null
			},
			back: {
				wheel: null,
				moduleWithWheel: null,
				wheelUpperJoint: null
			}
		},
		right: {
			front: {
				wheel: null,
				moduleWithWheel: null,
				wheelUpperJoint: null
			},
			back: {
				wheel: null,
				moduleWithWheel: null,
				wheelUpperJoint: null
			}
		},
		bar: null,
		connector: null,
		connectorMirrored: null
	},
	camera: {
		cameraCase: null,
		cameraHolder: null,
		cameraHead: null
	},

	roboticArm: {
		base: null,
		partA: null,
		partB: null
	},

	grouped: null
};

let geometries = {};
let materials = {};
let createRoverInterval;
let allLoaded = 0;
let stlScale = 0.02;
let ready = false;
const numOfAllStls = 25;
function loadRover()
{
	const loader = new THREE.STLLoader();

	materials.material3dPrintWhite = new THREE.MeshPhongMaterial( { color: 0xffffff, specular: 0x222222, shininess: 200} );
	materials.material3dPrintBlack = new THREE.MeshPhongMaterial( { color: 0x111111, specular: 0x222222, shininess: 20} );
	materials.material3dPrintGray = new THREE.MeshPhongMaterial( { color: 0x333333, specular: 0x222222, shininess: 20} );
	materials.materialRubber = new THREE.MeshLambertMaterial( { color: 0x121212} );
	materials.materialMetal = new THREE.MeshPhongMaterial( { color: 0x777777, emissive: 0x111111} );
	materials.materialMetal.metalness = 1;
	materials.materialMetal.roughness = 0;
	const pmremGenerator = new THREE.PMREMGenerator( renderer );
	scene.environment = pmremGenerator.fromScene( new THREE.RoomEnvironment(), 0.04 ).texture;

	materials.acrylicGlass = new THREE.MeshPhongMaterial( {color: 0x3333ff, specular: 0xaaaaff, opacity: 0.75, shininess: 300, transparent: true});

	materials.materialMetal.metalness = 0.5;

	const tdsload = new THREE.TDSLoader( );
	tdsload.load( 'models/terrain.3ds', function ( object ) {

		object.traverse( function ( child ) {

			if ( child.isMesh ) {

				child.material.specular.setScalar( 0.1 );
				//child.material.normalMap = normal;
				setMeshParams(child);
				child.rotateX(-Math.PI/2);
				child.scale.set(stlScale*2, stlScale*2, stlScale*2);

			}

		} );

		scene.add( object );
		allLoaded++;
		setProgress(allLoaded*100/numOfAllStls);

	} );

	loader.load( 'models/wheel/wheel.stl', function (geometry)
	{
		geometries.rim = geometry;
		allLoaded++;
		setProgress(allLoaded*100/numOfAllStls);
	});
	
	loader.load( 'models/wheel/tire.stl', function ( geometry )
	{
		geometries.tire = geometry;
		allLoaded++;
		setProgress(allLoaded*100/numOfAllStls);
	});

	loader.load( 'models/wheel/wheelUpperJoint.stl', function ( geometry )
	{
		geometries.wheelUpperJoint = geometry;
		allLoaded++;
		setProgress(allLoaded*100/numOfAllStls);
	});

	loader.load( 'models/wheel/bearingWheelJoint.stl', function ( geometry )
	{
		geometries.jointWithBearing = geometry;
		allLoaded++;
		setProgress(allLoaded*100/numOfAllStls);
	});
	
	loader.load( 'models/wheel/pipeUniversal.stl', function ( geometry )
	{
		geometries.pipeUniversal = geometry;
		allLoaded++;
		setProgress(allLoaded*100/numOfAllStls);
	});

	loader.load( 'models/wheel/bearingWheelJointMirrored.stl', function ( geometry )
	{
		geometries.jointWithBearingMirrored = geometry;
		allLoaded++;
		setProgress(allLoaded*100/numOfAllStls);
	});

	loader.load( 'models/wheel/upperJointWheelServo.stl', function ( geometry )
	{
		geometries.upperJointWheelServo = geometry;
		allLoaded++;
		setProgress(allLoaded*100/numOfAllStls);
	});
	
	loader.load( 'models/wheel/articulatedBarJoint.stl', function ( geometry )
	{
		geometries.articulatedBarJoint = geometry;
		allLoaded++;
		setProgress(allLoaded*100/numOfAllStls);
	});

	loader.load( 'models/chassis/chassis.stl', function ( geometry )
	{
		geometries.chassis = geometry;
		allLoaded++;
		setProgress(allLoaded*100/numOfAllStls);
	});

	loader.load( 'models/chassis/cameraHolderChassis.stl', function ( geometry )
	{
		geometries.cameraHolderChassis = geometry;
		allLoaded++;
		setProgress(allLoaded*100/numOfAllStls);
	});

	loader.load( 'models/chassis/axisHolder.stl', function ( geometry )
	{
		geometries.axisHolder = geometry;
		allLoaded++;
		setProgress(allLoaded*100/numOfAllStls);
	});

	loader.load( 'models/chassis/roboticArmJointBase.stl', function ( geometry )
	{
		geometries.roboticArmJointBase = geometry;
		allLoaded++;
		setProgress(allLoaded*100/numOfAllStls);
	});

	loader.load( 'models/camera/cameraCase.stl', function ( geometry )
	{
		geometries.cameraCase = geometry;
		allLoaded++;
		setProgress(allLoaded*100/numOfAllStls);
	});

	loader.load('models/wheel/articulatedBar.stl', function(geometry) 
	{
		geometries.articulatedBar = geometry;
		allLoaded++;
		setProgress(allLoaded*100/numOfAllStls);
	});

	loader.load('models/wheel/articulatedBarConnector.stl', function(geometry)
	{
		geometries.articulatedBarConnector = geometry;
		allLoaded++;
		setProgress(allLoaded*100/numOfAllStls);
	})

	loader.load('models/roboticArm/roboticArmBaseBearing.stl', function(geometry) 
	{
		geometries.roboticArmBaseBearing = geometry;
		allLoaded++;
		setProgress(allLoaded*100/numOfAllStls);
	});

	loader.load('models/roboticArm/roboticArmBaseServo.stl', function(geometry)
	{
		geometries.roboticArmBaseServo = geometry;
		allLoaded++;
		setProgress(allLoaded*100/numOfAllStls);
	})

	loader.load('models/camera/cameraHead.stl', function(geometry)
	{
		geometries.cameraHead = geometry;
		allLoaded++;
		setProgress(allLoaded*100/numOfAllStls);
	})

	loader.load('models/chassis/solarPanels.stl', function(geometry)
	{
		geometries.solarPanel = geometry;
		allLoaded++;
		setProgress(allLoaded*100/numOfAllStls);
	})

	loader.load('models/chassis/antenna.stl', function(geometry)
	{
		geometries.antenna = geometry;
		allLoaded++;
		setProgress(allLoaded*100/numOfAllStls);
	})

	loader.load('models/roboticArm/roboticArmBase.stl', function(geometry)
	{
		geometries.roboticArmBase = geometry;
		allLoaded++;
		setProgress(allLoaded*100/numOfAllStls);
	})

	loader.load('models/roboticArm/roboticArmJointA.stl', function(geometry)
	{
		geometries.roboticArmJointA = geometry;
		allLoaded++;
		setProgress(allLoaded*100/numOfAllStls);
	})

	loader.load('models/roboticArm/roboticArmJointB.stl', function(geometry)
	{
		geometries.roboticArmJointB = geometry;
		allLoaded++;
		setProgress(allLoaded*100/numOfAllStls);
	})

	loader.load('models/roboticArm/roboticArmGripper.stl', function(geometry)
	{
		geometries.roboticArmGripper = geometry;
		allLoaded++;
		setProgress(allLoaded*100/numOfAllStls);
	})


	createRoverInterval = window.setInterval(startCreatingRover, 500);
}


function startCreatingRover()
{
	if(allLoaded < numOfAllStls)
		return;
	else
	{
		clearInterval(createRoverInterval);
		removeOverlay();
	}


	loadModuleWithWheel();
	roverStructure.articulatedBar.left.front.completeWheel.position.x = stlScale * 350;
	roverStructure.articulatedBar.left.front.completeWheel.rotation.y = Math.PI;

	roverStructure.articulatedBar.left.back.completeWheel.position.x = stlScale * -350;
	roverStructure.articulatedBar.left.back.completeWheel.rotation.y = Math.PI;

	roverStructure.articulatedBar.left.back.completeWheel.position.y = stlScale * -140;
	roverStructure.articulatedBar.left.front.completeWheel.position.y = stlScale * -140;

	let articulatedBarPipeA = new THREE.Mesh(geometries.pipeUniversal, materials.materialMetal);
	setMeshParams(articulatedBarPipeA);
	setPipeSize(articulatedBarPipeA, 30, 300);
	let articulatedBarPipeB = articulatedBarPipeA.clone();

	articulatedBarPipeA.position.set(stlScale*320, -stlScale*165, 0);
	articulatedBarPipeA.setRotationFromEuler(new THREE.Euler(0, 0, Math.PI/3, 'XYZ'));
	articulatedBarPipeB.position.set(-stlScale*320, -stlScale*165, 0);
	articulatedBarPipeB.setRotationFromEuler(new THREE.Euler(0, Math.PI, Math.PI/3, 'XYZ'));

	let articulatedBarJoint = new THREE.Mesh(geometries.articulatedBarJoint, materials.material3dPrintBlack);
	articulatedBarJoint.position.set(0, stlScale*0, 0); //140 
	setMeshParams(articulatedBarJoint);

	let articulatedBarJointMirrored = new THREE.Mesh(geometries.articulatedBarJoint, materials.material3dPrintBlack);
	articulatedBarJointMirrored.position.set(0, stlScale*0, 0); //140 
	setMeshParams(articulatedBarJointMirrored);

	roverStructure.articulatedBar.connector = new THREE.Mesh(geometries.articulatedBarConnector, materials.material3dPrintBlack);
	setMeshParams(roverStructure.articulatedBar.connector);
	roverStructure.articulatedBar.connector.position.set(stlScale*0, stlScale*77, stlScale*17.5);
	roverStructure.articulatedBar.connector.rotation.set(0, Math.PI, 0);

	roverStructure.articulatedBar.connectorMirrored = new THREE.Mesh(geometries.articulatedBarConnector, materials.material3dPrintBlack);
	setMeshParams(roverStructure.articulatedBar.connectorMirrored);
	roverStructure.articulatedBar.connectorMirrored.position.set(stlScale*0, stlScale*77, stlScale*17.5);
	roverStructure.articulatedBar.connectorMirrored.rotation.set(0, Math.PI, 0);



	roverStructure.articulatedBar.left.grouped = new THREE.Group();
	roverStructure.articulatedBar.left.grouped.add(roverStructure.articulatedBar.left.front.completeWheel);
	roverStructure.articulatedBar.left.grouped.add(roverStructure.articulatedBar.left.back.completeWheel);
	roverStructure.articulatedBar.left.grouped.add(articulatedBarPipeA);
	roverStructure.articulatedBar.left.grouped.add(articulatedBarPipeB);
	roverStructure.articulatedBar.left.grouped.add(articulatedBarJoint);
	roverStructure.articulatedBar.left.grouped.add(roverStructure.articulatedBar.connector);

	


	roverStructure.articulatedBar.right.front.completeWheel.position.x = stlScale * 350;
	roverStructure.articulatedBar.right.front.completeWheel.rotation.y = Math.PI;

	roverStructure.articulatedBar.right.back.completeWheel.position.x = stlScale * -350;
	roverStructure.articulatedBar.right.back.completeWheel.rotation.y = Math.PI;

	roverStructure.articulatedBar.right.back.completeWheel.position.y = stlScale * -140;
	roverStructure.articulatedBar.right.front.completeWheel.position.y = stlScale * -140;

	roverStructure.articulatedBar.right.grouped = new THREE.Group();
	roverStructure.articulatedBar.right.grouped.add(roverStructure.articulatedBar.right.front.completeWheel);
	roverStructure.articulatedBar.right.grouped.add(roverStructure.articulatedBar.right.back.completeWheel);
	roverStructure.articulatedBar.right.grouped.add(articulatedBarPipeA.clone());
	roverStructure.articulatedBar.right.grouped.add(articulatedBarPipeB.clone());
	roverStructure.articulatedBar.right.grouped.add(articulatedBarJointMirrored);
	roverStructure.articulatedBar.right.grouped.add(roverStructure.articulatedBar.connectorMirrored);

	roverStructure.articulatedBar.right.grouped.position.z = -220*stlScale;
	roverStructure.articulatedBar.left.grouped.position.z = 220*stlScale;

	roverStructure.articulatedBar.bar = new THREE.Mesh(geometries.articulatedBar, materials.material3dPrintBlack);
	setMeshParams(roverStructure.articulatedBar.bar);
	roverStructure.articulatedBar.bar.rotation.set(-Math.PI/2, 0, Math.PI/2);
	roverStructure.articulatedBar.bar.position.set(98*stlScale, 72*stlScale, 0);


	loadChassis();

	loadCamera();
	roverStructure.camera.cameraCase.position.set(192*stlScale, 207*stlScale, 115*stlScale);
	roverStructure.grouped.add(roverStructure.camera.cameraCase);
	roverStructure.grouped.add(roverStructure.articulatedBar.bar);
	scene.add(roverStructure.grouped);
	roverStructure.grouped.position.y = 420*stlScale;
	roverStructure.grouped.rotation.set(-0.05, 0, -0.1);


	console.log(roverStructure);

	setArticulatedBarAngle(-0.02);

	ready = true;
}

function setMeshParams(mesh)
{
	mesh.castShadow = true;
	mesh.receiveShadow = true;
	mesh.scale.set(stlScale, stlScale, stlScale);
}

function setPipeSize(mesh, d, h)
{
	mesh.scale.set(stlScale * d, stlScale * h, stlScale * d);
}

function rotateWheel(wheelId, rotation) //0 FL 1 FR 2 BL 3 BR
{
	let currentRoverPart;
	switch(wheelId)
	{
		case 0:
			currentRoverPart = roverStructure.articulatedBar.left.front;
			break;
		case 1:
			currentRoverPart = roverStructure.articulatedBar.right.front;
			break;
		case 2:
			currentRoverPart = roverStructure.articulatedBar.left.back;
			break;
		case 3:
			currentRoverPart = roverStructure.articulatedBar.right.back;
			break;
		default:
			return;
	}

	currentRoverPart.wheel.rotation.z += rotation;
}

function steerWheel(wheelId, rotation) //0 FL 1 FR 2 BL 3 BR
{
	let currentRoverPart;
	switch(wheelId)
	{
		case 0:
			currentRoverPart = roverStructure.articulatedBar.left.front;
			break;
		case 1:
			currentRoverPart = roverStructure.articulatedBar.right.front;
			break;
		case 2:
			currentRoverPart = roverStructure.articulatedBar.left.back;
			break;
		case 3:
			currentRoverPart = roverStructure.articulatedBar.right.back;
			break;
		default:
			return;
	}

	currentRoverPart.moduleWithWheel.rotation.y = rotation;
}

function setArticulatedBarAngle(angle)
{
	roverStructure.articulatedBar.left.grouped.rotation.z = angle;
	roverStructure.articulatedBar.right.grouped.rotation.z = -angle;
	roverStructure.articulatedBar.bar.rotation.z = -Math.sin(angle/3) + Math.PI/2;

	roverStructure.articulatedBar.connector.rotation.z = (angle-0.1);
	roverStructure.articulatedBar.connectorMirrored.rotation.z = -(angle+0.1);

}

function setCameraTilt(angle)
{
	roverStructure.camera.cameraHead.rotation.set(-Math.PI/2, angle, Math.PI/2);
}

function setCameraRotation(angle)
{
	roverStructure.camera.cameraCase.rotation.set(0, angle, 0);
}

function setRoverRotation(x, y, z)
{
	roverStructure.grouped.rotation.set(x, y, z);
}