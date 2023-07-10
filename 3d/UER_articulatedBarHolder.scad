$fn=100;
difference()
{
	union()
	{
		//sphere(d=24);
		cylinder(d=24, h=24);
		translate([12, 0, 0]) rotate([90, 0, 0]) cylinder(d=24, h=36);
		translate([-12, 0, 0]) rotate([0, 90, 0]) cylinder(d=24, h=50);
		
		translate([22, 0, 12]) rotate([0, 30, 0]) cube([30, 3, 10], center=true);
		rotate([90, 0, 0]) translate([26, 0, 20]) rotate([0, 60, 0]) cube([30, 3, 10], center=true);
		rotate([0, 0, -90]) translate([20, 6, 12]) rotate([0, 30, 20]) cube([30, 3, 10], center=true);
		
		
	}
	sphere(d=20.55);
	translate([0, 0, 0])cylinder(d=20.55, h=60);
	translate([12, 0, 0]) rotate([90, 0, 0]) translate([0, 0, 0]) cylinder(d=20.55, h=60);
	translate([-21, 0, 0]) rotate([0, 90, 0]) translate([0, 0, 0])cylinder(d=20.55, h=80);
	translate([-20, 20, 17]) rotate([0, 90, -45]) cylinder(d=5.2, h=50);
	translate([-8, -25, -20]) rotate([0, 45, 0]) cylinder(d=5.2, h=50);
	translate([30, 20, -20]) rotate([45, 0, 0]) cylinder(d=5.2, h=50);
}



/*$fn=100;
difference()
{
	union()
	{
		//sphere(d=24);
		cylinder(d=24, h=50);
		translate([12, 0, 0]) rotate([90, 0, 0]) cylinder(d=24, h=50);
		translate([-12, 0, 0]) rotate([0, 90, 0]) cylinder(d=24, h=64);
		
		translate([25, 0, 25]) rotate([0, 45, 0]) cube([50, 3, 10], center=true);
		rotate([90, 0, 0]) translate([25, 0, 25]) rotate([0, 45, 0]) cube([50, 3, 10], center=true);
		rotate([0, 0, -90]) translate([25, 6, 25]) rotate([0, 45, 20]) cube([50, 3, 10], center=true);
		
		
	}
	sphere(d=20.55);
	translate([0, 0, 0])cylinder(d=20.55, h=60);
	translate([12, 0, 0]) rotate([90, 0, 0]) translate([0, 0, 0]) cylinder(d=20.55, h=60);
	translate([-21, 0, 0]) rotate([0, 90, 0]) translate([0, 0, 0])cylinder(d=20.55, h=80);
	translate([-20, 20, 30]) rotate([0, 90, -45]) cylinder(d=5.2, h=50);
	translate([-8, -30, -20]) rotate([0, 45, 0]) cylinder(d=5.2, h=50);
	translate([30, 20, -20]) rotate([45, 0, 0]) cylinder(d=5.2, h=50);
}
*/