$fn=20;
mirror([0, 0, 1]) rotate([-90, 0, 0]) 
translate([0, 0, 26]) rotate([0, 180, -90]) difference()
{
    union()
    {
        hull()
        {
            translate([0, 0, 18]) cylinder(d=40, h=8);
            translate([0, 15, 13]) rotate([-90, 0, 0])           cylinder(d=26, h=50);
            rotate([0, 0, 21.801]) translate([0, 40, 0]) hull()
            {
                translate([0, 35, 13]) rotate([90, 0, 0])           cylinder(d=16, h=20);
            }
        }
        
        
        translate([-33, 52, 13]) rotate([0, 90, 0]) cylinder(d=9, h=48);
        
    }
    translate([0, 0, 0]) cylinder(d=20, h=40);
    translate([0, 0, 19]) cylinder(d=22, h=10);
    translate([0, 0, 0]) cylinder(d=22, h=18);//na wys 15 
    translate([0, 15, 13]) rotate([-90, 0, 0])        cylinder(d=20, h=81);
    translate([-34, 52, 13]) rotate([0, 90, 0]) cylinder(d=5, h=50);
    
    rotate([0, 0, 21.801]) translate([0, 45, 13]) rotate([-90, 0, 0])        cylinder(d=11, h=81);
    
}
