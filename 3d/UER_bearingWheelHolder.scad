$fn=100;
difference()
{
    union()
    {
		hull()
        {
            translate([0, 0, 0]) cylinder(d=36, h=5);
            translate([0, 20, 13]) rotate([-90, 0, 0]) cylinder(d=26, h=40);
            rotate([0, 0, 21.801]) translate([0, 60, 13]) rotate([90, 0, 0]) cylinder(d=15, h=1);
        }
		hull()
		{
			translate([0, 0, -5]) cylinder(d=36, h=10);
			//translate([-12, 20, 0]) cube([24, 2, 2]);
            translate([0, 20, 13]) rotate([-90, 0, 0]) cylinder(d=26, h=5);
		}
		translate([0, 30, 0]) cylinder(d=10, h=26);
		translate([-19.2, 48, 2.4]) cylinder(d=10, h=20.4);
    }
	translate([0, 30, -1]) cylinder(d=5.2, h=30);
	translate([-19.2, 48, 0]) cylinder(d=5.2, h=50);
	
    translate([0, 0, 0]) cylinder(d=26, h=40);
    translate([0, 0, -6]) cylinder(d=30.2, h=10);
	translate([0, 18, 13]) rotate([-90, 0, 0])        cylinder(d=20.38, h=81);
	
    
    rotate([0, 0, 21.801]) translate([0, 45, 13]) rotate([-90, 0, 0]) cylinder(d=10.25, h=81);
} 