$fn=50;

difference()
{
    hull()
    {
        cube([94, 10, 3]);
        translate([94/2-15, -10, 0]) cube([30, 30, 3]);
    }
    translate([94/2-12.75/2-10, -5, -1]) cube([12.75, 20, 5]);
    translate([94/2-12.75/2+10, -5, -1]) cube([12.75, 20, 5]);
    translate([5, 5, -1]) cylinder(d=5.3, h=10);
        translate([94-5, 5, -1]) cylinder(d=5.3, h=10);
}