function loadArm()
{
	let roboticArmBaseServo = new THREE.Mesh(geometries.roboticArmBaseServo, materials.material3dPrintBlack);
	setMeshParams(roboticArmBaseServo);
	roboticArmBaseServo.position.set(262*stlScale, 0*stlScale, 0);
	roboticArmBaseServo.rotation.set(0, -Math.PI/2, 0);
	


	let roboticArmBaseBearing = new THREE.Mesh(geometries.roboticArmBaseBearing, materials.material3dPrintBlack);
	setMeshParams(roboticArmBaseBearing);
	roboticArmBaseBearing.position.set(216*stlScale, -45*stlScale, 0);
	roboticArmBaseBearing.rotation.set(Math.PI, Math.PI/2, 0);
	


	let roboticArmBasePipe = new THREE.Mesh(geometries.pipeUniversal, materials.materialMetal);
	roboticArmBasePipe.position.set(300*stlScale, -50*stlScale, 0*stlScale);
	setMeshParams(roboticArmBasePipe);
	setPipeSize(roboticArmBasePipe, 20, 160);

	let roboticArmBase = new THREE.Mesh(geometries.roboticArmBase, materials.material3dPrintBlack);
	setMeshParams(roboticArmBase);
	roboticArmBase.position.set(300*stlScale, 100*stlScale, 0);
	roboticArmBase.rotation.set(Math.PI/2, 0, 0);


	let roboticArmAPipeA = new THREE.Mesh(geometries.pipeUniversal, materials.materialMetal);
	roboticArmAPipeA.position.set(350*stlScale, 88*stlScale, 40*stlScale);
	roboticArmAPipeA.rotation.set(0, 0, -Math.PI/2);
	setMeshParams(roboticArmAPipeA);
	setPipeSize(roboticArmAPipeA, 20, 160);

	let roboticArmAPipeB = new THREE.Mesh(geometries.pipeUniversal, materials.materialMetal);
	roboticArmAPipeB.position.set(350*stlScale, 88*stlScale, -40*stlScale);
	roboticArmAPipeB.rotation.set(0, 0, -Math.PI/3);
	setMeshParams(roboticArmAPipeB);
	setPipeSize(roboticArmAPipeB, 20, 160);

	let roboticArmJointA = new THREE.Mesh(geometries.roboticArmJointA, materials.material3dPrintBlack);
	setMeshParams(roboticArmJointA);
	roboticArmJointA.position.set(510*stlScale, 180*stlScale, -70*stlScale);
	roboticArmJointA.rotation.set(0, 0, (2*Math.PI)/3);


	let roboticArmJointB = new THREE.Mesh(geometries.roboticArmJointB, materials.material3dPrintBlack);
	setMeshParams(roboticArmJointB);
	roboticArmJointB.position.set(510*stlScale, 180*stlScale, 30*stlScale);
	roboticArmJointB.rotation.set(Math.PI, 0, Math.PI/3);

	let roboticArmBPipeA = new THREE.Mesh(geometries.pipeUniversal, materials.materialMetal);
	roboticArmBPipeA.position.set(540*stlScale, 135*stlScale, 10*stlScale);
	roboticArmBPipeA.rotation.set(0, 0, -Math.PI/2-Math.PI/3);
	setMeshParams(roboticArmBPipeA);
	setPipeSize(roboticArmBPipeA, 20, 260);

	let roboticArmJointC = new THREE.Mesh(geometries.roboticArmJointA, materials.material3dPrintBlack);
	setMeshParams(roboticArmJointC);
	roboticArmJointC.position.set(670*stlScale, -88*stlScale, 40*stlScale);
	roboticArmJointC.rotation.set(Math.PI, 0, Math.PI/3+Math.PI/2);


	let roboticArmGripper = new THREE.Mesh(geometries.roboticArmGripper, materials.material3dPrintBlack);
	setMeshParams(roboticArmGripper);
	roboticArmGripper.position.set(670*stlScale, -55*stlScale, -35*stlScale);
	roboticArmGripper.rotation.set(Math.PI/2, 0.1, Math.PI/2);



	roverStructure.grouped.add(roboticArmBaseServo);
	roverStructure.grouped.add(roboticArmBaseBearing);
	roverStructure.grouped.add(roboticArmBasePipe);

	roverStructure.roboticArm.base = new THREE.Group();

	roverStructure.roboticArm.base.add(roboticArmBase);
	roverStructure.roboticArm.base.add(roboticArmBPipeA);
	roverStructure.roboticArm.base.add(roboticArmJointB);
	roverStructure.roboticArm.base.add(roboticArmJointC);
	roverStructure.roboticArm.base.add(roboticArmGripper);

	roverStructure.grouped.add(roboticArmAPipeB);
	roverStructure.grouped.add(roboticArmJointA);

	roverStructure.grouped.add(roverStructure.roboticArm.base);
	//roverStructure.grouped.add(roboticArmAPipeA);

}