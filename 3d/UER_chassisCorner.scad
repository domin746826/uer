$fn=100;
difference()
{
	union()
	{
		sphere(d=24);
		cylinder(d=24, h=50);
		rotate([90, 0, 0]) cylinder(d=24, h=50);
		rotate([0, 90, 0]) cylinder(d=24, h=50);
		
		translate([25, 0, 25]) rotate([0, 45, 0]) cube([50, 3, 10], center=true);
		rotate([90, 0, 0]) translate([25, 0, 25]) rotate([0, 45, 0]) cube([50, 3, 10], center=true);
		rotate([0, 0, -90]) translate([25, 0, 25]) rotate([0, 45, 0]) cube([50, 3, 10], center=true);
		
		
	}
	sphere(d=20.55);
	translate([0, 0, 0])cylinder(d=20.55, h=60);
	rotate([90, 0, 0]) translate([0, 0, 0]) cylinder(d=20.55, h=60);
	rotate([0, 90, 0]) translate([0, 0, 0])cylinder(d=20.55, h=60);
	translate([-20, 20, 30]) rotate([0, 90, -45]) cylinder(d=5.2, h=50);
	translate([-20, -30, -20]) rotate([0, 45, 0]) cylinder(d=5.2, h=50);
	translate([30, 20, -20]) rotate([45, 0, 0]) cylinder(d=5.2, h=50);
}
