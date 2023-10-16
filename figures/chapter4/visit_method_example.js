private visitMethod(ctx: RuleContext) {
    this.returnType = ctx.getChild(0).text
    this.methodName = ctx.getChild(1).text;
    let visitor = new MethodParamsAndThrowVisitor();
    let paramsThrow = visitor.visit(ctx);
    this.methodParams = paramsThrow.params;
    this.thrownException = paramsThrow.thrownException;
    this.methodBody = new MethodBodyTextVisitor().visit(ctx)
}