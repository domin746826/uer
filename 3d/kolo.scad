$fn=200;
srednica=12;
rotate([0, 0, 0]) translate([0, 40, 0]) rotate([90, 0, 0]) 
{
    color([1, 1, 1]) 
    difference()
    {
        union()
        {
            difference()
            {
                translate([0, 0, 3.5]) cylinder(d=170, h=73);
                translate([0, 0, -1]) cylinder(d=156, h=82);
				translate([0, 0, -1]) cylinder(d=165, h=32);
				translate([0, 0, 49]) cylinder(d=165, h=32);
            }

            translate([0, 0, 10]) cylinder(d=40, h=60, $fn=200);


            translate([0, 0, 40]) linear_extrude(height = 60, center = true, convexity = 20, twist = 60, $fn=200)
            union()
            {
                for(i=[0:60:360]) rotate([0, 0, i])translate([19, -1.5]) square([65, 3.2]);
            }
        }
        translate([0, 0, -1]) cylinder(d=12, h=80, $fn=80);
        
        //cylinder(d=40, h=6);
        translate([srednica, 0, -1]) cylinder(d=5, h=80, $fn=50);
        translate([0, srednica, -1]) cylinder(d=5, h=80, $fn=50);
        translate([-srednica, 0, -1]) cylinder(d=5, h=80, $fn=50);
        translate([0, -srednica, -1]) cylinder(d=5, h=80, $fn=50);
        
        
        
        translate([0, 0, 35]) kolobezsrodka(180, 160, 10);
        
    }

    color([1, 1, 1]) translate([0, 0,3.5]) rotate_extrude(convexity = 10, $fn = 150)
    translate([82, 0, 0])
    circle(r = 3, $fn = 30);

    color([1, 1, 1]) translate([0, 0,80-3.5]) rotate_extrude(convexity = 10, $fn = 150)
    translate([82, 0, 0])
    circle(r = 3, $fn = 30);

    difference()
    {
        for(i=[0:360/22:360])
        {
            rotate([0, 0, i]) translate([82.55, -5, 2.25]) color([0.7, 0.2, 0.2]) cube([20, 10, 30]);
            
            rotate([0, 0, i+360/22/2]) translate([82.55, -5, 45.5+2.25]) color([0.7, 0.2, 0.2]) cube([20, 10, 30]);
        }
        
        translate([0, 0, 0]) color([0.7, 0.2, 0.2]) kolobezsrodka(210, 178,80);
    }
    
}/*
rotate([90, 0, 0]) 
difference()
{
	translate([0, 40, 0]) rotate([90, 0, 0])  translate([0, 0, 35]) color([0.2,0.2,0.2])kolobezsrodka(178, 160,10);
	
	rotate([180, 0, 0]) cylinder(d=200, h=200);
	cylinder(d=2.4, h=100);
}
*/


module kolobezsrodka(d1, d2, h)
{
    union()
    {
        difference()
        {
            cylinder(d=d1, h=h);
            translate([0, 0, -1]) cylinder(d=d2, h=h+2);
        }
    }
}