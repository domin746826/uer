$fn=100;

difference()
{
    union()
    {
        hull()
        {
            translate([0, 0, -30]) cylinder(d=40, h=65);
            translate([50, 20, 12.5]) rotate([90, 0, 0]) cylinder(d=30, h=40);
        }
        translate([10, -20, -35]) cube([65, 40, 95]);
    }


    translate([0, 0, -40]) cylinder(d=20, h=100);

    translate([50, 30, 12.5]) rotate([90, 0, 0]) cylinder(d=14, h=80);
    
    translate([50, -13, 12.5]) rotate([90, 0, 0]) cylinder(d=22, h=25);
    translate([50, 45, 12.5]) rotate([90, 0, 0]) cylinder(d=22, h=32);
    
    translate([22, -21, 32]) cube([40.4, 39.6, 20]);
    
    
    translate([22, -18.6, -26]) cube([40.4, 38.7, 20]);
    
    
    
    translate([22-4.1, 30, 37]) rotate([90, 0, 0]) cylinder(d=5, h=140);
    translate([22-4.1, 30, 47]) rotate([90, 0, 0]) cylinder(d=5, h=140);
    translate([22-4.1+48.6, 30, 37]) rotate([90, 0, 0]) cylinder(d=5, h=140);
    translate([22-4.1+48.6, 30, 47]) rotate([90, 0, 0]) cylinder(d=5, h=140);
    
    translate([22-4.1, 30, -11]) rotate([90, 0, 0]) cylinder(d=5, h=140);
    translate([22-4.1, 30, -21]) rotate([90, 0, 0]) cylinder(d=5, h=140);
    translate([22-4.1+48.6, 30, -11]) rotate([90, 0, 0]) cylinder(d=5, h=140);
    translate([22-4.1+48.6, 30, -21]) rotate([90, 0, 0]) cylinder(d=5, h=140);
}

