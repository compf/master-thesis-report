   /**
     * Prints the length of the vector (x, y, z)
     * @param x the x component of the vector
     * @param y the y component of the vector
     * @param z the z component of the vector
     * 
     */
    public void moveTo(int x, int y, int z) {
        System.out.println(Math.sqrt(x * x + y * y + z * z));
    }
    public MathStuff(boolean sign, double mantissa, int exponent){
        this.sign=sign;
        this.mantissa=mantissa;
        this.exponent=exponent;
    }