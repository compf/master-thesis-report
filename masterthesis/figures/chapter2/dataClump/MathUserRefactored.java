package javaTest.simpleExample;

public class MathUser {

    public void doLengthCalc(){
        MathStuff stuff=new MathStuff();
        stuff.getLength(new Coordinate(5,6,4));
    }
    public void doMaxStuff(){
        MathStuff stuff=new MathStuff();
        int x1=4;
        int y1=3;
        int z1=-80;
        Coordinate coord=new Coordinate(x1, y1, z1);
        stuff.getMax(coord);
    }
    public void executeSumOperation(){
        MathStuff stuff=new MathStuff();
        stuff.getSum(new Coordinate(hashCode(), hashCode(), hashCode()));
    }
}
