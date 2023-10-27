package javaTest.simpleExample;

public class MathStuff {

    public double getLength(Coordinate coord) {
        return Math.sqrt(coord.getX() * coord.getX()
         + coord.getY() * coord.getY()
         + coord.getZ() * coord.getZ());
    }

    public double getSum(Coordinate coord) {
       return coord.getX() + coord.getY() + coord.getZ();
    }

    public double getMax(Coordinate coord) {
        return Math.max(Math.max(coord.getX(), coord.getY()), coord.getZ());
    }
}
