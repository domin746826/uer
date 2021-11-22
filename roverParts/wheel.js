function loadWheel()
{
	let rimMesh = new THREE.Mesh(geometries.rim, materials.material3dPrintWhite);
	setMeshParams(rimMesh);
	let tireMesh = new THREE.Mesh(geometries.tire, materials.materialRubber);
	setMeshParams(tireMesh);
	let axleMesh = new THREE.Mesh(geometries.pipeUniversal, materials.materialMetal);
	setPipeSize(axleMesh, 12, 110);
	axleMesh.setRotationFromEuler(new THREE.Euler(Math.PI/2, 0, 0, 'XYZ'));
	axleMesh.position.set(0, 0, -stlScale*55);

	roverStructure.articulatedBar.left.front.wheel = new THREE.Group();
	roverStructure.articulatedBar.left.front.wheel.add(rimMesh);
	roverStructure.articulatedBar.left.front.wheel.add(tireMesh);
	roverStructure.articulatedBar.left.front.wheel.add(axleMesh);
	roverStructure.articulatedBar.left.front.wheel.position.y = - stlScale * 140;

	roverStructure.articulatedBar.left.back.wheel = roverStructure.articulatedBar.left.front.wheel.clone();
	roverStructure.articulatedBar.right.back.wheel = roverStructure.articulatedBar.left.front.wheel.clone();
	roverStructure.articulatedBar.right.front.wheel = roverStructure.articulatedBar.left.front.wheel.clone();
}

function loadModuleWithWheel()
{
	loadWheelWithJoints();

	let pipe7x80AMesh = new THREE.Mesh(geometries.pipeUniversal, materials.materialMetal);
	setMeshParams(pipe7x80AMesh);
	setPipeSize(pipe7x80AMesh, 7, 105);
	let pipe7x80BMesh = new THREE.Mesh(geometries.pipeUniversal, materials.materialMetal);
	setMeshParams(pipe7x80BMesh);
	setPipeSize(pipe7x80BMesh, 7, 105);

	pipe7x80AMesh.setRotationFromEuler(new THREE.Euler(Math.PI*1, 0, 0, 'XYZ'));
	pipe7x80BMesh.setRotationFromEuler(new THREE.Euler(Math.PI*1, 0, 0, 'XYZ'));

	let upperJointWheelServoMesh = new THREE.Mesh(geometries.upperJointWheelServo, materials.material3dPrintBlack);
	setMeshParams(upperJointWheelServoMesh); upperJointWheelServoMesh.rotateX(-Math.PI/2);
	upperJointWheelServoMesh.position.y = - stlScale * 50;
	roverStructure.articulatedBar.left.front.moduleWithWheel.position.y = -stlScale * 65;
	roverStructure.articulatedBar.left.back.moduleWithWheel.position.y = -stlScale * 65;
	roverStructure.articulatedBar.right.front.moduleWithWheel.position.y = -stlScale * 65;
	roverStructure.articulatedBar.right.back.moduleWithWheel.position.y = -stlScale * 65;

	roverStructure.articulatedBar.left.front.completeWheel = new THREE.Group();
	roverStructure.articulatedBar.left.front.completeWheel.add(upperJointWheelServoMesh);
	roverStructure.articulatedBar.left.front.completeWheel.add(roverStructure.articulatedBar.left.front.moduleWithWheel);
	roverStructure.articulatedBar.left.front.completeWheel.add(pipe7x80BMesh);
	roverStructure.articulatedBar.left.front.completeWheel.add(pipe7x80AMesh);

	roverStructure.articulatedBar.left.back.completeWheel = new THREE.Group();
	roverStructure.articulatedBar.left.back.completeWheel.add(upperJointWheelServoMesh.clone().rotateZ(Math.PI));
	roverStructure.articulatedBar.left.back.completeWheel.add(roverStructure.articulatedBar.left.back.moduleWithWheel);
	roverStructure.articulatedBar.left.back.completeWheel.add(pipe7x80BMesh.clone());
	roverStructure.articulatedBar.left.back.completeWheel.add(pipe7x80AMesh.clone());

	roverStructure.articulatedBar.right.front.completeWheel = new THREE.Group();
	roverStructure.articulatedBar.right.front.completeWheel.add(upperJointWheelServoMesh.clone());
	roverStructure.articulatedBar.right.front.completeWheel.add(roverStructure.articulatedBar.right.front.moduleWithWheel);
	roverStructure.articulatedBar.right.front.completeWheel.add(pipe7x80BMesh.clone());
	roverStructure.articulatedBar.right.front.completeWheel.add(pipe7x80AMesh.clone());

	roverStructure.articulatedBar.right.back.completeWheel = new THREE.Group();
	roverStructure.articulatedBar.right.back.completeWheel.add(upperJointWheelServoMesh.clone().rotateZ(Math.PI));
	roverStructure.articulatedBar.right.back.completeWheel.add(roverStructure.articulatedBar.right.back.moduleWithWheel);
	roverStructure.articulatedBar.right.back.completeWheel.add(pipe7x80BMesh.clone());
	roverStructure.articulatedBar.right.back.completeWheel.add(pipe7x80AMesh.clone());
}



