$fn=80;

mirror([0, 0, 0]) difference()
{
	union()
	{
		translate([0, 0, 0]) cylinder(d=70, h=4);
		hull()
		{
			translate([0, 36, 8]) cylinder(d=58, h=3);
			translate([-30, 36, 8]) cylinder(d=26, h=3);
		}
		translate([0, 36, 11]) cylinder(d1=26, d2=24, h=4);
		
		intersection() //murek między dwoma dużymi
		{
			translate([0, 0, 0]) cylinder(d=70, h=11);
			//translate([0, 36, 0]) cylinder(d=62, h=11);
			hull()
			{
				translate([0, 36, 0]) cylinder(d=62, h=12);
				translate([-30, 36, 0]) cylinder(d=37, h=12);
			}
		}
		
		
		hull()
		{
			translate([0, 0, 0]) cylinder(d=50, h=4);
			translate([35, 0, 0]) cylinder(d=10, h=4);
			translate([-35, 0, 0]) cylinder(d=10, h=4);
			translate([0, -35, 0]) cylinder(d=10, h=4);
		}
		
		hull()
		{
			translate([0, 36, 8]) cylinder(d=30, h=3);
			translate([0, 71, 8]) cylinder(d=10, h=3);
		}
		
		hull()
		{
			translate([-30, 36, 8]) cylinder(d=24, h=13);
			translate([-30, 36-29/2, 8]) cylinder(d=11, h=13);
			translate([-30, 36+29/2, 8]) cylinder(d=11, h=13);
		}
		
	}
	hull()
	{
		translate([0, 36, -1]) cylinder(d=58, h=9);
		translate([-30, 36, -1]) cylinder(d=26, h=9);
	}
	//translate([-30, 36, 0]) cylinder(d=26, h=11);
	
	translate([0, 36, 0]) cylinder(d=22.3, h=20);
	
	translate([36, 0, -1]) cylinder(d=5.3, h=20);
	translate([-36, 0, -1]) cylinder(d=5.3, h=20);
	translate([0, -36, -1]) cylinder(d=5.3, h=20);
	translate([0, 71, -1]) cylinder(d=5.3, h=40);
	
	translate([-30, 36, 0]) cylinder(d=19, h=30);
	
	translate([-30, 36-29/2, 0]) cylinder(d=8.5, h=19);
	translate([-30, 36+29/2, 0]) cylinder(d=8.5, h=19);
	
	translate([-30, 36-29/2, 8]) cylinder(d=4.2, h=16);
	translate([-30, 36+29/2, 8]) cylinder(d=4.2, h=16);
}