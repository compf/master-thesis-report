/**
 * This method simulates a ternary operator
 * @param condition The condition that decides the returned value
 * @param ifTrue will be returned if {@code condition} is true
 * @param ifFalse will be returned if {@code condition} is false
 * @return either {@code ifTrue} or {@code ifFalse}
 */
Object ternary(boolean condition, Object ifTrue, Object ifFalse){
    return condition ? ifTrue :ifFalse;
}