function loadWheelWithJoints()
{
	loadWheel();
	

	let wheelUpperJointMesh = new THREE.Mesh(geometries.wheelUpperJoint, materials.material3dPrintBlack);
	setMeshParams(wheelUpperJointMesh); wheelUpperJointMesh.rotateX(-Math.PI/2);wheelUpperJointMesh.rotateZ(Math.PI/2);
	wheelUpperJointMesh.position.y = - stlScale * 40;

	let jointWithBearingA = new THREE.Mesh(geometries.jointWithBearingMirrored, materials.material3dPrintBlack);
	setMeshParams(jointWithBearingA);
	let jointWithBearingB = new THREE.Mesh(geometries.jointWithBearing, materials.material3dPrintBlack);
	setMeshParams(jointWithBearingB);

	jointWithBearingA.position.set(0, - stlScale * 140, stlScale * 40); //Math.PI/2
	jointWithBearingA.setRotationFromEuler(new THREE.Euler(0, Math.PI/2, Math.PI/2, 'XYZ'));
	jointWithBearingB.position.set(0, - stlScale * 140, -stlScale * 40);
	jointWithBearingB.setRotationFromEuler(new THREE.Euler(0, -Math.PI/2, Math.PI/2, 'XYZ'));

	let pipe20x100AMesh = new THREE.Mesh(geometries.pipeUniversal, materials.materialMetal);
	setMeshParams(pipe20x100AMesh);
	setPipeSize(pipe20x100AMesh, 20, 125);
	let pipe20x100BMesh = new THREE.Mesh(geometries.pipeUniversal, materials.materialMetal);
	setMeshParams(pipe20x100BMesh);
	setPipeSize(pipe20x100BMesh, 20, 125);

	pipe20x100AMesh.position.set(0, stlScale*0, stlScale * 53);
	pipe20x100AMesh.setRotationFromEuler(new THREE.Euler(Math.PI, 0, 0, 'XYZ'));
	pipe20x100BMesh.position.set(0, stlScale*0, -stlScale * 53);
	pipe20x100BMesh.setRotationFromEuler(new THREE.Euler(Math.PI, 0, 0, 'XYZ'));

	let pipe10x100AMesh = new THREE.Mesh(geometries.pipeUniversal, materials.materialMetal);
	setMeshParams(pipe10x100AMesh);
	setPipeSize(pipe10x100AMesh, 10, 115);
	let pipe10x100BMesh = new THREE.Mesh(geometries.pipeUniversal, materials.materialMetal);
	setMeshParams(pipe10x100BMesh);
	setPipeSize(pipe10x100BMesh, 10, 115);

	pipe10x100AMesh.position.set(-54*stlScale, stlScale*-3, stlScale * 53);
	pipe10x100AMesh.setRotationFromEuler(new THREE.Euler(Math.PI*1, 0, -0.3805, 'XYZ'));
	pipe10x100BMesh.position.set(-54*stlScale, stlScale*-3, -stlScale * 53);
	pipe10x100BMesh.setRotationFromEuler(new THREE.Euler(Math.PI*1, 0, -0.3805, 'XYZ'));

	roverStructure.articulatedBar.left.front.moduleWithWheel = new THREE.Group();
	roverStructure.articulatedBar.left.front.moduleWithWheel.add(roverStructure.articulatedBar.left.front.wheel);
	roverStructure.articulatedBar.left.front.moduleWithWheel.add(jointWithBearingA);
	roverStructure.articulatedBar.left.front.moduleWithWheel.add(jointWithBearingB);
	roverStructure.articulatedBar.left.front.moduleWithWheel.add(pipe20x100AMesh);
	roverStructure.articulatedBar.left.front.moduleWithWheel.add(pipe20x100BMesh);
	roverStructure.articulatedBar.left.front.moduleWithWheel.add(pipe10x100AMesh);
	roverStructure.articulatedBar.left.front.moduleWithWheel.add(pipe10x100BMesh);
	roverStructure.articulatedBar.left.front.moduleWithWheel.add(wheelUpperJointMesh);

	roverStructure.articulatedBar.left.back.moduleWithWheel = new THREE.Group();
	roverStructure.articulatedBar.left.back.moduleWithWheel.add(roverStructure.articulatedBar.left.back.wheel);
	roverStructure.articulatedBar.left.back.moduleWithWheel.add(jointWithBearingA.clone());
	roverStructure.articulatedBar.left.back.moduleWithWheel.add(jointWithBearingB.clone());
	roverStructure.articulatedBar.left.back.moduleWithWheel.add(pipe20x100AMesh.clone());
	roverStructure.articulatedBar.left.back.moduleWithWheel.add(pipe20x100BMesh.clone());
	roverStructure.articulatedBar.left.back.moduleWithWheel.add(pipe10x100AMesh.clone());
	roverStructure.articulatedBar.left.back.moduleWithWheel.add(pipe10x100BMesh.clone());
	roverStructure.articulatedBar.left.back.moduleWithWheel.add(wheelUpperJointMesh.clone());

	roverStructure.articulatedBar.right.back.moduleWithWheel = new THREE.Group();
	roverStructure.articulatedBar.right.back.moduleWithWheel.add(roverStructure.articulatedBar.right.back.wheel);
	roverStructure.articulatedBar.right.back.moduleWithWheel.add(jointWithBearingA.clone());
	roverStructure.articulatedBar.right.back.moduleWithWheel.add(jointWithBearingB.clone());
	roverStructure.articulatedBar.right.back.moduleWithWheel.add(pipe20x100AMesh.clone());
	roverStructure.articulatedBar.right.back.moduleWithWheel.add(pipe20x100BMesh.clone());
	roverStructure.articulatedBar.right.back.moduleWithWheel.add(pipe10x100AMesh.clone());
	roverStructure.articulatedBar.right.back.moduleWithWheel.add(pipe10x100BMesh.clone());
	roverStructure.articulatedBar.right.back.moduleWithWheel.add(wheelUpperJointMesh.clone());

	roverStructure.articulatedBar.right.front.moduleWithWheel = new THREE.Group();
	roverStructure.articulatedBar.right.front.moduleWithWheel.add(roverStructure.articulatedBar.right.front.wheel);
	roverStructure.articulatedBar.right.front.moduleWithWheel.add(jointWithBearingA.clone());
	roverStructure.articulatedBar.right.front.moduleWithWheel.add(jointWithBearingB.clone());
	roverStructure.articulatedBar.right.front.moduleWithWheel.add(pipe20x100AMesh.clone());
	roverStructure.articulatedBar.right.front.moduleWithWheel.add(pipe20x100BMesh.clone());
	roverStructure.articulatedBar.right.front.moduleWithWheel.add(pipe10x100AMesh.clone());
	roverStructure.articulatedBar.right.front.moduleWithWheel.add(pipe10x100BMesh.clone());
	roverStructure.articulatedBar.right.front.moduleWithWheel.add(wheelUpperJointMesh.clone());
}
