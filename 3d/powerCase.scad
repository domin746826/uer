$fn=100;

module base()
{
    union()
    {
        difference()
        {
            cube([54, 86, 15]);
        translate([-10, 0, 0]) rotate([26, 0, 0]) translate([-10, 0, 0]) cube([200, 100, 30]);
            translate([-10, 0, 0]) rotate([0, -50, 0]) translate([-10, 0, 0]) cube([200, 100, 30]);
            
            translate([-10, 0, 0]) rotate([0, -50, 0]) translate([-10, 0, 0]) cube([200, 100, 30]);
            translate([30, 0, 40.5]) rotate([0, 50, 0]) translate([-10, 0, 0]) cube([200, 100, 30]);
            translate([0, 40, 66.74]) rotate([-50, 0, 0]) translate([-10, 0, 0]) cube([200, 100, 30]);
            
        }


    }
}

module needToHoles()
{
difference()
{
union()
{
    difference()
    {
        base();
        translate([2, 2, -1]) scale([0.925, 0.95, 1]) base();
        translate([5, 35, 0]) cube([43.5, 8, 100]);
        
       translate([4.5, 30, 10]) rotate([0, 25, -90]) union()
        {
            difference()
            {
                otworywentylacyjne(27, 45, 5);
                translate([24, 25.5, 0]) cylinder(d=10, h=20);
            }
        }
        
        translate([30, 7, -3]) cylinder(d=6, h=60);
        translate([30, 79, -3]) cylinder(d=6, h=60);
        
    }
        translate([0, 0, 0]) cube([54, 86, 1]);

  translate([2.4, 2.4, -2]) cube([54-4.8, 86-4.8, 3]);

}

    translate([4, 4, -3]) cube([54-8, 86-8, 4.01]);


}
}

difference()
{
    union()
    {
        needToHoles();
        translate([30, 7, -2]) cylinder(d=8, h=8);
        translate([30, 79, -2]) cylinder(d=8, h=17);


    }
    translate([30, 7, 0]) cylinder(d=6.2, h=8);
    translate([30, 7, -3]) cylinder(d=3.3, h=8);

    translate([-10, 0, 0]) rotate([26, 0, 0]) translate([-10, 0, 0]) cube([200, 100, 30]);
    
    
    translate([30, 79, 0]) cylinder(d=6.2, h=80);
    translate([30, 79, -3]) cylinder(d=3.3, h=8);
}


/*module pudelkobezdziur()
{
    union()
{
    difference()
    {
        union()
        {
            cube([54, 86, 40]);
            translate([0, -8, 0]) hull()
            {
                translate([30, 0, 0]) cylinder(d=10, h=3);
                translate([30, 101, 0]) cylinder(d=10, h=3);

            }
            

        }
        translate([2, 2, 2]) cube([50, 82,40]);
        
        translate([0, -8, 0])
        {
            translate([30, 0, -1]) cylinder(d=5.3, h=10);
            translate([30, 101, -1]) cylinder(d=5.3, h=10);
        }
        
        


    }
}
}
union()
{
    difference()
    {
        union()
        {
            pudelkobezdziur();
            montazowy();
            translate([0, 86, 0]) rotate([0, 0, 180]) mirror([1, 0, 0]) montazowy();
            translate([14, 14.5, 0])
            {
                translate([0, 0, 0]) cylinder(d=12, h=6);
                translate([0, 57, 0]) cylinder(d=12, h=6);
            }

            
        }
        translate([4, 3, 3]) rotate([0, -90, 0]) otworywentylacyjne(34, 80, 5);
        translate([56, 3, 3]) rotate([0, -90, 0]) otworywentylacyjne(34, 80, 5);
        
        
        translate([14, 14.5, 0])
        {
            translate([0, 0, -1]) cylinder(d=4.8, h=10);
            translate([0, 57, -1]) cylinder(d=4.8, h=10);
            translate([0, 0, -1]) cylinder(d=7.2, h=4);
            translate([0, 57, -1]) cylinder(d=7.2, h=4);
        }
        
    }
}*/
module montazowy()
{
    difference()
    {
        hull()
        {
            translate([30, 7, 20]) cylinder(d=5, h=18);
            translate([27.5, 0, 20]) cube([5, 1, 18]);
        }
        translate([25, 0, 18]) rotate([-45, 0, 0]) cube([10, 10, 100]);
            translate([30, 7, 28]) cylinder(d=3.1, h=11);
        
    }
}


module otworywentylacyjne(length, width, height)
{
    intersection()
    {
        
        union()
        {
            for(i=[0:10:width+50])
            {
                translate([0, i-40, 0]) row(20, length, 5, height);

                //row(slope=10, length=40, width=5, height=5);
            }
        }
        translate([0, 0, -1]) cube([length, width, height+2]);
            
    }
}

module row(slope, length, w, height)
{
    CubePoints = [
  [  0,  0,  0 ],  //0
  [ length,  0+slope,  0 ],  //1
  [ length,  w+slope,  0 ],  //2
  [  0,  w,  0 ],  //3
  [  0,  0,  height ],  //4
  [ length,  0+slope,  height ],  //5
  [ length,  w+slope,  height ],  //6
  [  0,  w,  height ]]; //7
  
CubeFaces = [
  [0,1,2,3],  // bottom
  [4,5,1,0],  // front
  [7,6,5,4],  // top
  [5,6,2,1],  // right
  [6,7,3,2],  // back
  [7,4,0,3]]; // left
  
polyhedron( CubePoints, CubeFaces );
}

