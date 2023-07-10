$fn=100;
difference()
{
	union()
	{
		//sphere(d=24);

		rotate([90, 0, 0]) cylinder(d=24, h=50);
		translate([-36, 0, 0]) rotate([0, 90, 0]) cylinder(d=24, h=72);

		rotate([90, 0, 0]) translate([20, 0, 25]) rotate([0, 60, 0]) cube([50, 3, 10], center=true);

        rotate([90, -180, 0]) translate([20, 0, 25]) rotate([0, 60, 0]) cube([50, 3, 10], center=true);
		
		
	}
	sphere(d=20.55);
    
	translate([0, 0, 0]) rotate([90, 0, 0]) translate([0, 0, 0]) cylinder(d=20.55, h=60);
	translate([-40, 0, 0]) rotate([0, 90, 0]) translate([0, 0, 0])cylinder(d=20.55, h=80);
    
    translate([-25, 0, -40]) cylinder(d=5.3, h=100);
    translate([25, 0, -40]) cylinder(d=5.3, h=100);
    translate([0, -40, -40]) cylinder(d=5.3, h=100);
}
