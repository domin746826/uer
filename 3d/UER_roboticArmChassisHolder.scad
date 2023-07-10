$fn=100;
difference()
{
	union()
	{

		translate([-30, 0, 0]) cylinder(d=25, h=30);
		translate([30, 0, 0]) cylinder(d=25, h=30);

		translate([-50, 0, 0]) rotate([0, 90, 0]) cylinder(d=26, h=100);
		
		translate([0, 0, 5]) cube([50, 4, 50], center=true);
        
		
		
		
		
	}
	translate([30, 0, 0])cylinder(d=20.6, h=60);
    translate([-30, 0, 0])cylinder(d=20.6, h=60);

	rotate([0, 90, 0]) translate([0, 0, -51])cylinder(d=20.6, h=120);
    
	translate([30, 20, 0]) rotate([90, 0, 0]) cylinder(d=5.2, h=50);
    translate([-30, 20, 0]) rotate([90, 0, 0]) cylinder(d=5.2, h=50);
    translate([-30, 20, 22]) rotate([90, 0, 0]) cylinder(d=5.2, h=50);
    translate([30, 20, 22]) rotate([90, 0, 0]) cylinder(d=5.2, h=50);
    rotate([90, 0, 0]) cylinder(d=400, h=100);
}
