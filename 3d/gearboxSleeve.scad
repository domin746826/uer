$fn=80;
/*difference()
{
	hull()
	{
		cylinder(d=24, h=4);
		translate([106, 0, 0]) cylinder(d=24, h=4);
	}
	translate([0, 0, -1]) cylinder(d=20.25, h=6);
	translate([106, 0, -1]) cylinder(d=20.25, h=6);
}*/

translate([0, 30, 0]) difference()
{
    cylinder(d=7.85, h=6.6);
    translate([0, 0, -1]) cylinder(d=5, h=10);
}
translate([10, 30, 0]) difference()
{
    cylinder(d=7.85, h=6.6);
    translate([0, 0, -1]) cylinder(d=5, h=10);
}