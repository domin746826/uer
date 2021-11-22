function loadCamera()
{
	let cameraCase = new THREE.Mesh(geometries.cameraCase, materials.material3dPrintBlack);
	setMeshParams(cameraCase);
	cameraCase.rotation.set(-Math.PI/2, 0, Math.PI/2);

	roverStructure.camera.cameraHead = new THREE.Mesh(geometries.cameraHead, materials.material3dPrintBlack);
	setMeshParams(roverStructure.camera.cameraHead);
	roverStructure.camera.cameraHead.rotation.set(-Math.PI/2, 0, Math.PI/2);
	roverStructure.camera.cameraHead.position.set(0, 80*stlScale, 0);

	/*const spotLight = new THREE.SpotLight( 0xffffff );
	spotLight.position.set( 0, 0, 0 );

	spotLight.castShadow = true;

	spotLight.shadow.mapSize.width = 64;
	spotLight.shadow.mapSize.height = 64;

	spotLight.shadow.camera.near = 1;
	spotLight.shadow.camera.far = 5;
	spotLight.shadow.camera.fov = 1;

	spotLight.angle = 0.5;
	spotLight.penumbra = 0.2;
	spotLight.decay = 2;
	spotLight.rotation.set(Math.PI/3, 0, 0);*/

	roverStructure.camera.cameraCase = new THREE.Group();
	roverStructure.camera.cameraCase.add(cameraCase);
	roverStructure.camera.cameraCase.add(roverStructure.camera.cameraHead);
	//roverStructure.camera.cameraCase.add(spotLight);


}