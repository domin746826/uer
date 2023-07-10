$fn=120;
/*difference()
{
	cylinder(d=34, h=2);
	translate([0, 0, -1]) cylinder(d=10.25, h=10);
	translate([12, 0, -1]) cylinder(d=5.2, h=10);
	translate([-12, 0, -1]) cylinder(d=5.2, h=10);
	translate([0, 12, -1]) cylinder(d=5.2, h=10);
	translate([0, -12, -1]) cylinder(d=5.2, h=10);
}*/
/*
translate([40, 0, 0])
{
	difference()
	{
		union()
		{
			cylinder(d=40, h=2);
			cylinder(d=14, h=6);
			intersection()
			{
				cylinder(d=40, h=6);
			translate([0, 0, 5]) rotate([0, 0, -45]) cube([40, 8, 10], center=true);
			}
		}
		translate([0, 0, -1]) cylinder(d=10.25, h=20);
		translate([12, 0, -1]) cylinder(d=5.2, h=10);
		translate([-12, 0, -1]) cylinder(d=5.2, h=10);
		translate([0, 12, -1]) cylinder(d=5.2, h=10);
		translate([0, -12, -1]) cylinder(d=5.2, h=10);
		
		translate([-17, 17, 3])rotate([45, 90, 0]) cylinder(d=5, h=50);
	}
}
*/

translate([40, 0, 0])
{
	difference()
	{
		union()
		{
			cylinder(d=40, h=2);
			cylinder(d=14, h=8);
			intersection()
			{
				cylinder(d=40, h=8);
			translate([0, 0, 5]) rotate([0, 0, -45]) cube([40, 7, 10], center=true);
			}
		}
		translate([0, 0, -1]) cylinder(d=10.25, h=20);
		translate([12, 0, -1]) cylinder(d=5.2, h=10);
		translate([-12, 0, -1]) cylinder(d=5.2, h=10);
		translate([0, 12, -1]) cylinder(d=5.2, h=10);
		translate([0, -12, -1]) cylinder(d=5.2, h=10);
		
		translate([-17, 17, 4])rotate([45, 90, 0]) cylinder(d=5, h=50);
	}
}