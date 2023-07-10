//wys 64
//278 odl miedzy dziurami 205
$fn=100;

difference()
{
	hull()
	{
		cube([15, 25, 0.1], center=true);
		translate([73/2, 30, 64]) cube([15, 15, 2], center=true);
	}
	
	hull()
	{
		translate([-2, 2, 4]) cube([12, 15, 0.1], center=true);
		translate([73/2-4, 29, 60]) cube([14, 9, 2], center=true);
	}
	
	translate([0, 0, -10]) cylinder(d=5, h=20);
	translate([73/2, 30, -10]) cylinder(d=5, h=250);
}



