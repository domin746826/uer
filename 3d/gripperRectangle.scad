$fn=100;

difference()
{
    translate([0, 0, 4.5]) cube([42, 25, 9], center=true);
    translate([-17.5, 7.25, -1]) cylinder(d=3.1, 12);
    translate([17.5, 7.25, -1]) cylinder(d=3.1, 12);
    translate([-17.5, -7.75, -1]) cylinder(d=3.1, 12);
    translate([17.5, -7.75, -1]) cylinder(d=3.1, 12);
}
