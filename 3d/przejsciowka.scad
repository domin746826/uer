$fn=200;
srednica=12;
difference()
{
    cylinder(d=40, h=6);
    translate([srednica, 0, -1]) cylinder(d=5, h=10);
    translate([0, srednica, -1]) cylinder(d=5, h=10);
    translate([-srednica, 0, -1]) cylinder(d=5, h=10);
    translate([0, -srednica, -1]) cylinder(d=5, h=10);
}
cylinder(d1=11, d2=10, h=15);

/*
difference()
{
    cylinder(d=40, h=6);
    translate([srednica, srednica, -1]) cylinder(d=5, h=10);
    translate([-srednica, srednica, -1]) cylinder(d=5, h=10);
    translate([srednica, -srednica, -1]) cylinder(d=5, h=10);
    translate([-srednica, -srednica, -1]) cylinder(d=5, h=10);
    translate([0, 0, 0]) cylinder(d1=11, d2=10, h=6);
}*/
