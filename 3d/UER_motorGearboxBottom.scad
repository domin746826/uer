$fn=80;

difference()
{
	
	union()
	{
		hull()
        {
            translate([0, 0, 0]) cylinder(d=36, h=5);
            translate([0, 20, 13]) rotate([-90, 0, 0]) cylinder(d=26, h=58);
            rotate([0, 0, 21.801]) translate([0, 70, 13]) rotate([90, 0, 0]) cylinder(d=15, h=1);
			translate([0, 0, 0]) cylinder(d=42, h=16);
			
        }
		
		hull()
		{
			translate([0, 0, -7]) cylinder(d=36, h=10);
            translate([0, 16, 13]) rotate([-90, 0, 0]) cylinder(d=26, h=5);
		}
		translate([0, 0, -7]) cylinder(d=36, h=10);
		
		
		hull()
		{
			translate([0, 0, 12]) cylinder(d=70, h=16);
			translate([0, 36, 12]) cylinder(d=20, h=16);
		}
		
		translate([0, 36, 9]) cylinder(d=26, h=10);
		
		hull()
		{
			translate([0, 36, 25]) cylinder(d=58, h=11);
			translate([0, 36, 12]) cylinder(d=20, h=16);
			translate([-30, 36, 25]) cylinder(d=26, h=11);
		}
		
		hull()
		{
			translate([0, 0, 12]) cylinder(d=50, h=16);
			translate([35, 0, 12]) cylinder(d=10, h=16);
			translate([-35, 0, 12]) cylinder(d=10, h=16);
			translate([0, -35, 12]) cylinder(d=10, h=16);
		}
		
		hull()
		{
			translate([0, 36, 10]) cylinder(d=30, h=26);
			translate([0, 71, 0]) cylinder(d=10, h=36);
		}
		translate([-24, 60, 2.4]) cylinder(d=10, h=20.4);
		
	}
	translate([0, 0, -8]) cylinder(d=30.2, h=10);
	translate([0, 0, 4]) cylinder(d=36, h=26);
	translate([0, 0, -1]) cylinder(d=24, h=10);
	translate([0, 0, 16]) cylinder(d=64, h=40);
	
	translate([0, 36, 16]) cylinder(d=16, h=12);
	translate([0, 36, 8]) cylinder(d=22.5, h=8);
	translate([0, 36, 0]) cylinder(d=30, h=8);
	
	
	

	translate([0, 36, 28]) cylinder(d=52, h=9);
	
	translate([-30, 36, 28]) cylinder(d=20, h=41);
	
	translate([-30, 36, 25]) union()
	{
		translate([0, -29/2, 8]) cylinder(d=8, h=12);
		translate([0, 29/2, 8]) cylinder(d=8, h=12);
	}
	
	//montowanie
	/*translate([0, 0, 0]) cylinder(d=26, h=40);
    translate([0, 0, -6]) cylinder(d=30.2, h=10);*/
	
	translate([0, 55, 13]) rotate([-90, 0, 0]) cylinder(d=20.38, h=81);
    rotate([0, 0, 21.801]) translate([0, 45, 13]) rotate([-90, 0, 0]) cylinder(d=10.25, h=81);
	
	translate([36, 0, 10]) cylinder(d=5.3, h=20);
	translate([-36, 0, 10]) cylinder(d=5.3, h=20);
	translate([0, -36, 10]) cylinder(d=5.3, h=20);
	translate([0, 71, -1]) cylinder(d=5.3, h=40);
	
	
	translate([-24, 60, 0]) cylinder(d=5.3, h=40);
	
}


module base()
{
	
difference()
{
    union()
    {
		hull()
        {
            translate([0, 0, 0]) cylinder(d=36, h=5);
            translate([0, 20, 13]) rotate([-90, 0, 0]) cylinder(d=26, h=80);
            rotate([0, 0, 21.801]) translate([0, 100, 13]) rotate([90, 0, 0]) cylinder(d=15, h=1);
        }
		hull()
		{
			translate([0, 0, -5]) cylinder(d=36, h=10);
            translate([0, 20, 13]) rotate([-90, 0, 0]) cylinder(d=26, h=5);
		}
		//translate([0, 30, 0]) cylinder(d=10, h=26);
		//translate([-19.2, 48, 2.4]) cylinder(d=10, h=20.4);
    }
	//translate([0, 30, -1]) cylinder(d=5.2, h=30);
	//translate([-19.2, 48, 0]) cylinder(d=5.2, h=50);
	
    translate([0, 0, 0]) cylinder(d=26, h=40);
    translate([0, 0, -6]) cylinder(d=30.2, h=10);
	
	translate([0, 58, 13]) rotate([-90, 0, 0]) cylinder(d=20.38, h=81);
    rotate([0, 0, 21.801]) translate([0, 85, 13]) rotate([-90, 0, 0]) cylinder(d=10.25, h=81);
} 
}