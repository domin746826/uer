function loadChassis()
{
	let chassis = new THREE.Mesh(geometries.chassis, materials.material3dPrintWhite);
	setMeshParams(chassis);
	chassis.position.set(0, -140*stlScale, 0);
	chassis.rotation.set(-Math.PI/2, 0, Math.PI);

	let cameraPipeHolder = new THREE.Mesh(geometries.cameraHolderChassis, materials.material3dPrintBlack);
	setMeshParams(cameraPipeHolder);
	cameraPipeHolder.position.set(192*stlScale, 35*stlScale, 115*stlScale);
	cameraPipeHolder.rotation.set(-Math.PI/2, 0, 0);

	let cameraPipe = new THREE.Mesh(geometries.pipeUniversal, materials.materialMetal);
	cameraPipe.position.set(192*stlScale, 45*stlScale, 115*stlScale);
	setMeshParams(cameraPipe);
	setPipeSize(cameraPipe, 20, 180);


	let axisHolder = new THREE.Mesh(geometries.axisHolder, materials.material3dPrintBlack);
	setMeshParams(axisHolder);
	axisHolder.position.set(0, 0, -165*stlScale);
	axisHolder.rotation.set(0, 0, Math.PI);
	let axisHolderMirrored = axisHolder.clone();
	axisHolderMirrored.position.set(0, 0, 165*stlScale);
	axisHolderMirrored.rotation.set(0, Math.PI, Math.PI);

	let roboticArmJointBase = new THREE.Mesh(geometries.roboticArmJointBase, materials.material3dPrintBlack);
	setMeshParams(roboticArmJointBase);
	roboticArmJointBase.rotation.set(-Math.PI/2, 0, Math.PI);
	roboticArmJointBase.position.set(98*stlScale,31*stlScale, 0);

	let acrylicGlassBottom = new THREE.Mesh(new THREE.BoxGeometry(500, 6, 350), materials.acrylicGlass);
	setMeshParams(acrylicGlassBottom);
	acrylicGlassBottom.position.set(0, -143*stlScale, 0);

	let acrylicGlassBack = new THREE.Mesh(new THREE.BoxGeometry(6, 206, 350), materials.acrylicGlass);
	setMeshParams(acrylicGlassBack);
	acrylicGlassBack.position.set(-253*stlScale, -43*stlScale, 0);

	let solarPanel = new THREE.Mesh(geometries.solarPanel, materials.material3dPrintBlack);
	setMeshParams(solarPanel);
	solarPanel.rotation.set(Math.PI/2, -Math.PI/2, 0, 'ZYX');
	solarPanel.position.set(-314*stlScale, 92*stlScale, 0);

	let antenna = new THREE.Mesh(geometries.antenna, materials.materialMetal);
	setMeshParams(antenna);
	antenna.rotation.set(-Math.PI/2, 0, Math.PI/2);
	antenna.position.set(0, 80*stlScale, 120*stlScale);
	//antenna.scale.set()



	roverStructure.grouped = new THREE.Group();
	roverStructure.grouped.add(chassis);
	roverStructure.grouped.add(cameraPipeHolder);
	roverStructure.grouped.add(roverStructure.articulatedBar.left.grouped);
	roverStructure.grouped.add(roverStructure.articulatedBar.right.grouped);
	roverStructure.grouped.add(cameraPipe);
	roverStructure.grouped.add(axisHolder);
	roverStructure.grouped.add(axisHolderMirrored);
	roverStructure.grouped.add(roboticArmJointBase);

	roverStructure.grouped.add(acrylicGlassBottom);
	roverStructure.grouped.add(acrylicGlassBack);

	roverStructure.grouped.add(solarPanel);
	roverStructure.grouped.add(antenna);



	loadArm();
}