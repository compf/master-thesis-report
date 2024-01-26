package javaTest.simpleExample;

public class MathStuff {

    public double getLength(int x, int y, int z) {
        return Math.sqrt(x * x + y * y + z * z);
    }

    public double getSum(int x, int y, int z) {
        return x + y + z;
    }

    public double getMax(int x, int y, int z) {
        return Math.max(Math.max(x, y), z);
    }
}
